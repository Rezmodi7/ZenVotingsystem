import { abi } from "./abi.js";

const contractAddress = "0x61A4d314221B8683284c58da679AfDd11DFAF20c"; // deployed contract
let provider, signer, contract;

// ----------------- Connect Wallet -----------------
async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    // ✅ show short wallet address
    const userAddress = await signer.getAddress();
    const shortAddr = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);

    const btn = document.getElementById("connectButton");
    btn.textContent = `Connected: ${shortAddr}`;
    btn.classList.add("connected");

    alert("Wallet connected successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to connect wallet.");
  }
}

// ----------------- Smart Contract Actions -----------------
async function createProposal(name, description, extraData, formType) {
  const tx = await contract.createProposal(name, description, extraData, formType);
  await tx.wait();
}

async function voteOnProposal(proposalId) {
  const tx = await contract.vote(proposalId);
  await tx.wait();
}

async function likeProposal(proposalId) {
  const tx = await contract.likeProposal(proposalId);
  await tx.wait();
}

async function addComment(proposalId, text) {
  const tx = await contract.commentOnProposal(proposalId, text);
  await tx.wait();
}

// ----------------- Load Proposals -----------------
async function loadProposals() {
  try {
    const count = await contract.getProposalCount();
    const container = document.getElementById("proposalList");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const p = await contract.getProposalDetails(i);

      const card = document.createElement("div");
      card.className = "proposalCard";
      card.innerHTML = `
        <h3>${p[0]}</h3>
        <p>${p[1]}</p>
        <p><b>Extra:</b> ${p[3]}</p>
        <p><b>Votes:</b> ${p[4]}</p>
        <p><b>Likes:</b> ${p[7]}</p>
        <p><b>Comments:</b> ${p[8]}</p>

        <button onclick="voteOnProposal(${i})">🗳️ Vote</button>
        <button onclick="likeProposal(${i})">❤️ Like</button>
        <br><br>
        <textarea id="comment-${i}" placeholder="Add comment"></textarea>
        <button onclick="submitComment(${i})">💬 Submit Comment</button>
      `;
      container.appendChild(card);
    }
  } catch (err) {
    console.error("Error loading proposals:", err);
  }
}

// ----------------- Handle Comments -----------------
window.submitComment = async function (proposalId) {
  const text = document.getElementById(`comment-${proposalId}`).value;
  if (!text) {
    alert("Comment cannot be empty");
    return;
  }
  await addComment(proposalId, text);
  alert("Comment submitted!");
};

// ----------------- Event Listeners -----------------
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
    await loadProposals();
  } catch (err) {
    console.error(err);
    alert("Error creating proposal.");
  }
});

document.getElementById("loadButton").addEventListener("click", loadProposals);

// Auto-load proposals on page load
window.addEventListener("load", loadProposals);
