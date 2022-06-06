import React from "react";
import styled from "styled-components";
import basic from "./basic.jpg";

const Write = (props) => {
    return (
        <Wrap>
            <h1>게시글 작성</h1>
            <input type="file" accept="image/*" required />
            
            <h4>레이아웃 선택</h4>
            <ViewBox>
                <div>
                    <input type="radio" id="layout1" name="layout" value="1" /><br />
                    <label>좌: 텍스트<br />우: 이미지</label>
                </div>
                <View>
                    <p>텍스트</p>
                    <ViewImg src={basic} />
                </View>
            </ViewBox>
            <ViewBox>
                <div>
                    <input type="radio" id="layout1" name="layout" value="1" /><br />
                    <label>좌: 이미지<br />우: 텍스트</label>
                </div>
                <View>
                    <ViewImg src={basic} />
                    <p>텍스트</p>
                </View>
            </ViewBox>
            <ViewBox>
                <div>
                    <input type="radio" id="layout1" name="layout" value="1" /><br />
                    <label>상: 텍스트<br />하: 이미지</label>
                </div>
                <ViewV>
                    <p>텍스트</p>
                    <ViewVImg src={basic} />
                </ViewV>
            </ViewBox>
        </Wrap>
    );
};

const Wrap = styled.form`
padding:0 20px;
`

const ViewBox = styled.div`
max-width:1000px;
margin:20px auto 0;
padding:20px;
border:1px solid #000;
background-color:yellow;
`

const View = styled.div`
display:flex;
justify-content: space-between;
margin-top:20px;
`

const ViewV = styled.div`
display:flex;
flex-direction: column;
margin-top:20px;
`

const ViewImg = styled.img`
max-width:300px;
`

const ViewVImg = styled.img`
max-width:300px;
margin:0 auto;
`


export default Write;