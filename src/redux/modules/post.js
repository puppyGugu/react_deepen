// Actions
// const LOAD = 'my-app/widgets/LOAD';
// const CREATE = 'post/CREATE';
// const UPDATE = 'my-app/widgets/UPDATE';
// const REMOVE = 'my-app/widgets/REMOVE';

// 초기값
const initialState = {
    list: [
        { user: "유저내용 1", time: "시간 1", text: "텍스트 1", imgSrc: "https://velopert.com/wp-content/uploads/2016/03/react.png"},
        { user: "유저내용 2", time: "시간 2", text: "텍스트 2", imgSrc: "https://velopert.com/wp-content/uploads/2018/04/prettier-950x500.png"}
    ]
}

// Action Creators
// export function loadWidgets() {
//     return { type: LOAD };
// }

// export function createPost(post) {
//     return { type: CREATE, post };
// }

// export function updateWidget(widget) {
//     return { type: UPDATE, widget };
// }

// export function removeWidget(widget) {
//     return { type: REMOVE, widget };
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // case "post/CREATE": {
            // // console.log('이제 값을 바꿀거야!');
            // // state return해서 전체 값을 콘솔에서 확인하며 하는게 좋다
            // const new_list = [...state.list, action.post];
            // return { list: post_list };
        // }

        default:
            return state;
    }
}