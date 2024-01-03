import Home from "./pages/home/Home";
// import {Person} from "@mui/icons-material";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Faq from "./pages/faq/Faq";

  

function App() {
    // return <Home/>
    // return <Profile/>
    // return <Login/>
    // return <Register/>  

    const {user} = useContext(AuthContext) 
    // return(
    //     <Router>
    //         <Routes>
    //             <Route exact path="/" element={user?<Home/> : <Register/>}/>
    //             <Route path="/profile/:username" element={<Profile/>}/>
    //             <Route path="/login" element={user? <Navigate to="/" />:<Login/>}/>
    //             <Route path="/register" element={user? <Navigate to="/" />:<Register/>}/>
    //         </Routes>
    //     </Router>
    // );

    return (
        <Router>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/register" />}
            />
            <Route path="/profile/:username" element={<Profile />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </Router>
      );
}

export default App;
