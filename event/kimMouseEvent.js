import React, { useState } from "react";
// MyMouseEvent component : 마우스 이벤트를 감지해서 상태에 저장하고 화면에 보여주기
const MyMouseEvent = () => {
    // const[멤버변수, setter] = useState(기본값);
    // 변수를 안 바꿀거면
    // const [divCss, setDivCss] = useState({width:200, height:200, border:"black solid 2px"})
    const divCss = { width: 200, height: 200, border: "black solid 2px" };
    //마우스의 진입/이탈정보
    const [moveInfo, setMoveInfo] = useState("");
    //마우스의 좌표
    const [xyInfo, setXyInfo] = useState("");
    //클릭한 마우스 정보
    const [clickInfo, setClickInfo] = useState("");



    return (
        <>
            <div
                style={divCss}
                // 마우스가 div영역에 들어올때 실행 : mouseEnter로 상태 업데이트
                onMouseEnter={() => {
                    setMoveInfo("mouseEnter");
                }}
                //마우스가 움직일때마다 좌표 표시
                onMouseMove={(e) => {
                  // html 기준 마우스 좌표 : e.clientX, e.clientY
                  // 객체 기준 마우스 좌표 : e.nativeEvent.offsetX, e.nativeEvent.offsetX 
                  // setXyInfo(e.clientX + ", " + e.clientY);
                  setXyInfo(e.nativeEvent.offsetX + ", " + e.nativeEvent.offsetY);
                }}
                //마우스가 div밖으로 나가면 mouseleave로 상태변경
                onMouseLeave={() => {
                    setMoveInfo("mouseLeave");
                }}
                onMouseDown={(e) => { 
                  setClickInfo("mouseDown : " + e.button);
                 }}
                 onMouseUp={(e) => { 
                  setClickInfo("mouseUp : " + e.button);
                  }}
            ></div>
            <h2>{moveInfo}</h2>
            <h2>{xyInfo}</h2>
            <h2>{clickInfo}</h2>
        </>
    );
};

export default MyMouseEvent;
