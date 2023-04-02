const moment = require("moment")

const year = moment().format("YYYY");
const month = moment().format("MM");
const day = moment().format("DD");
const hour = moment().format("HH");
const minute = moment().format("mm");
const second = moment().format("ss");

console.log(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
