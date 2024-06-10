import axios from "axios";


const url = 'http://localhost:8080';

export default class MovieApi {
    getAll() {
        return axios.get(`${url}/api/v1/movies`)
    }
}