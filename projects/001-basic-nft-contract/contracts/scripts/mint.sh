#!/bin/bash
#
# Description: Mint NFTs from collection
#
# Variables:
#    NFT_CONTRACT_ADDRESS - set the Contract Address
#    NFT_MINT_ACCOUNT     - set the address the where the NFT will be minted to
#    TOTALMINT            - Total supply of NFTs
#    STARTMINT            - The token ID to start minting from
#
# How to Run:
#    1. Copy script at the same level the "metadata" directory is in. 
#    2. Call the script mint.sh
#    3. Make the script executable: chmod 755 mint.sh
#    4. Run the script: ./mint.sh
#
# Version:
#    1.0.0 - ZA  Initial script
#

# Set the NFT Contract Address
export NFT_CONTRACT_ADDRESS=0x026c...b726

# Set Mint Account
export NFT_MINT_ACCOUNT=0x4137...2c05

# Total number of NFTs to mint minus any NFTs you have already minted
TOTALMINT=1000

# Set Counter to start from
STARTMINT=1

################################
# DO NOT CHANGE ANYTHING BELOW #
################################
#

# Loop through and mint the NFTs
while [ ${STARTMINT} -le ${TOTALMINT} ]
do 
    echo "Minting NFT token ID: #${STARTMINT}"
	npx hardhat mint --address ${NFT_MINT_ACCOUNT} --network energiMainnet > /dev/null
	((STARTMINT++))
	sleep 20
done
