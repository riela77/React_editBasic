import React, { useState } from "react";

const BmiEvent = () => {
    const [info, setInfo] = useState({
        name: "",
        height: "",
        weight: "",
        bmi: "",
        result: ""
    });

    const changeInfo = (e) => {
        setInfo({...info, [e.target.name]: e.target.value});
    };

    const showResult = () => { 
        const ih = info.height / 100;
        const bmi = info.weight / (ih * ih);
        let result = "저체중";
        if (bmi >= 39) {
            result = "고도비만";
        } else if (bmi >= 30) {
            result = "비만";
        } else if (bmi >= 24) {
            result = "과체중"
        } else if (bmi >= 10) {
            result = "정상";
        }

        setInfo({...info, result: result, bmi: bmi})

     }

    return (
        <>
            이름 : <input name="name" value={info.name} onChange={changeInfo} />
            <br />
            키 : <input name="height" value={info.height} onChange={changeInfo} />
            <br />
            몸무게 : <input name="weight" value={info.weight} onChange={changeInfo} />
            <br />
            <button onClick={showResult}>계산</button>
            <hr />
            <table id="resultArea">
                <tr>
                    <th>이름</th>
                    <td>{info.name}</td>
                </tr>
                <tr>
                    <th>키</th>
                    <td>{info.height}</td>
                </tr>
                <tr>
                    <th>BMI</th>
                    <td>{info.bmi}</td>
                </tr>
                <tr>
                    <th>결과</th>
                    <td>{info.result}</td>
                </tr>
            </table>
        </>
    );
};

export default BmiEvent;
