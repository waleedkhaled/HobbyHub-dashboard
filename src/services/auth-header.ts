  
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user') as any);
  
    if (user ) {
      return { Authorization: 'Bearer ' + user };
        
    } else {
      return false;
    }
  }