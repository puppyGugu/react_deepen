import React from "react";
// import styled from "styled-components";
import { auth, db } from './shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

import { useHistory } from "react-router-dom";

const Signup = (props) => {
    const id_ref = React.useRef();
    const pw_ref = React.useRef();
    // const pwr_ref = React.useRef();
    const name_ref = React.useRef();
    const history = useHistory();

    // 유효성 체크
    // if(id_ref.current.value === ""){
    //     return false;
    // }

    const signupFB = async () => {
        // const user = await createUserWithEmailAndPassword(auth, "lbs7230@naver.com", "0123456789");
        // 가입하기
        const user = await createUserWithEmailAndPassword(
            auth,
            id_ref.current.value,
            pw_ref.current.value
        );
        // console.log(user);

        // const user_data = await addDoc(collection(db, "users"), { user_id: "1111", name: "Lee2" });
        // firebase에 값 넣기(auth에 다른 값 추가하고 싶을 때. ex-닉네임)
        // const user_data = await addDoc(콜렉션 위치, 추가할 데이터);
        const user_data = await addDoc(collection(db, "users"), {
            // user_id: id_ref.current.value,
            user_id: user.user.email,
            name: name_ref.current?.value
        });
        // console.log(user_data.id);

        history.push('./');
        alert('가입을 환영 합니다!');
    }

    return (
        <div>
            <h4>회원가입</h4>

            <p>아이디</p>
            <input type="text" ref={id_ref} placeholder="아이디" />

            <p>비밀번호</p>
            <input type="password" ref={pw_ref} placeholder="비밀번호"/><br />
            {/* <input type="password" ref={pwr_ref} placeholder="비밀번호 재입력" /> */}

            <p>닉네임</p>
            <input type="text" ref={name_ref} placeholder="닉네임" /><br /><br />

            <button onClick={() => {
                signupFB();
                // history.push('./login');
                // alert('가입을 환영 합니다!');
            }}>회원가입 하기</button>
        </div>
    );
};

export default Signup;