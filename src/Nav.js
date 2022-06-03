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
background:coral;
`

const Logo = styled.h1`
cursor:pointer;
`

const User = styled.div`

`

export default Nav;