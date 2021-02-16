import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burgerbuilder-f3665-default-rtdb.firebaseio.com"
});

export default instance;