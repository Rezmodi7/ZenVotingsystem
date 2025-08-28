import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.7.0/+esm';
import abi from './abi.js';

const provider = new ethers.JsonRpcProvider('https://zenchain-testnet.api.onfinality.io/public');
const contractAddress = '0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A';
const contract = new ethers.Contract(contractAddress, abi, provider);

window.voteCandidate = async function () {
  const candidateId = document.getElementById('candidateId').value;
  const privateKey = document.getElementById('privateKey').value;
  const statusDiv = document.getElementById('status');

  if (!candidateId || !privateKey) {
    statusDiv.textContent = 'Please enter both Candidate ID and Private Key.';
    return;
  }

  try {
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = contract.connect(wallet);
    const tx = await contractWithSigner.vote(candidateId);
    await tx.wait();
    statusDiv.textContent = 'Vote submitted successfully!';
  } catch (error) {
    statusDiv.textContent = 'Error submitting vote: ' + error.message;
  }
};

window.getVoteCount = async function () {
  const candidateId = document.getElementById('candidateId').value;
  const statusDiv = document.getElementById('status');

  if (!candidateId) {
    statusDiv.textContent = 'Please enter Candidate ID.';
    return;
  }

  try {
    const votes = await contract.getVoteCount(candidateId);
    statusDiv.textContent = `Candidate ${candidateId} has ${votes.toString()} votes.`;
  } catch (error) {
    statusDiv.textContent = 'Error fetching vote count: ' + error.message;
  }
};
