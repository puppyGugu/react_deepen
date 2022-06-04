import React from "react";
// import styled from "styled-components";

const Signup = (props) => {
    return (
        <div>
            <h4>회원가입</h4>
            <p>아이디</p>
            <input type="text" placeholder="아이디"/>
            <p>비밀번호</p>
            <input type="text" placeholder="비밀번호"/><br />
            <input type="text" placeholder="비밀번호 재입력"/>
            <p>닉네임</p>
            <input type="text" placeholder="닉네임"/>
        </div>
    );
};

export default Signup;