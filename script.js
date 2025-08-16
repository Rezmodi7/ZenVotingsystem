// main.js
let web3;
let userAccount;
let contract;

const contractAddress = "0x7e7e2c4f0e3b6e2a9f9e3e3f3e3e3e3e3e3e3e3e";

const abi = [
    {
        "inputs": [
            { "internalType": "string", "name": "_description", "type": "string" }
        ],
        "name": "createProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_proposalId", "type": "uint256" },
            { "internalType": "bool", "name": "_vote", "type": "bool" }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "proposals",
        "outputs": [
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "uint256", "name": "voteCountYes", "type": "uint256" },
            { "internalType": "uint256", "name": "voteCountNo", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getProposalCount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_proposalId", "type": "uint256" }],
        "name": "getProposal",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function switchToZenChainTestnet() {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x20D8" }] // 8408 به هگز
        });
    } catch (switchError) {
        console.error("Error switching to ZenChain Testnet:", switchError);
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: "0x20D8",
                        chainName: "ZenChain Testnet",
                        rpcUrls: ["https://zenchain-testnet.api.onfinality.io/public"],
                        nativeCurrency: {
                            name: "Zen Test Coin",
                            symbol: "ZTC",
                            decimals: 18
                        },
                        blockExplorerUrls: []
                    }]
                });
            } catch (addError) {
                console.error("Failed to add ZenChain Testnet:", addError);
            }
        }
    }
}

async function connectWallet() {
    if (window.ethereum) {
        try {
            await switchToZenChainTestnet();
            await window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            userAccount = accounts[0];
            contract = new web3.eth.Contract(abi, contractAddress);

            document.getElementById("wallet-address").innerText = `Connected: ${userAccount}`;

            loadProposals(); // فراخوانی داده‌ها از قرارداد
        } catch (err) {
            console.error("Connection error:", err);
        }
    } else {
        alert("MetaMask not detected!");
    }
}

async function loadProposals() {
    const count = await contract.methods.getProposalCount().call();
    console.log(`Total proposals: ${count}`);
    for (let i = 0; i < count; i++) {
        const proposal = await contract.methods.getProposal(i).call();
        console.log(`Proposal ${i}:`, proposal);
    }
}
