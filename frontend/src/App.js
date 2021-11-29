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



function App() {
  return (
    <div>
          <Router>
            <Header/>

            <Switch>
              <Route exact path="/"><Homepage/></Route>
              <Route path="/post/:pid"><SinglePost/></Route>
              <Route path="/hashtags/:hid"><HashtagPosts/></Route>
              
              <Redirect to='/' />
            </Switch>

            <MobileFooter/>
          </Router>
    </div>
  );
}

export default App;
