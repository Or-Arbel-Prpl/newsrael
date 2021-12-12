import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { AuthContext } from './auth-context';


export default function FacebookAuth() {
    const auth = useContext(AuthContext);


    const responseSuccessFacebook = async (response) => {
        const tokenId = response.accessToken;
        console.log('token id : ' + tokenId);

        const { data } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
              fields: ['id', 'email', 'first_name', 'last_name', 'picture'].join(','),
              access_token: tokenId,
            },
          });
          console.log(data); // { id, email, first_name, last_name }
        
        //   const tokenId = data.id;
          const email = data.email;
          const firstName = data.first_name;
          const lastName = data.last_name;

          const image = (data.picture.data.url === "https://scontent.ftlv18-1.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=WecHkX7yxlcAX-Bol7r&_nc_ht=scontent.ftlv18-1.fna&edm=AP4hL3IEAAAA&oh=d22925e962d4f51c9bc04133eb8d4a08&oe=61D27B38" || data.picture.data.url === "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=WecHkX7yxlcAX86lRcx&_nc_ht=scontent.fsdv3-1.fna&edm=AP4hL3IEAAAA&oh=4471733f98f8559eb2114c434e7ababd&oe=61D27B38") ? '' : data.picture.data.url; 


          axios({
            method: 'POST',
            url: 'http://localhost:5000/api/users/facebooklogin',
            data: {tokenId, email, firstName, lastName, image}
        })
         .then(response => {
            console.log(response.data.token);
            console.log(response.data.user);

            let userName = response.data.user.firstName + ' ' + response.data.user.lastName;
            let image = response.data.user.image;
            auth.login(response.data.user._id, response.data.token, userName, image );

        })
    
      }
    
    return (
        <div class="btn_row">
            <a class="btn">
            <div class="icon_wrapper"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.0237V11.9763C23.9872 5.3602 18.6191 0 12 0C5.42463 0 0.0838022 5.2896 0.000976562 11.8453V12.1547C0.0757636 18.0753 4.43746 22.9618 10.125 23.854V15.47H7.078V12H10.125V9.356C10.125 6.349 11.917 4.688 14.658 4.688C15.97 4.688 17.344 4.922 17.344 4.922V7.875H15.83C14.339 7.875 13.874 8.8 13.874 9.749V12H17.202L16.67 15.469H13.874V23.854C19.6044 22.9552 23.9884 18.0031 24 12.0237Z" fill="#1877F2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.6711 15.4695L17.2031 12.0005H13.8751V9.74948C13.8751 8.80048 14.3401 7.87548 15.8311 7.87548H17.3441V4.92248C17.3441 4.92248 15.9701 4.68848 14.6581 4.68848C11.9171 4.68848 10.1251 6.34848 10.1251 9.35648V12.0005H7.07812V15.4695H10.1251V23.8545C11.3675 24.0495 12.6327 24.0495 13.8751 23.8545V15.4705H16.6711" fill="white"/></svg></div>
            
                <FacebookLogin
                icon={false}
                appId={process.env.REACT_APP_FB_APP_ID}
                // render={renderProps => (
                //     <div class="title" onClick={renderProps.onClick}>Sign in with Facebook</div>
                //   )}
                tag="div"
                cssClass="title"
                textButton="Sign in with Facebook"
                fields="name,email,picture"
                // onClick={componentClicked}
                callback={responseSuccessFacebook} />

            </a>
        </div>

            


            // <p><a href="/logout" onclick="FB.logout();">Logout</a> </p>

    )
}
