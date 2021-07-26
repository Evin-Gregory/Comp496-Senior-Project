import axios from "axios";
import { AuthActionType } from "redux/actions/authAction";
import { authUser } from "../../constants";

const authState = {
  isLoggedIn: false,
  user: {
  },
};

const getAuthState = () => {
  const auth = localStorage.getItem(authUser);
  try {
    const authObj = JSON.parse(auth);
    const { expires_at, jwt } = authObj.user;
    if (new Date(expires_at) > new Date()) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      return authObj;
    }
    return authState;

  } catch (error) {
    return authState;
  }
};

const newAuth = getAuthState();
const authReducer = (state = newAuth, action) => {
  switch (action.type) {
    case AuthActionType.REGISTER_SUCCESS:
      const newAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      localStorage.setItem(authUser, JSON.stringify(newAuthState));
      return newAuthState;
    

    case AuthActionType.PASSWORD_MISMATCH:
      return {
        ...state,
        ...{ error: 'Passwords are not matching.' }
      };
    
      
    case AuthActionType.REGISTER_FAIL_CONFLICT:
      return {
        ...state,
        ...{ error: 'The email already exists'}
      };
    
    case AuthActionType.LOGIN_SUCCESS:
      const loginAuthState = {
        isLoggedIn: true,
        user: action.payload
      };
      localStorage.setItem(authUser, JSON.stringify(loginAuthState));
      return loginAuthState;
    
    case AuthActionType.LOGIN_FAIL:
      return {
        ...state,
        ...{ error: 'Email or password is incorrect' }
      };
    
    case AuthActionType.VALIDATION_FAIL:
      return {
        isLoggedIn: false,
        user: null
      };

    case AuthActionType.LOGOUT:
      localStorage.removeItem(authUser);
      return {
        isLoggedIn: false,
        user: null
      }
    
    case AuthActionType.CLEAR_ERROR:
      return {
        ...state,
        ...{error: null}
      }
    
    case AuthActionType.SET_USER:
      return {
        ...state,
        isLoggedIn: true
      }
    
    default:
      break;
  }
  return state;
};

export default authReducer;