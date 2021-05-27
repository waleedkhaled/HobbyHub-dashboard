import axios from "axios";
import { instance } from "./api_instance";



class ApiService {
    
    getUsers =async ()=>{
        var data ;
       try {
        instance
        .get("users/all")
        .then(response => {
            console.log(response.data)
          
            data.push(response.data)
        });
        

         
       } catch (error) {
          throw error;
       }
       console.log("finally ",data)
       return data
    
      }


}

export default new ApiService();
