"use client";

import { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { useVirtualizer } from "@tanstack/react-virtual";
import MemberInfo from "@/components/scrolling/MemberInfo";

/*
2.1
100개 이상의 리스트 데이터를 선언하고, 이를 모바일 환경에서, 
Infinite scrolling 형태로 리스트 목록으로 출력하는 웹앱으로 구현해 주세요. 
*/

export type Member = {
    name: string;
    email: string;
    avatar: string;
};

// count 수 만큼 랜덤한 멤버 리스트를 반환
const getMemberList = (count: number): Member[] => {
    return Array.from({ length: count }, () => {
        return {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.internet.avatar(),
        };
    });
};

export default function ScrollingPage() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [memberList, setMemberList] = useState<Member[]>([]);

    // TanStack의 Virtualizer를 이용하여, 렌더링되는 컴포넌트 최소화
    const rowVirtualizer = useVirtualizer({
        count: memberList.length,
        estimateSize: () => 100,
        getScrollElement: () => wrapperRef.current,
        overscan: 5,
    });

    useEffect(() => {
        setMemberList(getMemberList(1000));
    }, []);

    return (
        <section className="mx-auto max-w-mobile py-4 box-border h-screen">
            <div ref={wrapperRef} className=" overflow-y-auto h-full">
                <div
                    className="relative w-full"
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const member = memberList[virtualRow.index];

                        return (
                            <MemberInfo
                                key={virtualRow.index}
                                member={member}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
