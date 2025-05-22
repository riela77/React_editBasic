import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KimAjaxKMap = () => {
  const [input, setInput] = useState({
  p_id: '',
  p_name: '',
  p_brand_id: '',
  p_category_id: '',
  p_price: '',
  p_image: '',
  p_location: ''
});


  const [result, setResult] = useState([]);

  // ✅ 데이터 처음 불러오기
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

  // ✅ 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ 데이터 추가
 const handleAddSnack = async () => {
    try {
      const p_id = parseInt(input.p_id);
      const p_brand_id = parseInt(input.p_brand_id);
      const p_category_id = parseInt(input.p_category_id);
      const p_price = parseInt(input.p_price);

      if (
        isNaN(p_id) || isNaN(p_brand_id) || isNaN(p_category_id) || isNaN(p_price) ||
        !input.p_name || !input.p_image || !input.p_location
      ) {
        alert("모든 항목을 정확히 입력하세요.");
        return;
      }

      const res = await axios.get('http://localhost:7788/product.reg', {
        params: {
          p_id,
          p_name: input.p_name,
          p_brand_id,
          p_category_id,
          p_price,
          p_image: input.p_image,
          p_location: input.p_location
        }
      });

    console.log("서버 응답:", res.data);
      if (res.data && typeof res.data === 'object') {
        setResult(prev => [...prev, res.data]);
        setInput({
          p_id: '',
          p_name: '',
          p_brand_id: '',
          p_category_id: '',
          p_price: '',
          p_image: '',
          p_location: ''
        });
      } else {
        console.error("서버 응답이 객체가 아닙니다:", res.data);
      }

    } catch (err) {
      console.error("서버 전송 실패:", err);
    }
  };


  // ✅ 테이블 생성
  const resultsTrs = result
  .filter(b => b) // null 또는 undefined 제거
  .map((b, i) => (
    <tr key={i}>
      <td>{b.p_id}</td>
      <td>{b.p_name}</td>
      <td>{b.p_brand_id}</td>
      <td>{b.p_category_id}</td>
      <td>{b.p_price}</td>
      <td>{b.p_image}</td>
      <td>{b.p_location}</td>
    </tr>
  ));

  return (
    <div>
      <h1>과자 목록</h1>

      <input name="p_id" value={input.p_id} onChange={handleChange} placeholder="상품 ID" />
<input name="p_name" value={input.p_name} onChange={handleChange} placeholder="이름" />
<input name="p_brand_id" value={input.p_brand_id} onChange={handleChange} placeholder="브랜드 ID" />
<input name="p_category_id" value={input.p_category_id} onChange={handleChange} placeholder="카테고리 ID" />
<input name="p_price" value={input.p_price} onChange={handleChange} placeholder="가격" />
<input name="p_image" value={input.p_image} onChange={handleChange} placeholder="이미지" />
<input name="p_location" value={input.p_location} onChange={handleChange} placeholder="위치" />


      <button onClick={handleAddSnack}>등록</button>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>brand 이름</th>
            <th>카테고리 id</th>
            <th>가격</th>
            <th>위치</th>
            <th>이미지</th>
          </tr>
        </thead>
        <tbody>{resultsTrs}</tbody>
      </table>
    </div>
  );
};

export default KimAjaxKMap;
