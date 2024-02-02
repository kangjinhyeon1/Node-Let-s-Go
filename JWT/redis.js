const { createClient } = require('redis');

const redisCli = new createClient({ legacyMode: true });

redisCli.on('connect', () => {
    console.log("레디스 연결됨")
})

redisCli.on('err', err => {
    console.err(err);
})

module.exports = {
    redisCli
}