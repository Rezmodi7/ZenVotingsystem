const contractAddress = "0x3d426c1CA2406689E171D875bD4b0024DA7421cD";
const abi = [ 
    {
        "inputs": [{"internalType":"string[]","name":"proposalNames","type":"string[]"}],
        "stateMutability":"nonpayable","type":"constructor"
    },
    {
        "inputs":[{"internalType":"uint256","name":"proposalIndex","type":"uint256"}],
        "name":"vote","outputs":[],"stateMutabilitytype":"function"
    },
    {
        "anonymous":false,"inputs":[
            {"indexed":false,"internalType":"address","name":"voter","type":"address"},
            {"indexed":false,"internalType":"uint256","name":"proposalIndex","type":"uint256"}
        ],
        "name":"Voted","type":"event"
    },
    {
        "inputs":[],"name":"getProposalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
        "stateMutability":"view","    },
    {
        "inputs":[{"internalType":"uint256","name":"","type":"uint256"}],
        "name":"proposals","outputs":[
            {"internalType":"string","name":"name","type":"string"},
            {"internalType":"uint256","name":"voteCount","type":"uint256"}
        ],
        "stateMutability":"view","type":"function"
    }
];

let web3;
let contract;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(window.ethereum);
            const accounts = await();
            userAccount = accounts[0];
            document.getElementById("wallet-address").innerText = `Connected: ${userAccount}`;
            contract = new web3.eth.Contract(abi, contractAddress);
            loadProposals();
        } catch (err) {
            console.error("Wallet connection failed:", err);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

async function loadProposals() {
    const count = await contract.methods.getProposalCount().call();
    const container = document.getElementById("proposals");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const proposal = await contract.methods.proposals(i).call();
        const div = document.createElement("div");
        div.className = "proposal";
        div.innerHTML = `
            <strong>${proposal.name}</strong><br>
            Votes: ${proposal.voteCount}<br>
            <button onclick="vote(${i})">Vote</button>
        `;
        container.appendChild(div);
    }
}

async function vote(index) {
    try {
        document.getElementById("status").innerText = "Sending vote...";
        await contract.methods.vote(index).send({ from: userAccount });
        document.getElementById("status").innerText = "✅ Vote submitted!";
        loadProposals(); // Refresh vote counts
    } catch (err) {
        console.error("Vote failed:", err);
        document.getElementById("status").innerText = "❌ Vote failed.";
    }
}
