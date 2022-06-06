import React from "react";
import styled from "styled-components";
import basic from "./basic.jpg";

import { storage } from "./shared/firebase";
import { db } from './shared/firebase';
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Write = (props) => {
    const file_link_ref = React.useRef(null);

    const uploadFB = async (e) => {
        console.log(e.target.files);

        const uploded_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]
        );
        console.log(uploded_file);

        const file_url = await getDownloadURL(uploded_file.ref);
        console.log(file_url);

        // ref를 값을 담는 용도로 사용
        file_link_ref.current = { url: file_url };

        // console.log(file_link_ref);
        // console.log(file_link_ref.current);

        const user_data = await addDoc(collection(db, "posts"), {
            image_url: file_link_ref.current?.url
        });
    }

    return (
        <Wrap>
            <h1>게시글 작성</h1>
            {/* <input type="file" accept="image/*" required /><br /><br /> */}
            <input type="file" onChange={uploadFB} /><br /><br />
            <label>게시글 내용</label><br />
            <textarea cols="50" rows="10" placeholder="게시글 내용"></textarea><br />

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

            <br />
            <button>게시글 올리기</button>
        </Wrap>
    );
};

const Wrap = styled.form`
padding:0 20px 20px;
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