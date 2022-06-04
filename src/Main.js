import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

const Main = (props) => {
    const post_list = useSelector((state) => state.post.list);
    // console.log(post_list);

    return (
        <Wrap>
            {post_list.map((list, idx) => {
                // console.log(list);
                return (
                    <Post key={idx}>
                        <p>{list.user}</p>
                        <p>{list.time}</p>
                        <p>{list.text}</p>
                        <Img src={list.imgSrc}/>
                    </Post>
                )
            })}

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

export default Main;