import React, { useState } from 'react'
import axios from "axios";


//https://velog.io/@riela/%EC%B9%B4%EC%B9%B4%EC%98%A4-json-%EC%B6%94%EC%B6%9C  에 있는 카카오에서 내가 원하는 책 데이터 찾기

const KimAjaxKakaoBook = () => {
    const [searchTxt,setsearchTxt ] = useState("");
    // 책정보를 배열로 저장 
    const [books, setBooks] = useState([]);
    //books배열을 .map()으로 반복해 각 책 정보를 <tr>태그로 구성한다. 
    const bookTrs = books.map((b,i) => {
      return(
        <tr>
            <td><img src={b.thumbnail}/></td>
            <td>{b.authors}</td>
            <td>{b.title}</td>
            <td>{b.status}</td>
        </tr>
      );
    });
    

    const getBookInfo= () => {
        //axios.get(요청주소,{headers:{이름:값,...}}).then(콜백함수);
        axios
        //링크 백틱으로 감싸기 : 자바스크립트 템프릿 $ 사용하기 위해서 
        .get(`https://dapi.kakao.com/v3/search/book?query=${searchTxt}`,{
            headers:{Authorization: "KakaoAK 82ade6b7415bf695c1d5fff8e70e3791",

            },
        })
            .then((kakaoRes) => {
                setBooks(kakaoRes.data.documents);
              
            });
            setsearchTxt("")     
    };
    

  return (
    <div>
      <h1>원하시는 책 제목을 입력하세요</h1>
      <input value={searchTxt} onChange={(e) => {
        setsearchTxt(e.target.value);      }
      }></input>
      <button onClick={getBookInfo}>검색</button>
      <div>검색 결과</div>
        <table border={1}>{bookTrs}</table>
    </div>
  )
}

export default KimAjaxKakaoBook
