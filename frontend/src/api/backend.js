import axios from 'axios';

export default axios.create({
    baseURL: 'http://'+ window.location.hostname+':3033',
    // headers: {

    // }
})