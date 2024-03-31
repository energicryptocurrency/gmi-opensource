# Quick Start Guide - List NFTs on Energi

This is an guide for novice as well as expert users who are familiar with creating smart contracts and listing their NFTs on a Energi blockchain. The tutorials are shown on testnet. They can easily be used to publish to Energi Mainnet.

## 1. Set up Environment

Install `npm` and then run the following to install all the packages:

```
npm install

```

## 2. Create Secrets

Enter `ACCOUNT_PRIVATE_KEY` as the key. 

Go to MetaMask and get the private key you would like to use for your testing. Paste the private key in the "value" box. 

Click "Save".


## 3. Request Test NRG

Go to [https://faucet.energi.network](https://faucet.energi.network) and paste your wallet address (**NOT THE PRIVATE KEY!**). Use the same address you got the private key for in step 2 above.


## 4. Smart Contract 

### 4.1. Change Number of NFTs and Collection Name

Click on `NFT.sol` file in the `contracts` folder.

- Lines 15 & 16: Change the number of NFT and mint price
- Line 23: Be creative and give your collection a name.

Save the contract.

### 4.2. Compile Code

Go to "Tools" and click on "Shell". It will open a new Linux Shell window. **Do not use the existing Shell tab**.

On the Shell windows type:

```bash
npx hardhat compile
```

```text title="Response"
Downloading compiler 0.8.18
Compiled 16 Solidity files successfully
```


## 5. Deploy Smart Contract

On the Replit "Shell" window, run the following command:

```bash
npx hardhat deploy --network energiTestnet
```

```text title="Response"
Contract deployed to address: 0x7311..537F on energiTestnet
Transaction hash: 0xa8f6..c5ff
```

Go to [Energi Block Explorer](https://explorer.test.energi.network) and lookup the new contract address. Make sure it is commited to the blockchain.

```text title="Hint"
Search and replace all the contract address in this document so you can copy and paste the commands in this document. Double click on the contract address in the document and then press `Ctrl+s` (on Windows) or `Option+s` (On Mac) to access the search/replace box. Pick "Replace All".
```


## 6. Verify Contract

Check your account on Block Explorer. Wait until the contract in step 4 is committed on the Energi chain.

Once the contract is committed, run the following command to verify the contract:

```bash
npx hardhat verify 0x7311..537F --network energiTestnet
```

```text title="Response"
Nothing to compile
Successfully submitted source code for contract
contracts/NFT.sol:NFT at 0x7311..537F
for verification on the block explorer. Waiting for verification result...

Successfully verified contract NFT on Etherscan.
https://explorer.test.energi.network/address/0x7311..537F#code
```

Click on the URL to validate the smart contract was verified.


## 7. Upload images to IPFS

On your computer, save all your NFTs into a folder called `images`.

Log into [Filebase](https://filebase.com/) and "Create Bucket".

Click on the bucket to open it.

On the top right, pick "Upload" and then "Folder". Select the `images` folder.

Once all the images are uploaded, it will give you a CID (Content IDentifier). Copy the CID of the `images` folder.

In this document we are using this image CID: `QmdF..gtmv`


## 8. Add Metadata about the NFTs

### 8.1. Update JSON file for Metadata

In `metadata/`, create the number of images you have in your collection. In this example, we have 10 NFTs. Create 10 files without any extension: `1`, `2`, `3`, ..., `10`. Update the `image` URL with the image CID from step 7. The URL format is `ipfs://<CID of Image from section 7.2 above>/<filename of image>`.

Download all the metadata files to a folder called `metadata` on your local computer.


### 8.2. Upload `metadata` to IPFS

Go back to the same bucket on `Filebase` and upload the `metadata` folder. It will generate a CID (in this example, the metadata CID is `QmeD..gV4D`).


### 8.3. Set Base Token URI to Contract

Set your `NFT_CONTRACT_ADDRESS` and then run the `set-base-token-uri` command.

```text title="Command Syntax"
# Set a variable called NFT_CONTRACT_ADDRESS
export NFT_CONTRACT_ADDRESS=<NFT Contract Address from Step 5>
# Set base token uri
npx hardhat set-base-token-uri --base-url "ipfs://<CID of metadata from step 8.2>
```

```bash
export NFT_CONTRACT_ADDRESS=0x7311..537F
npx hardhat set-base-token-uri --base-url "ipfs://QmeD..gV4D/" --network energiTestnet
```

```text title="Response"
Transaction Hash on energiTestnet: 0xf4e4..745b
```

```text title="Note"
The base-url can be updated in the future. It is important you not change the image link.
```


## 9. Mint NFTs

### 9.1. Mint a Single NFT

On the Replit Shell, run the following command. Use the same address as before or a new address. You must have enough NRG token on the account to pay for minting cost and gas fees. 

```bash
# Set the variable with your contract address
export NFT_CONTRACT_ADDRESS=0x7311..537F
# Mint to a wallet address with NRG to pay the mint cost and gas fee
npx hardhat mint --address 0xd66E..DC3E --network energiTestnet
```

```text title="Response"
Transaction Hashon energiTestnet: 0x2d30..f4da
```


### 9.2. Mint Multiple NFTs (Optional)

You can mint multiple NFTs at one time. Run the following command to mint to the address of your choosing. Make sure you have sufficient NRG to may for all the minting and gas fees on the address

```bash
# Set the NFT Contract Address
export NFT_CONTRACT_ADDRESS=0x7311..537F

# Set Mint Account
export NFT_MINT_ACCOUNT=0xd66E..DC3E

# Total number of NFTs to mint minus any NFTs you have already minted
TOTALMINT=9

################################
# DO NOT CHANGE ANYTHING BELOW #
################################
#
# Set Counter
COUNT=1

# Loop through and mint the NFTs
while [ ${COUNT} -le ${TOTALMINT} ]
do 
	npx hardhat mint --address ${NFT_MINT_ACCOUNT}
	((COUNT++))
	sleep 5
done
```

```text title="Response"
Transaction Hash energiTestnet: 0xe6e2..4c5d
Transaction Hash energiTestnet: 0x0445..ce9d
Transaction Hash energiTestnet: 0xf880..5600
Transaction Hash energiTestnet: 0x740e..ae170
Transaction Hash energiTestnet: 0x81d6..e5b4
Transaction Hash energiTestnet: 0x1939..2fb3
Transaction Hash energiTestnet: 0x6596..c231
Transaction Hash energiTestnet: 0x2211..23fe
Transaction Hash energiTestnet: 0x863f..e26f
```


### 9.3. Verify TokenURL

Go to the "Read Contract" tab on your contract details page:

```text title="Read Contract (Replace with your contract address)"
https://explorer.test.energi.network/address/0x7311..537F/read-contract
```

Scroll down to `tokenURL` query "1". If the metadata was in proper formatted and accepted, it will return the URL to the metadata.

```text title="Reponse"
[ tokenURI method Response ]

[

(string) : ipfs://QmeD..gV4D/1

]
```


## 10. Check and Withdraw Funds - WIP

### 10.1. Check Funds

_WIP_

### 10.2. Withdraw Funds
Go to the smart contract and click "Write Contract".

Connect to your web3 wallet and enter the amount you would like to withdraw from the contract.
