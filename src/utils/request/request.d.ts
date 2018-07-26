import { AxiosPromise } from 'axios';
declare const request: {
    get: (url: any) => AxiosPromise;
};
export default request;
