import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useHttp } from "./use-http";

let logoutTimer;

export const useAuth = () => {
    const dispatch =  useDispatch();
    const expirationDate = useSelector(state => state.auth.tokenExpirationDate);
    useEffect(() => {
      if (expirationDate !== null && expirationDate !== undefined) {
        const remainingTime = expirationDate.getTime() - new Date().getTime();
  
        logoutTimer = setTimeout(() => dispatch(authActions.logout()), remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [expirationDate]);
  
    const [isLoading, , sendRequest] = useHttp();

    useEffect(() => {
      let storedToken = localStorage.getItem('tokenData');
      const fetchUser = (async () => {
        let data = null;
        if (storedToken ) {
          data = await sendRequest('http://localhost:8080/api/auth/access-token-panel', 'GET', {
            'Authorization': 'Bearer: ' + storedToken
          }, null);
        }
        console.log("Data: ", data)
        if (storedToken && data !== null && data !== undefined) {
          dispatch(authActions.loadUser(data))
        }
      });
      fetchUser();
    }, [sendRequest])
    return [isLoading];
}