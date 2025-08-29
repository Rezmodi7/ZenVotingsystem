import { abi } from './abi.js';

const contractAddress = "0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A";
let provider, signer, contract;

async function connectWallet() {
  if (!window.ethereum) return alert("Please install MetaMask!");
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
  alert("Wallet connected successfully!");
}

async function createProposal(name, description, extraData, formType) {
  const tx = await contract.createProposal(name, description, extraData, formType);
  await tx.wait();
}

async function voteOnProposal(proposalId, voteType) {
  const tx = await contract.vote(proposalId, voteType);
  await tx.wait();
}

async function likeProposal(proposalId) {
  const tx = await contract.likeProposal(proposalId);
  await tx.wait();
}

async function addComment(proposalId, text) {
  const tx = await contract.addComment(proposalId, text);
  await tx.wait();
}

async function getProposals() {
  const proposals = await contract.getProposals();
  const container = document.getElementById("proposalList");
  container.innerHTML = "";

  for (let i = 0; i < proposals.length; i++) {
    const p = proposals[i];
    const card = document.createElement("div");
    card.className = "proposalCard";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p><strong>Extra:</strong> ${p.extraData}</p>
      <button onclick="voteOnProposal(${i}, 1)">👍 Vote Yes</button>
      <button onclick="voteOnProposal(${i}, 0)">👎 Vote No</button>
      <button onclick="likeProposal(${i})">❤️ Like</button>
      <textarea id="comment-${i}" placeholder="Add comment"></textarea>
      <button onclick="submitComment(${i})">💬 Submit Comment</button>
    `;
    container.appendChild(card);
  }
}

window.submitComment = async function(proposalId) {
  const text = document.getElementById(`comment-${proposalId}`).value;
  if (!text) return alert("Comment cannot be empty");
  await addComment(proposalId, text);
  alert("Comment submitted!");
};

document.getElementById("connectButton").addEventListener("click", connectWallet);

document.getElementById("proposalForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("proposalName").value;
  const description = document.getElementById("proposalDescription").value;
  const extraData = document.getElementById("extraData").value;
  const formType = parseInt(document.getElementById("formType").value);

  try {
    await createProposal(name, description, extraData, formType);
    alert("Proposal created!");
    await getProposals();
  } catch (err) {
    console.error(err);
    alert("Error creating proposal.");
  }
});

window.addEventListener("load", getProposals);
