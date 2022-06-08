import { db } from "../../shared/firebase";
// import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Actions
const LOAD = 'post/LOAD';
const CREATE = 'post/CREATE';
// const UPDATE = 'my-app/widgets/UPDATE';
// const REMOVE = 'my-app/widgets/REMOVE';

// 초기값
const initialState = {
    list: [
        // { user: "유저내용 1", time: "시간 1", text: "텍스트 1", image_url: "https://velopert.com/wp-content/uploads/2016/03/react.png"},
        // { user: "유저내용 2", time: "시간 2", text: "텍스트 2", image_url: "https://velopert.com/wp-content/uploads/2018/04/prettier-950x500.png"}
    ]
}

// Action Creators
// export function loadWidgets() {
//     return { type: LOAD };
// }

export function loadPost(post_list) {
    return { type: LOAD, post_list };
}

export function createPost(post) {
    return { type: CREATE, post };
}

// export function updateWidget(widget) {
//     return { type: UPDATE, widget };
// }

// export function removeWidget(widget) {
//     return { type: REMOVE, widget };
// }


// middlewares
export const loadPostFB = () => {
    return async function (dispatch) {
        const post_data = await getDocs(collection(db, "posts"));
        // console.log(post_data);

        let post_list = [];

        post_data.forEach((p) => {
            // console.log(p.data());
            // post_list = [...post_list, {...p.data()}];
            post_list.push({ id: p.id, ...p.data() });
        });
        // console.log(post_list);

        dispatch(loadPost(post_list));
    }
}

export const addPostFB = (post) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "posts"), post);
        // 콘솔에 찍어보면 type: "document"로 뜸.
        // 참조하기 위한 값, 데이터 가져오는 값은 아니다.
        // console.log(docRef.id, docRef.data());

        // console.log((await getDoc(docRef)).data());

        // 파라미터와 변수 명이 겹치면 뜨는 오류 발생시: TDZ(Temporal Dead Zone) 참조
        // getDoc을 쓰지 않아도 이미 파라미터 add로 데이터를 들고 왔으므로 생략해도 괜찮다.
        // const _add = await getDoc(docRef);
        // const add_data = {id: _add.id, ..._add.data()};

        const post_data = { id: docRef.id, ...post };
        // console.log(add_data);

        // 상수를 쓰지 않으려면 한번에 작성도 가능
        // dispatch(createAdd({id: _add.id, ..._add.data()}));
        dispatch(createPost(post_data));
    }
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "post/LOAD": {
            return { list: action.post_list }
        }

        case "post/CREATE": {
            // const new_list = [...state.list, action.post];
            const new_list = [...state.list];
            return { list: new_list };
        }

        default:
            return state;
    }
}