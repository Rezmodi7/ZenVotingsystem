import { abi } from './abi.js';

const contractAddress = "0x59edC219E3D17DeA0c11ea78B55be3950A920f27";
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
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet.");
    }
  } else {
    alert("MetaMask not detected!");
  }
};

document.getElementById("getProposal").onclick = async () => {
  if (!contract) return alert("Connect your wallet first.");

  try {
    const count = await contract.methods.getProposalCount().call();
    const container = document.getElementById("proposalDetails");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const proposal = await contract.methods.proposals(i).call();

      const card = document.createElement("div");
      card.className = "proposal-card";

      card.innerHTML = `
        <p><strong>ID:</strong> ${i}</p>
        <p><strong>Name:</strong> ${proposal.name}</p>
        <p><strong>Votes:</strong> <span id="voteCount-${i}">${proposal.voteCount}</span></p>
        <button class="vote-btn" id="voteBtn-${i}">Vote</button>
      `;

      container.appendChild(card);

      document.getElementById(`voteBtn-${i}`).onclick = async () => {
        try {
          await contract.methods.vote(i).send({ from: accounts[0] });
          const updatedProposal = await contract.methods.proposals(i).call();
          document.getElementById(`voteCount-${i}`).innerText = updatedProposal.voteCount;
          alert(`You voted for "${proposal.name}"!`);
        } catch (err) {
          console.error(err);
          alert("Voting failed.");
        }
      };
    }
  } catch (err) {
    console.error(err);
    alert("Failed to load proposals.");
  }
};
