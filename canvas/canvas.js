import React, { useRef, useEffect, useState } from 'react';
import io from "socket.io-client";

const socket = io("http://localhost:8877");

const CanvasBoard2 = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false); // ← 초기값 false로 설정
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        //canvas요소 가져오기
        const canvas = canvasRef.current;
        if (!canvas) return; // canvas가 없으면 중단

        //canvas요소의 2d그리기 도구 꺼내기 
        const ctx = canvas.getContext('2d');

        //socket연결하기 draw이벤트 시작
        socket.on("draw", ({ x, y, prevX, prevY }) => {
            //ctx는 canvas요소의 2d 그리기 context객체
            // 이부분에 있는 ctx함수들은 다른사람이랑 그림 공유하기 위한 부분
            ctx.beginPath();            // 새로운 그리기 경로 시작
            ctx.moveTo(prevX, prevY);   // 이전 위치로 펜 이동 (선 시작점)
            ctx.lineTo(x, y);           // 현재 위치까지 선 그리기
            ctx.stroke();               // 선을 실제로 화면에 그림
        });

        const startDrawing = (e) => {
            setIsDrawing(true);
            setLastPos(getMousePos(e));  // 시작 지점 저장
        };

        const stopDrawing = () => {
            setIsDrawing(false);        // 그리기 멈추기
        };

        // canvas안에 마우스의 좌표위치를 계산해서 반환
        const getMousePos = (e) => {
            //canvas 요소의 위치와 크기 정보를 가져옴
            const rect = canvas.getBoundingClientRect();
            return {
                // e.client :캔버스 기준 좌표 → rect.left:캔버스 위치기준 왼쪽으로 얼마나 가는지
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        //마우스 이벤트가 일어날때마다 그림을 적용하기 위한 새로운 함수 
        //여기 draw에 있는 ctx 함수들은 내가 움직이는거 내 화면에서 보기
        const draw = (e) => {
            // setIsDrawing 이 참거짓이냐에 따라
            if (!isDrawing) return;
            const { x, y } = getMousePos(e);
            const { x: prevX, y: prevY } = lastPos;

            // 내 화면에 그림
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();

            // 서버에 그림 정보(시작과 끝 좌표점) 전송
            socket.emit("draw", { x, y, prevX, prevY });

            setLastPos({ x, y }); // 현재 지점을 다시 저장
        };

        // 이벤트 등록
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseleave", stopDrawing); // 마우스가 나가면 멈추기

        // 컴포넌트가 사라질 때 이벤트 제거 (필수)
        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseleave", stopDrawing);
            socket.off("draw");
        };
    }, [isDrawing, lastPos]); // ← 상태가 바뀔 때마다 새로 바인딩

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={800}
                style={{
                    border: "green solid 3px",
                    backgroundColor: "lightyellow",
                    cursor: "url('/brush-icon.png') 0 32, auto"
                }}
            >
            </canvas>
        </div>
    );
};

export default CanvasBoard2;
