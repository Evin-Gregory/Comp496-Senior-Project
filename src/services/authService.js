import axios from "axios";
import AuthorizationHeader from "./authHeaderJwt";

class AuthService {
  login(email, password) {
    return axios.post("auth/login", { email, password })
  }
}