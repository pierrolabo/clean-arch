import axios from 'axios'
export class RESTFakeHttpCLient {
    get(url: string): Promise<any> {
        return axios.get(url, {})  // <= return the Promise
        .then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data)
            })
        });
    }
}