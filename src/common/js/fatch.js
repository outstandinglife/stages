import http from './http';
const ERR_OK = 200;
const ERR_CODE = '0';

const fatch = function (url, type, parmas, callback) {
    return new Promise((resolve, reject) => {
        http(url, type, parmas).then((res) => {
            if (res.status === ERR_OK && res.data.code === ERR_CODE) resolve(res.data);
            else resolve(res.data);
        }).catch((err) => {
            callback('网络错误', false);
        })
    });
}

export default fatch;