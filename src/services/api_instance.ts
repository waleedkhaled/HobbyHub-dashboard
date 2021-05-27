import axios from "axios";
import authHeader from "./auth-header";


export const instance = axios.create({
    baseURL: 'https://hobby-hub-project.herokuapp.com',
    headers:authHeader()
     //{Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMTczMjU1MiwiaWF0IjoxNjIxNjk2NTUyfQ.KIZompfKIpTk4fO59iQI6NaPgvLtD6LlV3jER6sFxxo'}`,

    
  });