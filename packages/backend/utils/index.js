const ethers = require('ethers');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

function toLowerCase(str) {
  if(!str || typeof str !== "string") return '';

  return str.toLowerCase().trim();
}

function processAddress(req, res, next) {
  Object.keys(req.query).forEach(key => {
    if(ethers.utils.isAddress(req.query[key])) {
      req.query[key] = toLowerCase(req.query[key])
    }
  })
  Object.keys(req.params).forEach(key => {
    if(ethers.utils.isAddress(req.params[key])) {
      req.params[key] = toLowerCase(req.params[key])
    }
  })
  Object.keys(req.body).forEach(key => {
    if(ethers.utils.isAddress(req.body[key])) {
      req.body[key] = toLowerCase(req.body[key])
    }
  })

  next();
}

module.exports = {
  makeid,
  toLowerCase,
  processAddress,
  sleep,
};
