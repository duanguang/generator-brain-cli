import axios, {AxiosPromise} from 'axios';

function get(url): AxiosPromise {
    console.log(url)
    return axios.get(url).then((response) => {
        return response.data;
    });
}

const request = {
    get
};

export default request;