import { Member } from "@/components/pages/ScrollingPage";
import Image from "next/image";

interface MemberInfoProps {
    member: Member;
    className?: string;
    style?: React.CSSProperties;
}

export default function MemberInfo(props: MemberInfoProps) {
    const { member, style } = props;
    return (
        <div className="flex items-center px-4" style={style}>
            <Image
                className="flex-shrink-0 h-10 w-10 rounded-full"
                src={member.avatar}
                alt=""
                width={40}
                height={40}
                priority
            />
            <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                    {member.name}
                </p>
                <p className="text-sm text-gray-500">{member.email}</p>
            </div>
        </div>
    );
}
