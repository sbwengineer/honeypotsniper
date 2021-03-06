const Web3 = require("web3");
const web3 = new Web3('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

const axios = require('axios');
const uniswap_address_v3 = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
const uniswap_address_v2 = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

exports.eth_check = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      contract_address = req.body.contract_address;
      await check_eth(contract_address,(err, data) => {
        if (err)
          res.send("Honeypot!!!")
        else res.send(data);
      });
};

const check_eth = async (contract_address, result) => {
  let contract_abi;
  let uniswap_balance_v2, uniswap_balance_v3;
  const url = 'https://api.etherscan.io/api?module=contract&action=getabi&address=' + contract_address + '&apikey=' + '7MU9TK2MM5SPAA3DFXN6X9P59EFSMJK1Q8';
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
    uniswap_balance_v2 = await UserContract.methods.balanceOf(uniswap_address_v2).call();
    uniswap_balance_v3 = await UserContract.methods.balanceOf(uniswap_address_v3).call();
  } catch(error) {
    result(error, null);
    return;
  }
  if(parseInt(uniswap_balance_v2) === 0 && parseInt(uniswap_balance_v3))
    result(null, "Honeypot!!!");
  else
    result(null, "No Honeypot!!!");
}

