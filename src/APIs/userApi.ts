import axios from "axios";

const routeBase = axios.create({baseURL: 'https://route-egypt-api.herokuapp.com/'})

export async function signIn(email:string, password:string){
    return routeBase.post('/signin', {email: email, password: password})
};
export async function signUp(firstname, lastname, age, email, password){
    return routeBase.post('/signup', {first_name: firstname, last_name: lastname, age: age, email: email, password: password});
}