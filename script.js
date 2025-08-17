// ==== CONFIGURATION ====
const contractAddress = "0x8965c62ed33d90f3e16a277Cb1b86435A0Db355A";
const contractABI = [
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
let userAddress;

// ==== CONNECT WALLET ====
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log("Wallet connected:", userAddress);
            document.getElementById("walletAddress").innerText = userAddress;
            loadLatestProposals();
        } catch (err) {
            console.error(err);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// ==== INITIALIZE PROPOSALS ====
async function initializeProposals() {
    try {
        const tx = await contract.initializeProposals();
        await tx.wait();
        alert("Proposals initialized!");
        loadLatestProposals();
    } catch (err) {
        console.error(err);
    }
}

// ==== LOAD LATEST PROPOSALS ====
async function loadLatestProposals(limit = 10) {
    try {
        const proposals = await contract.getLatestProposals(limit);
        const container = document.getElementById("proposalsContainer");
        container.innerHTML = "";
        proposals.forEach((p, index) => {
            const div = document.createElement("div");
            div.classList.add("proposal");
            div.innerHTML = `
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <p>Votes: ${p.voteCount} | Likes: ${p.likeCount} | Comments: ${p.commentCount}</p>
                <button onclick="likeProposal(${index})">Like</button>
                <button onclick="voteProposal(${index})">Vote</button>
                <button onclick="showComments(${index})">Comments</button>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error(err);
    }
}

// ==== CREATE NEW PROPOSAL ====
async function createProposal() {
    const name = document.getElementById("proposalName").value;
    const description = document.getElementById("proposalDesc").value;
    const extraData = document.getElementById("proposalExtra").value;
    const formTypeId = parseInt(document.getElementById("proposalFormType").value);

    try {
        const tx = await contract.createProposal(name, description, extraData, formTypeId);
        await tx.wait();
        alert("Proposal created!");
        loadLatestProposals();
    } catch (err) {
        console.error(err);
    }
}

// ==== LIKE PROPOSAL ====
async function likeProposal(index) {
    try {
        const tx = await contract.likeProposal(index);
        await tx.wait();
        alert("Liked!");
        loadLatestProposals();
    } catch (err) {
        console.error(err);
    }
}

// ==== VOTE PROPOSAL ====
async function voteProposal(index) {
    try {
        const tx = await contract.vote(index);
        await tx.wait();
        alert("Voted!");
        loadLatestProposals();
    } catch (err) {
        console.error(err);
    }
}

// ==== SHOW COMMENTS ====
async function showComments(index) {
    try {
        const comments = await contract.getComments(index);
        const container = document.getElementById("commentsContainer");
        container.innerHTML = `<h4>Comments for Proposal ${index}</h4>`;
        comments.forEach((c, idx) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>${c.commenter}</strong>: ${c.text} ${c.edited ? "(edited)" : ""}</p>
                <button onclick="editComment(${index}, ${idx})">Edit</button>
                <button onclick="deleteComment(${index}, ${idx})">Delete</button>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error(err);
    }
}

// ==== ADD COMMENT ====
async function commentOnProposal() {
    const index = parseInt(document.getElementById("commentProposalIndex").value);
    const text = document.getElementById("commentText").value;
    try {
        const tx = await contract.commentOnProposal(index, text);
        await tx.wait();
        alert("Comment added!");
        showComments(index);
    } catch (err) {
        console.error(err);
    }
}

// ==== EDIT COMMENT ====
async function editComment(proposalIndex, commentIndex) {
    const newText = prompt("Enter new text:");
    if (!newText) return;
    try {
        const tx = await contract.editComment(proposalIndex, commentIndex, newText);
        await tx.wait();
        alert("Comment edited!");
        showComments(proposalIndex);
    } catch (err) {
        console.error(err);
    }
}

// ==== DELETE COMMENT ====
async function deleteComment(proposalIndex, commentIndex) {
    try {
        const tx = await contract.deleteComment(proposalIndex, commentIndex);
        await tx.wait();
        alert("Comment deleted!");
        showComments(proposalIndex);
    } catch (err) {
        console.error(err);
    }
}

// ==== EVENT LISTENERS ====
document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
document.getElementById("initializeBtn").addEventListener("click", initializeProposals);
document.getElementById("createProposalBtn").addEventListener("click", createProposal);
document.getElementById("addCommentBtn").addEventListener("click", commentOnProposal);

// ==== AUTO LOAD IF WALLET CONNECTED ====
window.addEventListener('load', async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
        await connectWallet();
    }
});
