import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import basic from "./basic.jpg";

import { useSelector, useDispatch } from "react-redux";
import { createPost } from "./redux/modules/post";
import { loadPostFB } from "./redux/modules/post";
import { addPostFB } from "./redux/modules/post";
import { loadUserFB } from "./redux/modules/user";

import { storage } from "./shared/firebase";
import { db } from './shared/firebase';
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import moment from "moment";
import "moment/locale/ko";

const Write = (props) => {
    // firebase 데이터 가져오기
    const user_list = useSelector((state) => state.user.list);
    console.log(user_list);
    React.useEffect(() => {
        dispatch(loadUserFB());
    }, []);

    // console.log(user_list);
    // console.log(user_list[0].name);

    // const loginFB = async () => {
    //     // console.log(id_ref.current.value, pw_ref.current.value);
    //     const user = await signInWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value);
    //     // console.log(user);

    //     // 유저 정보 가져오기
    //     const user_docs = await getDocs(
    //         query(collection(db, "users"), where("user_id", "==", user.user.email))
    //     );

    //     user_docs.forEach(u => {
    //         console.log(u.data());
    //     })
    // }

    // 현재 시간 가져오기
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    // console.log(nowTime);

    const history = useHistory();
    const dispatch = useDispatch();

    const file_link_ref = React.useRef(null);
    const refText = React.useRef();

    // firebase에 데이터 넣기
    const addInput = () => {
        // dispatch(createPost({
        //     text: refText.current.value
        // }));

        dispatch(addPostFB({
            user: refText.current.value,
            time: nowTime
        }));
    }

    // React.useEffect(() => {
    //     dispatch(addPostFB());
    // }, []);

    // firebase에 이미지 넣기
    const uploadFB = async (e) => {
        // console.log(e.target.files);

        const uploded_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]
        );
        // console.log(uploded_file);

        const file_url = await getDownloadURL(uploded_file.ref);
        // console.log(file_url);

        // ref를 값을 담는 용도로 사용
        file_link_ref.current = { url: file_url };

        // console.log(file_link_ref);
        // console.log(file_link_ref.current);

        const user_data = await addDoc(collection(db, "posts"), {
            image_url: file_link_ref.current?.url
        });
    }

    // 텍스트 프리뷰 불러오기
    const [text, setText] = React.useState('텍스트를 입력해주세요');
    const currentText = (event) => {
        // console.log(event.target.value);
        setText(event.target.value);
    }

    // 이미지 프리뷰 불러오기
    const [imageSrc, setImageSrc] = useState('https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg');
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            };
        });
    };

    return (
        <Wrap>
            <h1>게시글 작성</h1>
            {/* <input type="file" required /><br /><br /> */}
            {/* <input type="file" onChange={uploadFB} /><br /><br /> */}
            <input type="file" accept="image/*" onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
                // uploadFB();
            }} /><br /><br />
            <label>게시글 내용</label><br />
            <textarea cols="50" rows="10" placeholder="텍스트를 입력해주세요" ref={refText} onChange={currentText}></textarea>

            <h4>게시글 미리보기<br />/ 레이아웃 선택</h4>
            <ViewBox>
                <div>
                    <input type="radio" id="layout1" name="layout" value="1" /><br />
                    {/* <label>좌: 텍스트<br />우: 이미지</label> */}
                </div>
                <View>
                    <p>{text}</p>
                    {/* <p>{timer}</p> */}
                    {/* <ViewImg src={basic} className="imgBox" /> */}
                    <ViewImg>
                        {imageSrc && <img src={imageSrc} alt="preview-img" style={{ width: "100%" }} />}
                    </ViewImg>
                </View>
            </ViewBox>
            <ViewBox>
                <div>
                    <input type="radio" id="layout1" name="layout" value="1" /><br />
                    {/* <label>좌: 이미지<br />우: 텍스트</label> */}
                </div>
                <View>
                    <ViewImg>
                        {imageSrc && <img src={imageSrc} alt="preview-img" style={{ width: "100%" }} />}
                    </ViewImg>
                    <p>{text}</p>
                </View>
            </ViewBox>
            <ViewBox>
                <div>
                    <input type="radio" id="layout1" name="layout" value="1" /><br />
                    {/* <label>상: 텍스트<br />하: 이미지</label> */}
                </div>
                <ViewV>
                    <p>{text}</p>
                    <ViewVImg>
                        {imageSrc && <img src={imageSrc} alt="preview-img" style={{ width: "100%" }} />}
                    </ViewVImg>
                </ViewV>
            </ViewBox>

            <br />
            <Button onClick={() => {
                addInput();
                history.push('./');
            }}>게시글 올리기</Button>
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
border:1px solid #ccc;
border-radius:8px;
box-sizing:border-box;
box-shadow:5px 5px 5px #ccc;
`

const View = styled.div`
display:flex;
justify-content: space-between;
margin-top:20px;
`

const ViewImg = styled.div`
max-width:300px;
`

const ViewV = styled.div`
display:flex;
flex-direction: column;
margin-top:20px;
`

const ViewVImg = styled.div`
max-width:300px;
margin:0 auto;
`

const Button = styled.button`
width:100%;
max-width:210px;
height:40px;
margin:0 auto;
border:none;
border-radius:6px;
background-color:#000;
color:#fff;
cursor:pointer;
`

export default Write;