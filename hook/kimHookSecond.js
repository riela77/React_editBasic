import { useReducer } from "react";
//React의 useReducer  hook을 이용해서 게임진행기록을 누적해서 보여주는 component
const MyHookSec = () => {
    // doFlagGame: Reducer함수  / curState: 현재까지의 게임 기록 문자열 
    // payload: 버튼을 눌렀을 때 전달할 객체 (what은 깃발, do는 동작)
    const doFlagGame = (curState, payload) => {
        //curState: 현재까지의 게임 기록 문자열 (예: "시작-청기 올려")
        //새로운 기록을 문자열 형태로 이어 붙여서 리턴.
        return curState + "-" + payload.what + " " + payload.do;
    };
    // history : 현재까지의 게임 기록 상태값 / setHistory : 상태 업데이트 함수 
    // 버튼을 클릭하면 setHistory(payload) 호출 → doFlagGame(history, payload) 실행 → 새 상태 리턴 → history가 변경됨
    const [history, setHistory] = useReducer(doFlagGame, "시작");
    return (
        <>  
            {/* history :현재까지의 기록이 return */}
            <h1>{history}</h1>
            {/* 버튼을 클릭하면 {what: "청기", do: "올려"} 객체를 setHistory에 전달 */}
            {/* doFlagGame 함수가 실행되고, 이전 history에 "청기 올려"가 추가됨 */}
            <button
                onClick={() => {
                    setHistory({what: "청기", do: "올려"});
                }}
            >
                청기올려
            </button>
            <button
                onClick={() => {
                    setHistory({what: "청기", do: "내려"});
                }}
            >
                청기내려
            </button>
            <button
                onClick={() => {
                    setHistory({what: "백기", do: "올려"});
                }}
            >
                백기올려
            </button>
            <button
                onClick={() => {
                    setHistory({what: "백기", do: "내려"});
                }}
            >
                백기내려
            </button>
        </>
    );
};

export default MyHookSec;
