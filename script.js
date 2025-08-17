const contractAddress = "0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A";
export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "commenter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "CommentAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "deleter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "commentIndex",
				"type": "uint256"
			}
		],
		"name": "CommentDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "editor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "commentIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newText",
				"type": "string"
			}
		],
		"name": "CommentEdited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "ProposalCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "liker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "ProposalLiked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "commentOnProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "extraData",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "formTypeId",
				"type": "uint8"
			}
		],
		"name": "createProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "commentIndex",
				"type": "uint256"
			}
		],
		"name": "deleteComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "commentIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "newText",
				"type": "string"
			}
		],
		"name": "editComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "getComments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "commenter",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "text",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "edited",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "deleted",
						"type": "bool"
					}
				],
				"internalType": "struct ZenProposalSystem.Comment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "limit",
				"type": "uint256"
			}
		],
		"name": "getLatestProposals",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum ZenProposalSystem.FormType",
						"name": "formType",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "extraData",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "likeCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "commentCount",
						"type": "uint256"
					}
				],
				"internalType": "struct ZenProposalSystem.Proposal[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getProposalDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "enum ZenProposalSystem.FormType",
				"name": "formType",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "extraData",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "likeCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "commentCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserPoints",
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
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserProposalCount",
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
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserProposals",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum ZenProposalSystem.FormType",
						"name": "formType",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "extraData",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "likeCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "commentCount",
						"type": "uint256"
					}
				],
				"internalType": "struct ZenProposalSystem.Proposal[]",
				"name": "",
				"type": "tuple[]"
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
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasLiked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initializeProposals",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initialized",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "likeProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposalComments",
		"outputs": [
			{
				"internalType": "address",
				"name": "commenter",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "edited",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "deleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "proposalCountByUser",
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
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "enum ZenProposalSystem.FormType",
				"name": "formType",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "extraData",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "likeCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "commentCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userPoints",
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
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

let provider;
let signer;
let contract;

const connectWalletBtn = document.getElementById("connectWalletBtn");
const createProposalBtn = document.getElementById("createProposalBtn");
const proposalsContainer = document.getElementById("proposalsContainer");

async function connectWallet() {
    if(window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        connectWalletBtn.textContent = "Wallet Connected";
        loadProposals();
    } else {
        alert("MetaMask not detected!");
    }
}

async function createProposal() {
    const name = document.getElementById("proposalName").value;
    const description = document.getElementById("proposalDescription").value;
    const extra = document.getElementById("proposalExtra").value;
    const formType = parseInt(document.getElementById("proposalFormType").value);

    if(!name) return alert("Enter a name");

    try {
        const tx = await contract.createProposal(name, description, extra, formType);
        await tx.wait();
        alert("Proposal created!");
        loadProposals();
    } catch(e) {
        console.error(e);
        alert("Error creating proposal");
    }
}

async function loadProposals() {
    proposalsContainer.innerHTML = "Loading...";
    try {
        const proposals = await contract.getLatestProposals(10);
        proposalsContainer.innerHTML = "";
        proposals.forEach((p, index) => {
            const card = document.createElement("div");
            card.classList.add("proposalCard");
            card.innerHTML = `
                <div class="proposalHeader">
                    <h3>${p.name}</h3>
                    <div class="proposalActions">
                        <button onclick="likeProposal(${index})">Like (${p.likeCount})</button>
                        <button onclick="voteProposal(${index})">Vote (${p.voteCount})</button>
                    </div>
                </div>
                <p>${p.description}</p>
                <small>Extra: ${p.extraData}</small>
            `;
            proposalsContainer.appendChild(card);
        });
    } catch(e) {
        console.error(e);
        proposalsContainer.innerHTML = "Error loading proposals.";
    }
}

async function likeProposal(index) {
    try {
        const tx = await contract.likeProposal(index);
        await tx.wait();
        loadProposals();
    } catch(e) { console.error(e); }
}

async function voteProposal(index) {
    try {
        const tx = await contract.vote(index);
        await tx.wait();
        loadProposals();
    } catch(e) { console.error(e); }
}

connectWalletBtn.addEventListener("click", connectWallet);
createProposalBtn.addEventListener("click", createProposal);
