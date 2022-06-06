import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const Nav = (props) => {
    const history = useHistory();

    // 로그인 여부 확인(firebase 제공)
    const [is_login, setIsLogin] = React.useState(false);
    // console.log(auth.currentUser);

    const loginCheck = async (user) => {
        if (user) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    };
    React.useEffect(() => {
        onAuthStateChanged(auth, loginCheck)
    }, []);

    return (
        <Navbox>
            <Logo onClick={() => {
                history.push('/');
            }}>로고</Logo>
            
            <User>
                <button onClick={() => {
                    history.push('./signup');
                }}>회원가입</button>
                
                {is_login? (
                    <button onClick={() => {
                        signOut(auth);
                        history.push('/');
                    }}>로그아웃</button>
                ): (
                    <button onClick={() => {
                        history.push('./login');
                    }}>로그인</button>
                )}
            </User>
        </Navbox>
    );
};

const Navbox = styled.div`
position:relative;
height:60px;
background:coral;
`

const Logo = styled.h1`
position:absolute;
top:-10px;
left:20px;
cursor:pointer;
`

const User = styled.div`
position: absolute;
top:20px;
right:20px;
`

export default Nav;