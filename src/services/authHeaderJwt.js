import { authUser } from '../constants';

export default function AuthHeader(json = false) {
  const auth = localStorage.getItem(authUser);
  const header = { headers: {} };
  
  try {
    const authObj = JSON.parse(auth);
    const { access_token: jwt } = authObj.user;
    if (jwt) {
      header.headers["Authorization"] = `Bearer ${jwt}`;
      
      if (json) header.headers["Content-Type"] = "application/json";
    }
  } catch (error) { }
  
  return header
};
