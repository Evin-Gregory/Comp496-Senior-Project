import axios from "axios";
import AuthorizationHeader from "services/authHeaderJwt";

export const AuthActionType = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL_CONFLICT: "REGISTER_FAIL_CONFLICT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",
  VALIDATION_FAIL: "VALIDATION_FAIL",
  CLEAR_ERROR: "CLEAR_ERROR",
  PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
  
};


export const registerAuthAction = (userState, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/register", userState);
      const { data } = res;
      dispatch({ type: AuthActionType.REGISTER_SUCCESS, payload: data });
      history.push("/dashboard");

    } catch (error) {
      dispatch({ type: AuthActionType.REGISTER_FAIL_CONFLICT, payload: {} });
    }
  };
};

export const loginAuthAction = (userState, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/auth/login", userState);
      const { data } = res;
      dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: data });
      history.push("/dashboard");

    } catch (error) {
      dispatch({ type: AuthActionType.LOGIN_FAIL, payload: null });
    }
  };
};


export const validateSession = () => {
  return async (dispatch) => {
    const auth = AuthorizationHeader();
    
    if (auth.headers.Authorization) {
      try {
        await axios.get("/validate-session", auth);
        dispatch({ type: AuthActionType.SET_USER})
      } catch (error) {
        dispatch({ type: AuthActionType.VALIDATION_FAIL, payload: {} });
      }
    }
  }
}


export const logOutAuthAction = () => {
  return async (dispatch) => {
    // const rest = await axios.post("/logout");
    dispatch({ type: AuthActionType.LOGOUT, payload: null });
  }
}

export const clearErrorAction = () => {
  return {
    type: AuthActionType.CLEAR_ERROR,
    payload: null
  }
}

export const mismatchErrorAction = () => {
  return {
    type: AuthActionType.PASSWORD_MISMATCH,
    payload: null
  }
}
