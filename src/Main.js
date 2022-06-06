import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth, db } from "./shared/firebase";
import { onAuthStateChanged } from 'firebase/auth';

const Main = (props) => {
    const history = useHistory();
    const post_list = useSelector((state) => state.post.list);
    // console.log(post_list);

    const [is_login, setIsLogin] = React.useState(false);
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
        <Wrap>
            {post_list.map((list, idx) => {
                // console.log(list);
                return (
                    <Post key={idx}>
                        <p>{list.user}</p>
                        <p>{list.time}</p>
                        <p>{list.text}</p>
                        <Img src={list.imgSrc} />
                    </Post>
                )
            })}

            {is_login ? (
                <Add onClick={() => {
                    // history.push('./Add');
                    history.push('./Write');
                    // 페이지 새로고침
                    // history.go(0);
                    // window.location.reload();
                }}>
                    +
                </Add>
            ) : (
                <></>
            )}

            {/* <Post>
                <p>유저</p>
                <p>시간</p>
                <p>텍스트</p>
                <div>이미지</div>
            </Post> */}
        </Wrap>
    );
};

const Wrap = styled.div`
max-width:1000px;
margin:0 auto;
padding:0 20px;
`

const Post = styled.div`
margin:20px 0;
padding:20px;
border:1px solid #000;
background-color:skyblue;
`

const Img = styled.img`
width:100%;
max-width:600px;
`

const Add = styled.div`
position:fixed;
bottom:10px;
right:10px;
width:50px;
height:50px;
line-height:42px;
border-radius:50%;
color:#fff;
font-size:2.4em;
font-weight:600;
background-color:#000;
cursor:pointer;
`

export default Main;