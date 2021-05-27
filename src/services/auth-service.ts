import axios from "axios";

const API_URL = "https://hobby-hub-project.herokuapp.com/";

class AuthService {

  login=(username:string, password:string)=> {
    try {
      return axios
      .post(API_URL + "sign-in", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {

          localStorage.setItem("user", JSON.stringify(response.data.token));
        }
  
        return new Promise ((resolve, reject)=>{
          localStorage.setItem("user", JSON.stringify(response.data.token));
            resolve(response.data);           
        })
      }).catch((error)=>{
        console.log(error)
      });
    } catch (error) {
      console.log(error)
    }
  }

  logout() {
    localStorage.removeItem("user");
  }


  getCurrentUser() {
    
    return JSON.parse(localStorage.getItem('user') as any);
  }
  
}

export default new AuthService();
