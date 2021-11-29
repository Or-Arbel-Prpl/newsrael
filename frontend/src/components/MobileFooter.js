import React from 'react'
import { BrowserRouter as Link } from "react-router-dom";


export default function MobileFooter() {
    return (
    //     <div class="b_footer_menu">
    //     <div class="footer_menu flex">
    //       <div class="menu_item"><a class="menu_btn btn_home" href="main.html">
    //           <div class="icon_wrapper"></div></a></div>
    //       <div class="menu_item"><a class="menu_btn btn_reporting" href="#">
    //           <div class="icon_wrapper"></div></a></div>
    //       <div class="menu_item"><a class="menu_btn btn_profile logged" href="app_settings.html">
    //           <div class="icon_wrapper bg_image">A</div></a></div>
    //     </div>
    //   </div>

<div class="b_footer_menu">
    
<div class="footer_menu flex">
    <div class="menu_item">
        <Link to='/'>
            <div class="menu_btn btn_home">
            <div class="icon_wrapper"></div>
            </div>
      </Link>
    </div>
  <div class="menu_item"><a class="menu_btn btn_reporting" href="#">
      <div class="icon_wrapper"></div></a></div>
  <div class="menu_item"><a class="menu_btn btn_profile not_logged" href="app_settings.html">
      <div class="icon_wrapper bg_image"></div></a></div>
</div>
</div>
    )
}
