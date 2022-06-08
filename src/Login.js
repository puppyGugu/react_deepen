import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";

const Login = (props) => {
    const history = useHistory();
    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    const loginFB = async () => {
        // console.log(id_ref.current.value, pw_ref.current.value);
        const user = await signInWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value);
        // console.log(user);

        // 유저 정보 가져오기
        const user_docs = await getDocs(
            query(collection(db, "users"), where("user_id", "==", user.user.email))
        );

        user_docs.forEach(u => {
            console.log(u.data());
        })

        history.push('./');
    }

    return (
        <div>
            <H4>로그인</H4>
            <Input type="text" required ref={id_ref} placeholder="아이디(email)" />
            <Input type="password" required ref={pw_ref} placeholder="비밀번호(6자리 이상)" />
            <Button onClick={loginFB}>로그인 하기</Button>
        </div>
    );
};

const H4 = styled.h4`
font-size:1.4em;
`

const Input = styled.input`
display:block;
width:100%;
max-width:200px;
height:30px;
margin:20px auto;
`

const Button = styled.button`
width:100%;
max-width:210px;
height:40px;
margin:20px auto 0;
border:none;
border-radius:6px;
background-color:#000;
color:#fff;
cursor:pointer;
`

export default Login;