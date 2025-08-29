// script.js (module)
import { abi } from './abi.js';

const contractAddress = "0x36ee718054f40135BE991A6bf7695bda19FFe9E0";

const connectButton = document.getElementById('connectButton');
const statusSpan = document.getElementById('status');
const proposalForm = document.getElementById('proposalForm');
const proposalList = document.getElementById('proposalList');

let provider = null;
let signer = null;
let contract = null;

const DESIRED_CHAIN_ID_HEX = '0x20D8'; // 8408 decimal

function setStatus(txt) {
  statusSpan.textContent = txt || '';
}

// Utility: request switch/add network to MetaMask
async function ensureZenChainNetwork() {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
  if (currentChainId === DESIRED_CHAIN_ID_HEX) return true;

  // try to switch
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: DESIRED_CHAIN_ID_HEX }],
    });
    return true;
  } catch (switchError) {
    if (switchError.code === 4902 || /Unrecognized chain/i.test(switchError.message || "")) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: DESIRED_CHAIN_ID_HEX,
            chainName: 'ZenChain Testnet',
            nativeCurrency: { name: 'ZenChain Token', symbol: 'ZTC', decimals: 18 },
            rpcUrls: ['https://zenchain-testnet.api.onfinality.io/public'],
            blockExplorerUrls: []
          }]
        });
        return true;
      } catch (addError) {
        throw new Error("Failed to add ZenChain Testnet: " + (addError.message || addError));
      }
    } else {
      throw switchError;
    }
  }
}

async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask.");
      return;
    }

    setStatus("Requesting wallet connection...");
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    await ensureZenChainNetwork();

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    const addr = await signer.getAddress();
    setStatus(`Connected: ${addr}`);
    connectButton.disabled = true;
    await loadProposals();
  } catch (err) {
    console.error("connectWallet error:", err);
    alert("Connection failed: " + (err.message || err));
    setStatus("Not connected");
  }
}

connectButton.addEventListener('click', connectWallet);

// create proposal
proposalForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!contract) return alert("Connect wallet first.");

  const name = document.getElementById('proposalName').value.trim();
  const description = document.getElementById('proposalDescription').value.trim();
  const extraData = document.getElementById('extraData').value.trim();
  const formType = parseInt(document.getElementById('formType').value);

  if (!name || !description) return alert("Name and description are required.");

  try {
    setStatus("Sending transaction...");
    const tx = await contract.createProposal(name, description, extraData, formType);
    await tx.wait();
    setStatus("Proposal created. Refreshing...");
    proposalForm.reset();
    await loadProposals();
    setStatus("Connected");
  } catch (err) {
    console.error("createProposal error:", err);
    alert("Failed to create proposal: " + (err.reason || err.message || err));
    setStatus("Connected");
  }
});

async function loadProposals() {
  if (!contract) { proposalList.innerHTML = '<p>Connect wallet first.</p>'; return; }
  proposalList.innerHTML = '<p>Loading proposals...</p>';

  try {
    const countBN = await contract.getProposalCount();
    const count = countBN.toNumber ? countBN.toNumber() : Number(countBN);
    proposalList.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const p = await contract.getProposalDetails(i);
      const [name, description, formType, extraData, voteCount, timestamp, creator, likeCount, commentCount] = p;

      const card = document.createElement('div');
      card.className = 'proposal-card';

      const title = document.createElement('h3'); title.textContent = name;
      const desc = document.createElement('p'); desc.textContent = description;
      const meta = document.createElement('p');
      meta.textContent = `Type: ${formType} — Votes: ${voteCount.toString()} — Likes: ${likeCount.toString()} — Comments: ${commentCount.toString()}`;

      const creatorP = document.createElement('p'); creatorP.textContent = `Creator: ${creator}`;

      const btnVote = document.createElement('button'); btnVote.textContent = 'Vote';
      const btnLike = document.createElement('button'); btnLike.textContent = 'Like';
      const btnComments = document.createElement('button'); btnComments.textContent = 'Comments';

      btnVote.addEventListener('click', async () => {
        try {
          setStatus('Sending vote tx...');
          const tx = await contract.vote(i);
          await tx.wait();
          setStatus('Vote confirmed');
          await loadProposals();
        } catch (err) {
          console.error('vote error', err);
          alert('Vote failed: ' + (err.reason || err.message || err));
          setStatus('Connected');
        }
      });

      btnLike.addEventListener('click', async () => {
        try {
          setStatus('Sending like tx...');
          const tx = await contract.likeProposal(i);
          await tx.wait();
          setStatus('Like confirmed');
          await loadProposals();
        } catch (err) {
          console.error('like error', err);
          alert('Like failed: ' + (err.reason || err.message || err));
          setStatus('Connected');
        }
      });

      btnComments.addEventListener('click', async () => {
        let commentsArea = card.querySelector('.comments-area');
        if (!commentsArea) {
          commentsArea = document.createElement('div');
          commentsArea.className = 'comments-area';
          const input = document.createElement('input'); input.placeholder = 'Write a comment';
          const sendBtn = document.createElement('button'); sendBtn.textContent = 'Submit';
          const list = document.createElement('div'); list.className = 'comments-list';
          commentsArea.append(input, sendBtn, list);
          card.appendChild(commentsArea);

          try {
            const comments = await contract.getComments(i);
            comments.forEach((c) => {
              if (!c.deleted) {
                const item = document.createElement('div');
                item.textContent = `${c.commenter}: ${c.text}${c.edited ? ' (edited)' : ''}`;
                list.appendChild(item);
              }
            });
          } catch (err) {
            console.error('getComments error', err);
          }

          sendBtn.addEventListener('click', async () => {
            const text = input.value.trim();
            if (!text) return alert('Comment cannot be empty');
            try {
              setStatus('Sending comment tx...');
              const tx = await contract.commentOnProposal(i, text);
              await tx.wait();
              setStatus('Comment confirmed');
              input.value = '';
              list.innerHTML = '';
              const comments2 = await contract.getComments(i);
              comments2.forEach((c) => {
                if (!c.deleted) {
                  const item = document.createElement('div');
                  item.textContent = `${c.commenter}: ${c.text}${c.edited ? ' (edited)' : ''}`;
                  list.appendChild(item);
                }
              });
              await loadProposals();
            } catch (err) {
              console.error('comment error', err);
              alert('Failed to submit comment: ' + (err.reason || err.message || err));
              setStatus('Connected');
            }
          });
        } else {
          commentsArea.style.display = commentsArea.style.display === 'none' ? 'block' : 'none';
        }
      });

      card.append(title, desc, meta, creatorP, btnVote, btnLike, btnComments);
      proposalList.appendChild(card);
    }

    if (count === 0) {
      proposalList.innerHTML = '<p>No proposals yet.</p>';
    }
  } catch (err) {
    console.error('loadProposals error', err);
    proposalList.innerHTML = '<p>Failed to load proposals. See console.</p>';
  }
}

setInterval(() => { if (contract) loadProposals(); }, 30000);
