import axios from "axios";

const url = 'http://localhost:8080';

export default class SearchApi {
    async search(keyword) {
        return axios.get(`${url}/api/v1/search/${keyword}`);
    }
}