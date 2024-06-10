import axios from "axios";
const url = 'http://localhost:8080';
export default class UserApi {
    async login(email, password) {
        return axios.post(`${url}/api/v1/login`, {
            email,
            password
          });
    }

    async signup (formData) {
        return axios.post(`${url}/api/v1/signUp`, {
            name: formData.firstName,
            surname: formData.lastName,
            email: formData.email,
            password: formData.password,
            country: formData.country,
            city: formData.city
        });
    }
}