import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Nav = (props) => {
    const history = useHistory();

    return (
        <Navbox>
            <Logo onClick={() => {
                history.push('/');
            }}>로고</Logo>
            <User>
                <button onClick={() => {
                    history.push('./signup');
                }}>회원가입</button>
                <button onClick={() => {
                    history.push('./login');
                }}>로그인</button>
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