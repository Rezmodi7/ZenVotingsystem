import { abi } from './abi.js';

const contractAddress = '0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A';
let contract;

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
  const formTypeId = parseInt(document.getElementById('formTypeId').value);

  try {
    const tx = await contract.createProposal(name, description, extraData, formTypeId);
    await tx.wait();
    alert('✅ Proposal submitted successfully');
  } catch (err) {
    console.error(err);
    alert('❌ Error submitting proposal');
  }
};

document.getElementById('getProposal').onclick = async () => {
  const index = parseInt(document.getElementById('proposalIndex').value);
  try {
    const details = await contract.getProposalDetails(index);
    document.getElementById('proposalDetails').textContent = JSON.stringify(details, null, 2);
  } catch (err) {
    console.error(err);
    alert('❌ Error fetching proposal');
  }
};
