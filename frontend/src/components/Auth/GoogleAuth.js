import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { AuthContext } from './auth-context';
// import { useAuth } from './components/Hooks/auth-hook'

export default function GoogleAuth() {
    const auth = useContext(AuthContext);
   
    // const { token, login, logout, userId } = useAuth();
    // console.log(auth);


    const responseSuccessGoogle = (response) => {
        
        // let image = response.profileObj.imageUrl;
        // console.log(image);

        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/users/googlelogin',
            data: {tokenId: response.tokenId, image: response.profileObj.imageUrl}
        }).then(response => {

            let userName = response.data.user.firstName + ' ' + response.data.user.lastName;
            // console.log('saved this pic :');
            let image = response.data.user.image;
            // console.log(image);

            auth.login(response.data.user._id, response.data.token, userName, image);

            // console.log('Google auth success! , userID: '+ response.data.user._id + ', Token : ' + response.data.token +
            //  ', name: ' + userName+ ', image: ' + response.data.user.image);


        })
      }
    const responseErrorGoogle = (response) => {
        console.log(response);
      }
    //   console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

    return (
        <React.Fragment>
        <div class="btn_row">
            <a class="btn">
                    <div class="icon_wrapper"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.204 3.86667C12.1201 3.86667 13.4126 4.67778 14.1496 5.35556L17.0294 2.6C15.2607 0.988889 12.9591 0 10.204 0C6.2131 0 2.76638 2.24444 1.08838 5.51111L4.3877 8.02222C5.21536 5.61111 7.50561 3.86667 10.204 3.86667Z" fill="#EA4335"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20 10.2222C20 9.39996 19.932 8.79996 19.7846 8.17773H10.2041V11.8888H15.8277C15.7143 12.8111 15.1021 14.2 13.7415 15.1333L16.9615 17.5777C18.8889 15.8333 20 13.2666 20 10.2222Z" fill="#4285F4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.39909 11.9774C4.17615 11.3408 4.06124 10.6727 4.05896 9.99963C4.05896 9.31074 4.18367 8.64408 4.38776 8.02185L1.08844 5.51074C0.373854 6.90355 0.0011399 8.44068 0 9.99963C0 11.6107 0.396825 13.133 1.08844 14.4885L4.39909 11.9774Z" fill="#FBBC05"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2044 20.0007C12.9595 20.0007 15.2724 19.1118 16.9618 17.5785L13.7418 15.1341C12.8801 15.723 11.7237 16.1341 10.2044 16.1341C7.50599 16.1341 5.21574 14.3896 4.39942 11.9785L1.1001 14.4896C2.7781 17.7563 6.21348 20.0007 10.2044 20.0007Z" fill="#34A853"/></svg></div>
            
              <GoogleLogin
              icon={false}
                // clientId="486165145345-qp7ovoef05356ndtumopo8vfqv75id0l.apps.googleusercontent.com"
                clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <div class="title" onClick={renderProps.onClick}>Sign in with Google</div>
                  )}
                // className="title"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
            />

            </a>
        </div>

        {/* <div style={{margin: '5em auto', textAlign: 'center'}}> */}




            {/* <br/>
            <button style={{margin: '1em'}} onClick={()=> {auth.logout()}}>LOG OUT </button>
            <br/>
            {(auth.isLoggedIn)? <h2 style={{color: 'green'}}>User is signed in</h2>  : <h2>No one is signed in</h2>} */}
        {/* </div> */}

        </React.Fragment>
        
    )
}
