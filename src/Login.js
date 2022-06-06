import React from "react";
// import styled from "styled-components";
import { Link } from "react-router-dom";
import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";

const Login = (props) => {
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

        // user_docs.forEach(u => {
        //     console.log(u.data());
        // })
    }

    return (
        <div>
            <h4>로그인</h4>
            <p>아이디</p>
            <input type="text" ref={id_ref} placeholder="아이디" />
            <p>비밀번호</p>
            <input type="text" ref={pw_ref} placeholder="비밀번호" /><br /><br />
            {/* <button onClick={
                loginFB
            }>로그인 하기</button> */}
            <Link onClick={loginFB} to={"/"}>로그인 하기</Link>
        </div>
    );
};

export default Login;