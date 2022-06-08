import React from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { auth } from "./shared/firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';

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
            }}>Magazine</Logo>
            {is_login ? (
                <User>
                    <Button onClick={() => {
                        signOut(auth);
                        history.push('/');
                    }}>로그아웃</Button>
                </User>
            ) : (
                <User>
                    <Button onClick={() => {
                        history.push('./signup');
                    }}>회원가입</Button>
                    <Button onClick={() => {
                        history.push('./login');
                    }}>로그인</Button>
                </User>
            )}
        </Navbox>
    );
};

const Navbox = styled.div`
position:relative;
height:70px;
margin:0;
background-color:#000;
font-size:1.2em;
color:#fff;
`

const Logo = styled.h1`
position:absolute;
top:2px;
left:20px;
font-size:1.2em;
cursor:pointer;
`

const User = styled.div`
position: absolute;
top:20px;
right:20px;
`

const Button = styled.button`
margin:0 6px;
padding:4px 10px;
border:none;
border-radius:6px;
background-color:#fff;
`

export default Nav;