import { abi } from './abi.js';

const contractAddress = "0x574587378b381aBbc44296092BCCB9C5780356ca";
let web3;
let contract;
let accounts;

document.getElementById("connectWallet").onclick = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      accounts = await web3.eth.getAccounts();
      contract = new web3.eth.Contract(abi, contractAddress);
      document.getElementById("walletAddress").innerText = `Connected: ${accounts[0]}`;
      console.log("Wallet connected:", accounts[0]);
    } catch (err) {
      console.error("Error connecting wallet:", err);
      alert("Failed to connect wallet.");
    }
  } else {
    alert("MetaMask not detected!");
  }
};

document.getElementById("createProposal").onclick = async () => {
  if (!contract) return alert("Connect your wallet first.");
  
  const name = document.getElementById("proposalName").value.trim();
  const description = document.getElementById("proposalDescription").value.trim();
  const extraData = document.getElementById("proposalExtra").value.trim();
  const formType = parseInt(document.getElementById("proposalFormType").value);

  if (!name || !description || isNaN(formType)) return alert("Fill all fields correctly.");
  
  try {
    const tx = await contract.methods.createProposal(name, description, extraData, formType)
      .send({ from: accounts[0] });
    
    console.log("Transaction success:", tx);
    alert("Proposal created successfully!");
  } catch (err) {
    console.error("Transaction failed:", err);
    if (err?.data) {
      const reason = Object.values(err.data)[0]?.reason;
      if (reason) alert(`Transaction failed: ${reason}`);
      return;
    }
    alert("Transaction failed. See console for details.");
  }
};

document.getElementById("getProposal").onclick = async () => {
  if (!contract) return alert("Connect your wallet first.");
  try {
    const proposalIndex = parseInt(document.getElementById("proposalIndex").value);
    if (isNaN(proposalIndex)) return alert("Enter a valid proposal index.");
    
    const proposal = await contract.methods.getProposalDetails(proposalIndex).call();
    document.getElementById("proposalDetails").innerText = JSON.stringify(proposal, null, 2);
    console.log("Proposal details:", proposal);
  } catch (err) {
    console.error("Failed to get proposal:", err);
    alert("Failed to load proposal.");
  }
};
