import React, { useState } from "react";
//MyKeyEvent component :사용자가 키보드를 입력할때 발생하는 이벤트 정보를 보여주는 컴포넌트 
const MyKeyEvent = () => {
    //현재 발생한 키보드 이벤트 이름을 저장하는 상태
    // 초기값은 빈문자열/ 이름 저장 변수 :eventinfo / 값업데이트하는 함수 :setEventinfo
    const [eventinfo, setEventinfo] = useState("");
    //keyinfo :사용자가 누른 키값을 젖아하는 상태 / setKeytinfo : 상태 변화함수 
    const [keyinfo, setKeyinfo] = useState("");
    return (
        <>
            <input
                //input key를 누르면 실행
                // 영문키로 하면 내가 누르는 글자가 뭔지 e.key값에 할당됨. 
                onKeyDown={(e) => {
                    setEventinfo("keyDown");
                    setKeyinfo(e.key);
                }}
                onKeyUp={(e) => {
                    setEventinfo("keyUp");
                    setKeyinfo(e.key);
                }}
            />
            <p />
            {/* 이벤트 이름이랑 키 이름을 각각 출력함 */}
            <h2>{eventinfo}</h2>
            <h2>{keyinfo}</h2>
        </>
    );
};

export default MyKeyEvent;
