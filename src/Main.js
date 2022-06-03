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
                        <div>{list.user}</div>
                        <div>{list.time}</div>
                        <div>{list.text}</div>
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
padding:0 20px;
`

const Post = styled.div`
margin:20px 0;
border:1px solid #000;
background-color:skyblue;.
`

export default Main;