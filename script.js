import { abi } from './abi.js';

const contractAddress = "0x59edC219E3D17DeA0c11ea78B55be3950A920f27";
let web3, contract, accounts;

// Connect Wallet
document.getElementById("connectWallet").onclick = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(abi, contractAddress);
    document.getElementById("walletAddress").innerText = `Connected: ${accounts[0]}`;
    await loadProposals();
  } else {
    alert("MetaMask not detected!");
  }
};

// Create Proposal
document.getElementById("submitProposal").onclick = async () => {
  const name = document.getElementById("proposalName").value.trim();
  const description = document.getElementById("proposalDescription").value.trim();
  const formType = parseInt(document.getElementById("proposalFormType").value);
  const extraData = document.getElementById("proposalExtraData").value.trim();
  if (!name || !description) return alert("Title and Description are required!");
  try {
    await contract.methods.createProposal(name, description, extraData, formType)
      .send({ from: accounts[0] });
    alert("Proposal created successfully!");
    document.getElementById("proposalName").value = "";
    document.getElementById("proposalDescription").value = "";
    document.getElementById("proposalExtraData").value = "";
    document.getElementById("proposalFormType").value = "0";
    await loadProposals();
  } catch (err) {
    console.error(err);
    alert("Failed to create proposal. Maybe 6 hours not passed.");
  }
};

// Load Proposals
async function loadProposals() {
  if (!contract) return;
  const count = await contract.methods.getProposalCount().call();
  const container = document.getElementById("proposalsContainer");
  container.innerHTML = "";

  const proposals = [];
  for (let i = 0; i < count; i++) {
    const p = await contract.methods.getProposalDetails(i).call();
    proposals.push({ ...p, index: i });
  }

  // Sort by Votes and Likes
  proposals.sort((a,b) => b.voteCount - a.voteCount || b.likeCount - a.likeCount);

  proposals.forEach(p => {
    const div = document.createElement("div");
    div.className = "proposal";
    div.innerHTML = `
      <strong>${p.name}</strong> [Type ${p.formType}]<br>
      ${p.description}<br>
      Extra: ${p.extraData}<br>
      Creator: ${p.creator}<br>
      Timestamp: ${new Date(p.timestamp*1000).toLocaleString()}<br>
      Votes: ${p.voteCount} <button onclick="vote(${p.index})">Vote</button>
      Likes: ${p.likeCount} <button onclick="like(${p.index})">Like</button>
      <div id="comments-${p.index}">
        <h4>Comments:</h4>
        <input type="text" id="commentInput-${p.index}" placeholder="Add comment"/>
        <button onclick="addComment(${p.index})">Comment</button>
      </div>
    `;
    container.appendChild(div);
    loadComments(p.index);
  });
}

// Vote
window.vote = async (index) => {
  try { await contract.methods.vote(index).send({ from: accounts[0] }); await loadProposals(); }
  catch(err){ console.error(err); alert("Failed to vote."); }
};

// Like
window.like = async (index) => {
  try { await contract.methods.likeProposal(index).send({ from: accounts[0] }); await loadProposals(); }
  catch(err){ console.error(err); alert("Failed to like."); }
};

// Add Comment
window.addComment = async (index) => {
  const input = document.getElementById(`commentInput-${index}`);
  const text = input.value.trim();
  if(!text) return alert("Comment cannot be empty.");
  try {
    await contract.methods.commentOnProposal(index, text).send({ from: accounts[0] });
    input.value = "";
    loadComments(index);
  } catch(err){ console.error(err); alert("Failed to add comment."); }
};

// Load Comments
async function loadComments(index){
  const container = document.getElementById(`comments-${index}`);
  if(!contract) return;
  const comments = await contract.methods.getComments(index).call();
  container.querySelectorAll(".comment").forEach(c => c.remove());
  comments.forEach(c=>{
    if(!c.deleted){
      const div = document.createElement("div");
      div.className = "comment";
      div.innerText = `${c.commenter}: ${c.text} ${c.edited?'(edited)':''}`;
      container.appendChild(div);
    }
  });
}
