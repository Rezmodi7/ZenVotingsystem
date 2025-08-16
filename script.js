import { abi } from './abi.js';

const contractAddress = "0x59edC219E3D17DeA0c11ea78B55be3950A920f27";
let web3;
let contract;
let accounts;

document.getElementById("connectWallet").onclick = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(abi, contractAddress);
    document.getElementById("walletAddress").innerText = `Connected: ${accounts[0]}`;
  } else {
    alert("MetaMask not detected!");
  }
};

document.getElementById("getProposal").onclick = async () => {
  if (!contract) return alert("Connect your wallet first.");
  try {
    const proposal = await contract.methods.getProposalDetails(0).call();
    document.getElementById("proposalDetails").innerText = JSON.stringify(proposal, null, 2);
  } catch (err) {
    console.error(err);
    alert("Failed to load proposal.");
  }
};
