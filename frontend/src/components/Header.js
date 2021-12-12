import React, { useState, useEffect, useContext } from 'react';
import dateFormat from "dateformat";
import '../styles/main.css';
import { AuthContext } from './Auth/auth-context';

import { BrowserRouter as Link } from "react-router-dom";

// import '../scripts/main.js';
// import '../scripts/vendor.js';
// import '../scripts/bootstrap-year-calendar.js';

import logo from '../images/logo.svg';


export default function Header() {
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    //auth
    const auth = useContext(AuthContext);

    // Set Current Date And Time
    useEffect(() => {
        setInterval(() => {
            let now = new Date();
            let nowDate = dateFormat(now, "dd mmm, yyyy");
            setDate( nowDate + ' ');

            let nowTime = dateFormat(now, "HH:MM");
            setTime( nowTime + ' ');
           }, 1000);
    }, []);

    const toggleShowSettings = () => {
      document.getElementById("settingsDropdown").classList.toggle('open');
  }

  const onClickOutside = (e) => {
    if (!e.target.className.includes('list_link')) {
      document.getElementById("settingsDropdown").classList.remove('open');
    }
  };
  window.addEventListener("click", onClickOutside);



    return (
            <header className="b_header">
      <div className="container">
        <div className="header_wrapper flex">
          <div className="header_main_control">
            <div className="logo_wrapper">
              <Link to='/'>
                <a href='/'>
                  <div class="logo_link" >
                      <img src={ logo } alt="logo"></img>
                  </div>
                  </a>
              </Link>
              </div>
            <div class="date_wrapper"><span id="date"> {date} </span><span id="time"> {time} </span></div>
          </div>
          <div class="buttons_control">
              <div class="btn_wrapper">
                 {/* <Link to='/'><div class="btn_icon btn_main" title="Main"/> */}
                  <a class="btn_icon btn_main" title="Main" href="/"></a>
                 
                 {/* </Link> */}
              </div>
            <div class="btn_wrapper">
              <Link to='/archive'>
                <div class="btn_icon btn_archive" title="Archive"/>
              </Link>
            </div>
            <div class="btn_wrapper">
              <button class="btn_icon btn_settings jsOpenDropDown list_link" onClick={toggleShowSettings} title="Settings"></button>
              <div id="settingsDropdown" class="dropdown_list_wrapper ">
                <div class="dropdown_list">
                  <div class="list_row"><a class="list_link" href="#"><span class="images_wrapper"><span class="static_img"><img src="images/icon_support.svg" alt=""/></span><span class="active_img"/><img src="images/icon_support_hover.svg" alt=""/></span><span class="title">Support</span></a></div>
                  <div class="list_row"><a class="list_link" href="#"><span class="images_wrapper"><span class="static_img"><img src="images/icon_terms.svg" alt=""/></span><span class="active_img"><img src="images/icon_terms_hover.svg" alt=""/></span></span><span class="title">Terms of Use</span></a></div>
                  <div class="list_row"><a class="list_link" href="#"><span class="images_wrapper"><span class="static_img"><img src="images/icon_privacy.svg" alt=""/></span><span class="active_img"><img src="images/icon_privacy_hover.svg" alt=""/></span></span><span class="title">Privacy Policy</span></a></div>
                  
                  { auth.isLoggedIn && 
                  <div class="list_row" onClick={auth.logout}><a class="list_link" href="#"><span class="images_wrapper"><span class="static_img"><img src="images/icon_log_out.svg" alt=""/></span><span class="active_img"><img src="images/icon_log_out_hover.svg" alt=""/></span></span><span class="title">Log Out</span></a></div>
                  }

                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    
    )
}
