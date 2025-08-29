import { abi } from "./abi.js";

const connectButton = document.getElementById("connectButton");
const proposalForm = document.getElementById("proposalForm");
const proposalList = document.getElementById("proposalList");

let provider;
let signer;
let contract;
const contractAddress = "0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A"; // <-- Replace with your deployed contract

// Connect Wallet
connectButton.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, abi, signer);
      connectButton.textContent = "Wallet Connected";
      loadProposals();
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet");
    }
  } else {
    alert("MetaMask not detected. Please install MetaMask.");
  }
});

// Submit Proposal
proposalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("proposalName").value;
  const description = document.getElementById("proposalDescription").value;
  const extraData = document.getElementById("extraData").value;
  const formType = parseInt(document.getElementById("formType").value);

  try {
    const tx = await contract.createProposal(name, description, extraData, formType);
    await tx.wait();
    alert("Proposal submitted!");
    proposalForm.reset();
    loadProposals();
  } catch (error) {
    console.error(error);
    alert("Failed to submit proposal");
  }
});

// Load Latest Proposals
async function loadProposals() {
  if (!contract) return;

  proposalList.innerHTML = "";
  try {
    const proposals = await contract.getLatestProposals(20);
    proposals.forEach((p, index) => {
      const div = document.createElement("div");
      div.className = "proposal";
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>Type: ${p.formType}</p>
        <p>Votes: ${p.voteCount} | Likes: ${p.likeCount} | Comments: ${p.commentCount}</p>
        <button onclick="voteProposal(${index})">Vote</button>
        <button onclick="likeProposal(${index})">Like</button>
      `;
      proposalList.appendChild(div);
    });
  } catch (error) {
    console.error("Failed to load proposals:", error);
  }
}

// Vote
window.voteProposal = async (index) => {
  try {
    const tx = await contract.vote(index);
    await tx.wait();
    alert("Voted successfully!");
    loadProposals();
  } catch (error) {
    console.error(error);
    alert("Failed to vote. Maybe you already voted.");
  }
};

// Like
window.likeProposal = async (index) => {
  try {
    const tx = await contract.likeProposal(index);
    await tx.wait();
    alert("Liked successfully!");
    loadProposals();
  } catch (error) {
    console.error(error);
    alert("Failed to like. Maybe you already liked this proposal.");
  }
};
