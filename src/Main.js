import React from "react";
import styled from "styled-components";

const Main = (props) => {
    return (
        <Wrap>
            <div>유저</div>
            <div>시간</div>
            <div>텍스트</div>
            <div>이미지</div>
        </Wrap>
    );
};

const Wrap = styled.div`

`

export default Main;