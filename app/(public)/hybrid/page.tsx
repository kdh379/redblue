/*
1.3 NextJS를 이용해서, SSR, CSR의 하이브리드형태를, 구현하려고 합니다.
일부 API와 통신해서 데이터를 받아와서 렌더링해주는 예제를 작성해 주세요.
간단한 샘플  Page js 파일을 생성해서 설명해 주세요. 조건은 로딩 타임이 짧고,
번쩍거리는 등의 효과를 방지하고 페이지를 표현하는 예제 코드와 각 파트 역할을 설명해 주세요. 
*/

/*
문제에서 Next.js의 버전, app-router or page-router를 명시하지 않았기 때문에
우선은 app-router를 기준으로 작성하였습니다.
*/

type ServerDataEntity = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

// app router 내에선 기본적으로 server side rendering을 지원하기에, 이를 이용하여 데이터를 가져올 수 있습니다.
async function getData() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error occurred while fetching data.", err);
    }
}

export default async function Page() {
    // 구현된 ajax를 이용하여 데이터를 가져온 후, 이를 이용하여 페이지를 렌더링합니다.
    const data = await getData();

    return (
        <>
            <h1>Hybrid Page</h1>
            <p>Server Data</p>
            <ul>
                {data.map((data: ServerDataEntity) => (
                    <li key={data.id}>
                        <p>userId: {data.userId}</p>
                        <p>title : {data.title}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
