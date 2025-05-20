import React, { useEffect, useRef, useState } from 'react';
// 마우스 우클릭했을때 뜨는 페이지 커스텀하는 component
const KimPopupMenu2 = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

  const summonPopup = (e) => {
    e.preventDefault(); // 기본 우클릭 메뉴 막기
  };

  const summonMyPopup = (e) => {
    if (e.button === 2) { // 우클릭눌렀을때
        //누른 위치에서 커스텀 페이지가 보이게
      setPos({ x: e.clientX, y: e.clientY });
      setPopupVisible(true);
    } else {
      setPopupVisible(false); // 좌클릭 등으로 끄기
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", summonPopup); // 기본 우클릭 메뉴 막기
    document.addEventListener("mouseup", summonMyPopup);   // 우클릭 감지해서 커스텀 메뉴 띄우기

    return () => {
      document.removeEventListener("contextmenu", summonPopup);
      document.removeEventListener("mouseup", summonMyPopup);
    };
  }, []);

  return (
    <div>
      KimPopupMenu2

      {/* 커스텀 팝업 */}
      {popupVisible && (
        <div
          ref={popupRef}
          style={{
            position: 'absolute',
            top: pos.y,
            left: pos.x,
            border: '1px solid black',
            padding: '10px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
            zIndex: 999,
          }}
        >
          📌 커스텀 팝업 메뉴
        </div>
      )}
    </div>
  );
};

export default KimPopupMenu2;