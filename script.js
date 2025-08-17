<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>ZenProposalSystem</title>
  <link rel="stylesheet" href="./style.css" />
  <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.min.js"></script>
  <script type="module" src="./script.js"></script>
</head>
<body>
  <div class="container">
    <h1>🗳️ ZenProposalSystem</h1>

    <button id="connectWallet" class="btn">Connect Wallet</button>

    <section class="card">
      <h2>Create New Proposal</h2>
      <input id="name" placeholder="Proposal Name" />
      <input id="description" placeholder="Description" />
      <input id="extraData" placeholder="Extra Data" />
      <label for="formType">Form Type:</label>
      <select id="formType"></select>
      <button id="createProposal" class="btn">Submit Proposal</button>
    </section>

    <section class="card">
      <h2>All Proposals</h2>
      <button id="loadProposals" class="btn">Load Proposals</button>
      <div id="proposalList"></div>
    </section>
  </div>
</body>
</html>
