import React, { useEffect, useRef, useState } from 'react';

//KimHookFourth : 클릭한 칸들 색칙해주는 component
const KimHookFourth = () => {
    const paper = useRef(null);  // useRef를 이렇게 초기화 해야 함
    const [pen, setPen] = useState(null);

    useEffect(() => {
        // useRef로 선택한 canvas 요소의 context 가져오기
        setPen(paper.current.getContext("2d"));
    }, []);

    return (
        <canvas 
            onClick={(e) => {
                if (pen) {
                    // 클릭한 위치 기준으로 50x50 사각형을 그림
                    pen.fillRect(e.nativeEvent.offsetX - 25, e.nativeEvent.offsetY - 25, 50, 50);
                }
            }}
            ref={paper} // paper에 캔버스 DOM 요소 연결
            width={300}
            height={300}
            style={{ border: "black solid 2px" }}
        />
    );
};

export default KimHookFourth;
