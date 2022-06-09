import React from "react";
// import styled from "styled-components";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loadPostFB } from "./redux/modules/post";

const Post = (props) => {
    // console.log(props);
    
    const post_list = useSelector((state) => state.post.list);
    const params = useParams();
    const post_index = params.index;

    // console.log(post_list);
    // console.log(params);
    // console.log(post_index);

    // console.log(post_list[post_index]);
    return (
        <div>
            {post_index}번째 게시글
        </div>
    );
};

export default Post;