module.exports = app => {
    const honeypot_eth = require("../controllers/honeypot_eth.controllers.js");
    var eth_router = require("express").Router();
    eth_router.post("/check_eth_honeypot/", honeypot_eth.eth_check);
    app.use('/api', eth_router);

    const honeypot_bsc = require("../controllers/honeypot_bsc.controllers.js");
    var bsc_router = require("express").Router();
    bsc_router.post("/check_bsc_honeypot/", honeypot_bsc.bsc_check);
    app.use('/api', bsc_router);
  };