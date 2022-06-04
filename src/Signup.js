import React from "react";
// import styled from "styled-components";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './shared/firebase';
import { collection, addDoc } from "firebase/firestore";

const Signup = (props) => {
    const id_ref = React.useRef();
    const pw_ref = React.useRef();
    // const pwr_ref = React.useRef();
    const nick_ref = React.useRef();

    const signupStart = async () => {
        // const user = await createUserWithEmailAndPassword(auth, "lbs7230@naver.com", "0123456789");
        // 가입하기
        const user = await createUserWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value);
        console.log(user);

        // const user_data = await addDoc(collection(db, "users"), { user_id: "1111", name: "Lee2" });
        // firebase에 값 넣기
        const user_data = await addDoc(collection(db, "users"), { user_id: id_ref.current.value, name: pw_ref.current.value });
        console.log(user_data.id);
    }

    return (
        <div>
            <h4>회원가입</h4>
            <p>아이디</p>
            <input type="text" ref={id_ref} placeholder="아이디" />
            <p>비밀번호</p>
            <input type="text" ref={pw_ref} placeholder="비밀번호" /><br />
            {/* <input type="text" ref={pwr_ref} placeholder="비밀번호 재입력" /> */}
            <p>닉네임</p>
            <input type="text" ref={nick_ref} placeholder="닉네임" /><br /><br />
            {/* <button onClick={signupStart}>회원가입 하기</button> */}
            <Link onClick={signupStart} to={"./Login"}>회원가입 하기</Link>
        </div>
    );
};

export default Signup;