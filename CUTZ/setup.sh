#!/bin/bash
#
# Pr0t Project package installer
#
# by MastrSensei
echo "Welcome to Pr0t Initializer"
echo "Do you want to Install packages? (Y/N)"
read continue

if [ $continue == 'N' ]
then

echo "Cancelling install"

elif [ $continue == 'Y' ]
then

echo "Initializing install ..."
sudo apt install npm nodejs &&

echo "Installing npm packages"
npm init -y &&
npm install express --save &&
npm install web3 --save &&

echo "Install complete. Smells like a brand new car :)"

else

echo "Invalid input"

fi
