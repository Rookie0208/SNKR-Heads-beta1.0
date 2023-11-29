

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                // error: action.payload,
                error:true,
            };

        // case "FOLLOW":
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             followings: [...state.user.followings, action.payload.userId]
        //         }
        //     };

        // case "UNFOLLOW":
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             followings: state.user.followings.filter(
        //                 (following) => following !== action.payload.userId
        //             )
        //         }
        //     };


        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],//action.payload adding one more user
                },
            };

        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (follwing) => follwing !== action.payload
                    ),
                },
            };
        case "LOGOUT":
            localStorage.setItem("user", null);
            return {
                // user: localStorage.setItem("user", null),
                user: null,
                isFetching: false,
                error: false
            };


        default:
            return state;
    }
};

export default AuthReducer;