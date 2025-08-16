import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

// --- Replace with your contract's address ---
const contractAddress = "0x3d426c1CA2406689E171D875bD4b0024DA7421cD";

// --- Replace with your contract's ABI ---
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "proposalNames",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getProposalCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const connectButton = document.getElementById("connectWallet");
const votingArea = document.getElementById("voting-area");
const userAddressSpan = document.getElementById("userAddress");
const proposalsList = document.getElementById("proposals-list");
const resultsList = document.getElementById("results-list");

let signer;
let votingContract;

async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            const address = await signer.getAddress();
            userAddressSpan.innerText = address;
            votingArea.style.display = "block";
            connectButton.style.display = "none";
            
            votingContract = new ethers.Contract(contractAddress, contractABI, signer);
            renderProposals();
            updateResults();

            votingContract.on("Voted", (voter, proposalIndex) => {
                console.log(`New vote from ${voter} for proposal index ${proposalIndex}`);
                updateResults();
            });

        } else {
            alert("Please install a web3 wallet like Metamask to use this DApp!");
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

async function renderProposals() {
    try {
        const count = await votingContract.getProposalCount();
        proposalsList.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const proposal = await votingContract.proposals(i);
            const button = document.createElement("button");
            button.innerText = `Vote for ${proposal.name}`;
            button.onclick = () => vote(i);
            proposalsList.appendChild(button);
        }
    } catch (error) {
        console.error("Error rendering proposals:", error);
    }
}

async function vote(proposalIndex) {
    try {
        const tx = await votingContract.vote(proposalIndex);
        alert("Transaction sent! Please confirm in your wallet.");
        await tx.wait();
        alert("Your vote has been successfully cast!");
    } catch (error) {
        console.error("Error casting vote:", error);
        alert("Error: " + (error.data?.message || error.message));
    }
}

async function updateResults() {
    try {
        const count = await votingContract.getProposalCount();
        resultsList.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const proposal = await votingContract.proposals(i);
            const proposalCard = document.createElement("div");
            proposalCard.className = "proposal-card";
            proposalCard.innerHTML = `<h3>${proposal.name}</h3><p>Votes: ${proposal.voteCount}</p>`;
            resultsList.appendChild(proposalCard);
        }
    } catch (error) {
        console.error("Error updating results:", error);
    }
}

connectButton.addEventListener("click", connectWallet);
