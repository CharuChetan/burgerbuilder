import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burgerbuilder-c72cc.firebaseio.com/"
});

export default instance;