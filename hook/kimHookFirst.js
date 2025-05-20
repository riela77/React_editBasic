import React, { useState } from "react";
// 가장기본적인 Hook component :버튼을 누를때마다 숫자가 1씩 증가하는 카운터
const MyHookFirst = () => {
    //cnt:숫자 상태값 / setCnt : 숫자를 바꾸는 함수 / 초기값 : 0
    const [cnt, setCnt] = useState(0);
    return (
        <>
            <h1>{cnt}</h1>
            {/* 버튼을 누르면 cnt값이 하나씩 증가하는 setCnt함수가 실행됨 */}
            <button
                onClick={() => {
                    // cnt += 1이라고 하면안됨 
                    // cnt는 state값이랑 직접변경하면안되고 무조건 setCnt함수안에 넣어서 수정해야함.
                    setCnt(cnt + 1);
                }}
            >
                버튼
            </button>
        </>
    );
};

export default MyHookFirst;
