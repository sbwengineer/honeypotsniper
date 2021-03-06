const Web3 = require('web3');
web3 = new Web3('https://bsc-dataseed.binance.org/');
const axios = require('axios');
const pancakeswap_address_v2 = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const pancakeswap_address_nsh3 = "0x0DCb9863b54f3150B7d749f7d5b68D8542263EDb";
exports.bsc_check = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      contract_address = req.body.contract_address;
      await check_bsc(contract_address,(err, data) => {
        if (err)
          res.send(Honeypot!!!);
        else res.send(data);
      });
};

const check_bsc = async (contract_address, result) => {
  let contract_abi;
  let pancakeswap_balance_v2, pancakeswap_balance_nsh3;
  const url = 'https://api.bscscan.com/api?module=contract&action=getabi&address=' + contract_address + '&apikey=' + 'AZJBFJCCYB5CNRCMJR4WTQTEIDIJ43KW9J';
  await axios.get(url)
  .then(response => {
    contract_abi = response.data.result;
  })
  .catch(error => {
    result(error,null);
    return;
  });

  try{
    const UserContract = new web3.eth.Contract( JSON.parse(contract_abi), contract_address );
    pancakeswap_balance_v2 = await UserContract.methods.balanceOf(pancakeswap_address_v2).call();
    pancakeswap_balance_nsh3 = await UserContract.methods.balanceOf(pancakeswap_address_nsh3).call();
  } catch(error) {
    result(error, null);
    return;
  }

  if(parseInt(pancakeswap_balance_v2) === 0 && parseInt(pancakeswap_balance_nsh3) === 0)
    result(null, "Honeypot!!!");
  else
    result(null, "No Honeypot!!!");
}

