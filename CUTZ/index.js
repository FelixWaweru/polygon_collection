window.onload = function () {
	connect(),
	gallery(),
	totalSupply(),
	saleState()
};

// CUTZ Token
// Alterative: var CUTZAddress = "0xFf84cf6d20a6Cf84983b2E79954Bdb264F44d720", "0x933a963224D2c7248747c3ab8571Bc1a36f83D73";
var CUTZAddress = "0xf4575aEC8059AAbce64855d22e05CDC409c343BF";
var CUTZABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "maxNftSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numberOfTokens",
				"type": "uint256"
			}
		],
		"name": "mintCutz",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "reserve",
				"type": "uint256[]"
			}
		],
		"name": "reserveCharachters",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_base",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "setBurnState",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_limit",
				"type": "uint256"
			}
		],
		"name": "setMaxCharachterPerWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_buylimit",
				"type": "uint256"
			}
		],
		"name": "setMaxCharacterPurchase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "setSaleState",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "burnIsActive",
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
		"name": "charachterPrice",
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
		"inputs": [],
		"name": "creatorAddress",
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
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
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
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
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
		"name": "MAX_CHARACHTERS",
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
		"inputs": [],
		"name": "maxCharacterPerWallet",
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
		"inputs": [],
		"name": "maxCharacterPurchase",
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
		"inputs": [],
		"name": "mintedSupply",
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
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
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
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
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
		"inputs": [],
		"name": "reservedSupply",
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
		"inputs": [],
		"name": "saleIsActive",
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
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
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
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

function gallery(){
	var data = [
		{
			"id": "0",
			"image": "http://127.0.0.1:5500/CUTZ/assets/images/29.png",
		},
		{
			"id": "1",
			"image": "http://127.0.0.1:5500/CUTZ/assets/images/29.png",
		},
		{
			"id": "2",
			"image": "http://127.0.0.1:5500/CUTZ/assets/images/29.png",
		},
		{
			"id": "3",
			"image": "http://127.0.0.1:5500/CUTZ/assets/images/29.png",
		},
		{
			"id": "4",
			"image": "http://127.0.0.1:5500/CUTZ/assets/images/29.png",
		},
		{
			"id": "5",
			"image": "http://127.0.0.1:5500/CUTZ/assets/images/29.png",
		},
		{
			"id": "6",
			"image": "http://127.0.0.1:5500/CUTZ/assets/images/29.png",
		},
		{
			"id": "7",
			"image": "http://127.0.0.1:5500/CUTZ/assets/images/29.png",
		},
	]

	var htmlText = data.map(function (o) {
		return `
	 <div class="col-sm-6 col-md-3 col-lg-3">
        <div class="alt-features-item">
            <div>
            	<img id = "tokenImage" class="nft-thumbnail" src="${o.image}"/>
            </div>
            <h3 class="alt-features-title font-alt white_tint" style="margin-bottom: 0px;">CUTZ</h3>
            <h3 id = "tokenNumber" class="alt-features-title font-alt black_tint">No. ${o.id}</h3>
        </div>
    </div>
  `;
	});

	$('#tokenViewer').append(htmlText);
}

// Token functions
async function connect() {
	// Connect to wallet
	//Get Account info
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const account = accounts[0];
	console.log(accounts[0]);
	document.getElementById('connectButton').innerHTML = accounts[0].substring(0, 6) + "..";
	document.getElementById('minterWallet2').innerHTML = "Your Wallet: " + accounts[0].substring(0, 16) + "...";
}
// Web3 wallet sign in end



// Function used to sign the raffle purchase confirmation
async function signature() {
	try {
		// const msg = 'Sample message to hash for signature'
		// const msgHash = keccak256(msg)
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		const from = accounts[0];
		const msg = 'Purchase Raffle tickets';
		// const msg = `0x${Buffer.from(plainMessage, 'utf8').toString('hex')}`;
		const sign = await ethereum.request({
			method: 'personal_sign',
			params: [msg, from, 'Example password'],
		});
	} catch (err) {
		console.error(err);
	}
	document.getElementById('purchase_raffle_tickets').disabled = false;			
}


// Function used to get total supply
async function totalSupply(){
	const web3 = new Web3(window.web3.currentProvider);

	var CUTZContract = new web3.eth.Contract(CUTZABI, CUTZAddress);

	var totalSupplyCUTZ = await CUTZContract.methods.totalSupply().call().then(function (response) {
		console.log(response[0] + " / 5000");
		// document.getElementById('totalSupplyValue').innerHTML = response[0] + " / 5000";
		// document.getElementById('totalSupplyValue2').innerHTML = response[0] + " / 5000";
	});
}

// Function used to get sale state
async function saleState(){
	const web3 = new Web3(window.web3.currentProvider);

	var CUTZContract = new web3.eth.Contract(CUTZABI, CUTZAddress);

	var saleStateCUTZ = await CUTZContract.methods.saleIsActive().call().then(function (response) {
		if(response.toString() == "false")
		{
			document.getElementById('mintResponse').innerHTML = "Sale is not active ❌";
			//document.getElementById('mintButton').disabled = true;
			document.getElementById('mintResponse2').innerHTML = "Sale is not active ❌";
			document.getElementById('mintButton2').disabled = true;
		}
		else if(response.toString() == "true")
		{
			document.getElementById('mintResponse').innerHTML = "Sale is active 🎉";
			document.getElementById('mintButton').disabled = false;
			document.getElementById('mintResponse2').innerHTML = "Sale is active 🎉";
			document.getElementById('mintButton2').disabled = false;
		}
		
	});
}


// Function used to mint protagonists
async function minter(){
	// var numberOfTokens = document.getElementById('numberOfTokensSelect').value;

	// var priceOfTokens = document.getElementById('priceOfTokensSelect').value;

	// var amount = (numberOfTokens*priceOfTokens).toString();

	var numberOfTokens = document.getElementsByName('mint-quantity')[0].value;

	var amount = document.getElementsByName('mint-price')[0].value;

	const web3 = new Web3(window.web3.currentProvider);
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

	web3.eth.defaultAccount = accounts[0];

	var slug = "{{object.slug}}";

	// Variable formating
	amount = web3.utils.toWei(amount, 'ether');
	console.log("Amount: " + amount);
	console.log("Tokens: " + numberOfTokens);


	// To bytes32
	slug = web3.utils.toHex(slug);

	// console.log(parseFloat(requiredContribution));
	// console.log(deadline);
	// console.log(slug);

	var CUTZContract = new web3.eth.Contract(CUTZABI, CUTZAddress);

	var gas = await web3.eth.getGasPrice();

	var gasLimit = 65862 * numberOfTokens;
	console.log("Gas: " + gasLimit);

	var mintCUTZ = await CUTZContract.methods.mintCutz(numberOfTokens).send({
				to: CUTZAddress,
			    from: accounts[0],
			    gasPrice: gas,
			    gasLimit: gasLimit,
			    value: amount
			});
}