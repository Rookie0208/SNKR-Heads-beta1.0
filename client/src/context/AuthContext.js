import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";




// const INITIAL_STATE = {
//     user: {
//         _id: "", // Initialize with empty values
//         username: "",
//         email: "",
//         profilePicture: "",
//         coverPicture: "",
//         isAdmin: false,
//         followers: [],
//         followings: [],
//     },
//     isFetching: false,
//     error: false,
// };

// const INITIAL_STATE = {
//     user: {
//         _id: "64d12662fb90f4e80be4435e",
//         username:"Newuser",
//         email:"user@gmail.com",
//         profilePicture: "",
//         coverPicture: "",
//         isAdmin: false,
//         followers: [],
//         followings:[],
//     },
//     isFetching: false,
//     error: false,
// };
const storedUserData = localStorage.getItem("user");
const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
const user = parsedUserData || null;

const INITIAL_STATE = {
    // user:JSON.parse(localStorage.getItem("user")) || null,
    // isFetching: false,
    // error: false,
    user: user,
    isFetching: false,
    error: false,


};
// console.log(user);

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >

            {children}
        </AuthContext.Provider>
    );
};

