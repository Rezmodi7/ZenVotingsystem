import { ZenProposalSystemABI } from "./abi.js";

const contractAddress = "0xd5d8440f5c4f0d97f6Dcc837207F78bf08801e38"; // Your deployed contract
let provider;
let signer;
let contract;

const connectButton = document.getElementById("connectButton");
const proposalForm = document.getElementById("proposalForm");
const proposalList = document.getElementById("proposalList");

async function connectWallet() {
  try {
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, ZenProposalSystemABI, signer);
    connectButton.textContent = "Connected";
    loadProposals();
  } catch (err) {
    console.error("Failed to connect MetaMask:", err);
    alert("Failed to connect MetaMask: " + err.message);
  }
}

connectButton.addEventListener("click", connectWallet);

proposalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!contract) return alert("Connect wallet first");

  const name = document.getElementById("proposalName").value;
  const description = document.getElementById("proposalDescription").value;
  const extraData = document.getElementById("extraData").value;
  const formType = parseInt(document.getElementById("formType").value);

  try {
    const tx = await contract.createProposal(name, description, extraData, formType);
    await tx.wait();
    alert("Proposal created successfully");
    loadProposals();
  } catch (err) {
    console.error(err);
    alert("Error creating proposal: " + err.message);
  }
});

async function loadProposals() {
  if (!contract) return;
  proposalList.innerHTML = "";
  try {
    const count = await contract.getProposalCount();
    for (let i = 0; i < count; i++) {
      const p = await contract.getProposalDetails(i);
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${p[0]}</h3>
        <p>${p[1]}</p>
        <p>Type: ${p[2]}</p>
        <p>Votes: ${p[4]}</p>
        <p>Likes: ${p[7]}</p>
        <hr/>
      `;
      proposalList.appendChild(div);
    }
  } catch (err) {
    console.error(err);
  }
}
