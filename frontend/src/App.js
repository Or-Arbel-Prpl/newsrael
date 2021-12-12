import './App.css';
import {
  BrowserRouter as 
  Router,
  Route,
  Switch,
  Redirect,
  Navigate,   // used to be redirect but now its Navigate
  Routes,  //  used to be switch but now its Routes

} from 'react-router-dom';
import Homepage from './components/Homepage';
import SinglePost from './components/Posts/SinglePost';
import HashtagPosts from './components/Posts/HashtagPosts';
import Header from './components/Header';
import MobileFooter from './components/MobileFooter';
import GoogleAuth from './components/Auth/GoogleAuth';
import { AuthContext } from './components/Auth/auth-context'
import { useAuth } from './components/Hooks/auth-hook'
import FacebookAuth from './components/Auth/FacebookAuth';
import ImageUpload from './components/UIElements/ImageUpload';


/*** firebase ***/
import firebase from '@firebase/app';




function App() {
  const { token, login, logout, userId, userName, image } = useAuth();
  // console.log('app.js : ' +token);
  // console.log(login);
  // console.log(logout);
  // console.log('user Id from app.js : ' +userId);

  return (
    <div>
      <AuthContext.Provider
      value={{
        isLoggedIn: !!token, //!! turns value to boolean- true/false
        token: token,
        userId: userId,
        userName: userName,
        image: image,
        login: login,
        logout: logout
      }}
    >
          <Router>
            <Header/>

            <Switch>
              {/* <Route exact path="/"><GoogleAuth/></Route> */}
              {/* <Route exact path="/"><FacebookAuth/></Route> */}
              {/* <Route exact path="/"><ImageUpload/></Route> */}
              <Route exact path="/"><Homepage/></Route>
              <Route path="/post/:pid"><SinglePost/></Route>
              <Route path="/hashtags/:hid"><HashtagPosts/></Route>
              
              <Redirect to='/' />
            </Switch>

            <MobileFooter/>
          </Router>

    </AuthContext.Provider>
    </div>
  );
}

export default App;
