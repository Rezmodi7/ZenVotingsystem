import { abi } from './abi.js';

const contractAddress = '0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A';
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
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    alert('Wallet connected ✅');
  } else {
    alert('Please install MetaMask!');
  }
};

document.getElementById('createProposal').onclick = async () => {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const extraData = document.getElementById('extraData').value;
  const formType = parseInt(document.getElementById('formType').value);

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
  try {
    const count = await contract.getProposalCount();
    const container = document.getElementById('proposalList');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const [name, description, extraData, formType] = await contract.getProposalDetails(i);
      const div = document.createElement('div');
      div.className = 'proposal-card';
      div.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Extra:</strong> ${extraData}</p>
        <p><strong>Form Type:</strong> ${formTypes[formType]}</p>
        <hr/>
      `;
      container.appendChild(div);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Error loading proposals');
  }
};
