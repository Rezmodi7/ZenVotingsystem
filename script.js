import { abi } from './abi.js';

const contractAddress = '0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A';
const rpcUrl = 'https://zenchain-testnet.api.onfinality.io/public';

let provider;
let signer;
let contract;

const formTypes = [
  "General", "Cultural", "Environmental", "Survey", "ZenBuilder",
  "ZenQuest", "ZenSupport", "ZenEvent", "ZenCollab", "ZenEducation",
  "ZenMarketing"
];

window.onload = () => {
  const select = document.getElementById('formType');
  formTypes.forEach((type, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = type;
    select.appendChild(option);
  });
};

document.getElementById('connectWallet').onclick = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, abi, signer);
      alert('Wallet connected ✅');
    } catch (err) {
      console.error('Wallet connection failed:', err);
      alert('❌ Failed to connect wallet');
    }
  } else {
    alert('MetaMask not detected');
  }
};

document.getElementById('createProposal').onclick = async () => {
  if (!contract) {
    alert('Please connect your wallet first');
    return;
  }

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const extraData = document.getElementById('extraData').value;
  const formType = parseInt(document.getElementById('formType').value);

  if (!name || !description || isNaN(formType)) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const tx = await contract.createProposal(name, description, extraData, formType);
    await tx.wait();
    alert('✅ Proposal submitted');
  } catch (err) {
    console.error(err);
    alert('❌ Error submitting proposal');
  }
};

document.getElementById('loadProposals').onclick = async () => {
  if (!contract) {
    alert('Please connect your wallet first');
    return;
  }

  try {
    const count = await contract.getProposalCount();
    const container = document.getElementById('proposalList');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const proposal = await contract.getProposalDetails(i);
      const div = document.createElement('div');
      div.className = 'proposal-card';
      div.innerHTML = `
        <h3>${proposal.name}</h3>
        <p><strong>Description:</strong> ${proposal.description}</p>
        <p><strong>Extra:</strong> ${proposal.extraData}</p>
        <p><strong>Form Type:</strong> ${formTypes[proposal.formType]}</p>
        <p><strong>Votes:</strong> ${proposal.voteCount}</p>
        <p><strong>Likes:</strong> ${proposal.likeCount}</p>
        <p><strong>Comments:</strong> ${proposal.commentCount}</p>
        <button onclick="voteProposal(${i})">Vote</button>
        <button onclick="likeProposal(${i})">Like</button>
      `;
      container.appendChild(div);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Error loading proposals');
  }
};

window.voteProposal = async (index) => {
  try {
    const tx = await contract.vote(index);
    await tx.wait();
    alert(`✅ Voted on proposal ${index}`);
  } catch (err) {
    console.error(err);
    alert('❌ Error voting');
  }
};

window.likeProposal = async (index) => {
  try {
    const tx = await contract.likeProposal(index);
    await tx.wait();
    alert(`👍 Liked proposal ${index}`);
  } catch (err) {
    console.error(err);
    alert('❌ Error liking proposal');
  }
};
