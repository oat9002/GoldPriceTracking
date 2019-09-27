import axios from 'axios';
import { config } from '../config/appConfig';

const instance = axios.create({
    baseURL: config.serverDomain
});

export default instance;