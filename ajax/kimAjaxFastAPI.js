import React, { useEffect, useState } from 'react';
import axios from "axios";

const KimAjaxFastAPI = () => {
    const [input, setInput] = useState({
        p_name: '',
        p_price: '',
        p_location: '',
        p_image: ''
      });
    const [result, setResult] = useState([]);

    useEffect(() => {
    console.log("컴포넌트 마운트됨");
    axios.get('http://localhost:7788/product.get/')
      .then((res) => {
        console.log("서버 응답:", res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      });
  }, []);
      

    const getData= (e) => {
      
    };
    
  return (
    <div>

      <button onClick={getData}></button>
    </div>
  )
}

export default KimAjaxFastAPI
