// script.js
import { abi } from "./abi.js";

let provider;
let signer;
let contract;

const contractAddress = "0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A"; // آدرس کانترکت ZenProposalSystem

const connectButton = document.getElementById("connectButton");
const proposalForm = document.getElementById("proposalForm");
const proposalList = document.getElementById("proposalList");

// --- Connect Wallet ---
async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask is not installed. Please install it to use this app.");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    connectButton.innerText = "Wallet Connected";
    connectButton.disabled = true;

    loadProposals();
  } catch (error) {
    console.error(error);
    alert("Failed to connect wallet.");
  }
}

connectButton.addEventListener("click", connectWallet);

// --- Create Proposal ---
proposalForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("proposalName").value.trim();
  const description = document.getElementById("proposalDescription").value.trim();
  const extraData = document.getElementById("extraData").value.trim();
  const formType = parseInt(document.getElementById("formType").value);

  if (!name || !description) {
    alert("Please enter both name and description.");
    return;
  }

  try {
    const tx = await contract.createProposal(name, description, extraData, formType);
    await tx.wait();
    alert("Proposal created successfully!");
    proposalForm.reset();
    loadProposals();
  } catch (err) {
    console.error(err);
    alert("Failed to create proposal.");
  }
});

// --- Load Proposals ---
async function loadProposals() {
  proposalList.innerHTML = "";

  try {
    const proposals = await contract.getLatestProposals(10); // آخرین 10 پروپوزال
    proposals.forEach((p, index) => {
      const div = document.createElement("div");
      div.className = "proposal";
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>Type: ${p.formType}</p>
        <p>Votes: ${p.voteCount} | Likes: ${p.likeCount} | Comments: ${p.commentCount}</p>
        <button onclick="vote(${index})">Vote</button>
        <button onclick="like(${index})">Like</button>
      `;
      proposalList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

// --- Vote ---
window.vote = async (index) => {
  try {
    const tx = await contract.vote(index);
    await tx.wait();
    alert("Voted successfully!");
    loadProposals();
  } catch (err) {
    console.error(err);
    alert("Failed to vote. Maybe you already voted.");
  }
};

// --- Like ---
window.like = async (index) => {
  try {
    const tx = await contract.likeProposal(index);
    await tx.wait();
    alert("Liked successfully!");
    loadProposals();
  } catch (err) {
    console.error(err);
    alert("Failed to like. Maybe you already liked.");
  }
};

// --- Initial load ---
if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
}
