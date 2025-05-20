import React, { useEffect, useState } from "react";
// MyResizeEvent이라는 함수형 컴포넌트 정의
// 현재 열려있는 페이지의 가로세로 크기를 계산해 print해준다. 
const MyResizeEvent = () => {
    //현재 브라우저의 너비와 높이를 저장하는 객체
  const [wh, setWh] = useState({
    // 컴포넌트가 처음 렌더링될때 창 크기를 기준으로 초기화
    w: window.innerWidth,
    h: window.innerHeight,
  });   
//   updateWH :창 크기가 변경되었을때 wh상태를 새로 설정하는 함수 
  const updateWH = () => {
    setWh({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  };

  // resize 이벤트를 컴포넌트가 마운트될 때(처음으로 화면에 나타날때) 등록하고,
  // 언마운트될 때 제거한다.
  useEffect(() => {
    window.addEventListener("resize", updateWH); // 창 크기 변경 시 updateWH 실행
    return () => {
      window.removeEventListener("resize", updateWH); // 컴포넌트 제거 시 이벤트 제거 (메모리 누수 방지)
    };
  }, []);

  return (
    <>
      <h2>{wh.w}</h2>
      <h2>{wh.h}</h2>
    </>
  );
};

export default MyResizeEvent;
