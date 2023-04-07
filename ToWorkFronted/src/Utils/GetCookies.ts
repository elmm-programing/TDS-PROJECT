import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const getToken = ()=>{
return cookies.get('jwtToken')
}
export const setCookie = (key:string,value:string)=>{
        cookies.set(key, value, { path: '/' });
}
