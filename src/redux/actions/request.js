import {type} from '../../util/util';
export default function request(config) {

    function setHeaders(req, headersArray) {
        headersArray.forEach((headerObj) => {
            let {headerKey, headerValue} = headerObj;
            req.setRequestHeader(headerKey, headerValue);
        });
    }
    let {method, url, headers, body} = config;
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open(method, url);
        if (headers) {
            if (type(headers) !== 'Array') {
                throw new Error('Headers must be passed in as an array.');
            }
            req.withCredentials = true;
            setHeaders(req, headers);
        }
        
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status < 300) {
                    resolve(JSON.parse(req.responseText))
                } else {
                    reject(req);
                }
            }
        }
        if (method === 'GET') {
            req.send();
        } else {
            req.send(JSON.stringify(body));
        }
    });
}