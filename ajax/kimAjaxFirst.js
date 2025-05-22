import React, { useState } from 'react'
// AJAX 파싱전용 라이브러리 import
import axios from "axios";

//cross Domain
const KimAjaxFirst = () => {
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [humid, setHumid] = useState('');
    const getWeather = (params) => {
      // GET 방식으로 ajax요청 : axios.get(요청주소 완성 버전).then(콜백함수 )
      axios.get("https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=baff8f3c6cbc28a4024e336599de28c4")
      .then((ress) => {
        //받아온 내용 : ress.data
        const data = ress.data;
        setWeather(data.weather[0].description); // 날씨 설명
        setTemp(data.main.temp);                // 현재 기온
        setHumid(data.main.humidity);           // 습도

      })
      .catch((err) => {
        alert('에러 발생: ' + err);
      }
       );
    }
    
  return (
    <div>
        <div></div>
       <h2>weather : {weather}</h2>
      <h2>temp : {temp}℃</h2>
      <h2>humid : {humid}%</h2>
      <button onClick={getWeather}>날씨 업데이트</button>
    </div>
  )
}

export default KimAjaxFirst
