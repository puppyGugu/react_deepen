import React from "react";
import styled from "styled-components";
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

        history.push('./login');
        alert('가입을 환영 합니다!');
    }

    return (
        <div>
            <H4>회원가입</H4>
            <Input type="text" ref={id_ref} placeholder="아이디(email)" />
            <Input type="password" ref={pw_ref} placeholder="비밀번호(6자리 이상)"/>
            {/* <input type="password" ref={pwr_ref} placeholder="비밀번호 재입력" /> */}
            <Input type="text" ref={name_ref} placeholder="닉네임" />
            <Button onClick={signupFB}>회원가입 하기</Button>
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

export default Signup;