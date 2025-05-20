import { useReducer, useState } from "react";

// react 전용함수가 아니면 component밖에 함수 정의 해도된다. 
// changeSecCss : 현재 상태 curState를 복사하고, color만 새 값(payload)으로 바꾸는 리듀서 함수 
const changeSecCss = (curState, payload) => {
    return {...curState, color: payload};
};

// MyHookThird: useState와 useReducer를 비교해 스타일을 동적으로 변경하는 component
const MyHookThird = () => {
    // firstCss: useState로 관리되는 CSS 상태값 사용
    //            color 변경 시 전체 객체 갱신
    const [firstCss, setFirstCss] = useState({
        backgroundColor: "red",
        color: "white",
    });
    // secCss :useReducer로 관리되는 CSS 상태값 사용
    //          color만 따로 제어 가능
    const [secCss, setSecCss] = useReducer(changeSecCss, {
        backgroundColor: "yellow",
        color: "black",
    });

    // useEffect(() => {
    //   alert("ha");
    // }); // MyHookThird가 화면상 변화 생길 때 호출
    
    // useEffect(() => {
    //   alert("ha");
    // }, []); // MyHookThird 첫 렌더링 때

    // useEffect(() => {
    //     alert("ha");
    // }, [firstCss]); // MyHookThird 첫 렌더링 때 + firstCss 값 바뀔 때마다
    
    // useEffect(() => {
    //   alert("ha");      // 첫 렌더링 때
    
    //   return () => {    // MyHookThird 소멸자, 화면에서 사라질 때 
    //     alert("ke");
    //   };
    // }, []);
    

    return (
        <>
        {/* 입력값이 바뀌면 color만 바꿔서 setFirstCss호출, useState 방식의 객체 상태 갱신 */}
            <input
                style={firstCss}
                value={firstCss.color}
                onChange={(e) => {
                    setFirstCss({ ...firstCss, color: e.target.value });
                }}
                />
            <p />
        {/* 입력값이 바뀌면 payload로 전달되어 changeSecCss() 실행, useReducer 방식의 객체 상태 갱신 */}
        {/* 위와같이하면 상태 업데이트로직을 외부함수로 분리할수 있어서 코드를 좀 더 깔끔하게 할수 있다.  */}
           <input
                style={secCss}
                value={secCss.color}
                onChange={(e) => {
                    setSecCss(e.target.value);
                }}
            />
        </>
    );
};

export default MyHookThird;
