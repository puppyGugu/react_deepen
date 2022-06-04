import React from "react";
// import styled from "styled-components";

const Login = (props) => {
    return (
        <div>
            <h4>로그인</h4>
            <p>아이디</p>
            <input type="text" placeholder="아이디"/>
            <p>비밀번호</p>
            <input type="text" placeholder="비밀번호"/><br />
        </div>
    );
};

export default Login;