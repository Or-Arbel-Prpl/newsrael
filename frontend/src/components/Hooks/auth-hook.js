import { useEffect, useState, useCallback } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    const [userName, setUserName] = useState();
    const [image, setImage] = useState();
  
    const login = useCallback( (uid, token, name, image, expirationDate) => {
      // console.log('hi from login, image is : ' + image);

      // console.log(name);
      setToken(token);
      setUserId(uid);
      setUserName(name);
      setImage(image);
      // let MonthInMs = 1000*8; // token will expire after 8 seconds
      let MonthInMs = 1000*60*60 * 24 * 30;
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + MonthInMs );
      
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify({
        userId: uid, 
        token: token, 
        userName: name,
        image: image,
        expiration: tokenExpirationDate.toISOString()
        // expiration: tokenExpirationDate
      })
      
      );
      // console.log('hi from login, image is : ' + image);
      // console.log('NOW DATE : ' +new Date().toString() );
      // console.log('EXPIRATION DATE : ' +tokenExpirationDate.toISOString() );
    }, []);
  
    const logout = useCallback(() => {
        console.log('hi from logout');
      setToken(false);
      setTokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);
  
  //logout timer  
    useEffect(() => {
      setTimeout(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
  
              if(storedData && storedData.expiration && storedData.token){
                  const remainingTime = new Date(storedData.expiration).getTime() - new Date().getTime(); // in miliseconds
                  // console.log(remainingTime);

                  setTimeout(() => 
                    logout
                  , remainingTime);
              } 
              else{
                  clearTimeout(logoutTimer);
              }
        
      }, 3000);
           
          
    }, [token, logout, tokenExpirationDate] );
  
  //auto login if there is a valid token 
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));

      if (  
        storedData && 
        storedData.token &&
        new Date(storedData.expiration) > new Date()
        ) {
        login(storedData.userId, storedData.token, storedData.userName, storedData.image, new Date(storedData.expiration))
      }
    }, [login]);
  
    return { token, login, logout, userId, userName, image };
};