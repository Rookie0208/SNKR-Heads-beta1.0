export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",

});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,

});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
    // payload:error

});

// export const Follow = (currentUser, userId) => ({
//     type: "FOLLOW",
//     payload: {
//         currentUser,
//         userId
//     }
// });

// export const Unfollow = (currentUser, userId) => ({
//     type: "UNFOLLOW",
//     payload: {
//         currentUser,
//         userId
//     }
// });




export const Logout=()=>({
    type:"LOGOUT",
});


export const Follow = (userId)=>({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId)=>({
    type: "UNFOLLOW",
    payload: userId,
});