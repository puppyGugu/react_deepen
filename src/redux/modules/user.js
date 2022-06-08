import { db } from "../../shared/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Actions
const LOAD = 'user/LOAD';

// 초기값
const initialState = {
    list: [
        // { user: "유저내용 1", time: "시간 1", text: "텍스트 1", image_url: "https://velopert.com/wp-content/uploads/2016/03/react.png"},
        // { user: "유저내용 2", time: "시간 2", text: "텍스트 2", image_url: "https://velopert.com/wp-content/uploads/2018/04/prettier-950x500.png"}
    ]
}

// Action Creators
export function loadUser(user_list) {
    return { type: LOAD, user_list };
}

// middlewares
export const loadUserFB = () => {
    return async function (dispatch) {
        const user_data = await getDocs(collection(db, "users"));
        // console.log(user_data);

        let user_list = [];

        user_data.forEach((u) => {
            // console.log(u.data());
            // user_list = [...user_list, {...u.data()}];
            user_list.push({ id: u.id, ...u.data() });
        });
        // console.log(user_list);

        dispatch(loadUser(user_list));
    }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "user/LOAD": {
            return { list: action.user_list }
        }

        default:
            return state;
    }
}