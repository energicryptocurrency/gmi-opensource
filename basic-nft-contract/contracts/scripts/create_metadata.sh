#!/bin/bash
#
# Description: Script to duplicate filename 1.
#
# Variables:
#    FILENAME     - Starting filename
#    TOTAL_SUPPLY - Total number in collection
#
# How to Run:
#    1. Copy script at the same level the "metadata" directory is in. 
#    2. Call the script create_metadata.sh
#    3. Make the script executable: chmod 755 create_metadata.sh
#    4. Run the script: ./create_metadata.sh
#
# Version:
#    1.0.0 - ZA  Initial script
#


# Set next filename to start from"
FILENAME=1

# Set number of metadata files to create
TOTAL_SUPPLY=1000

echo "Copy ${FILENAME} to ${TOTAL_SUPPLY}"
read -p "Press [Enter] key to start creating the files."

# Check if metadata directory exists
if [ -d metadata ]
then
	cd metadata
else
	echo "metadata directory does not exist..."
	exit 0
if

# Loop through and creat 1000
while [ ${FILENAME} -le ${TOTAL_SUPPLY} ]
do
    cp 1 $FILENAME
	echo "Created: $FILENAME"
    ((FILENAME++))

done

# Changed to original directory
cd -

echo "The metadata files have been created. Check for accuracy before downloading."
