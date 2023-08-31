[![N|Solid](https://i.imgur.com/0M6fLzp.png)](https://batshare.lumitylabs.com)
# Batshare
### _Be brave, Be generous_
Funding the Commons | Hackathon - 2023   
<br>"Batshare is a web3 platform that provides a more practical, accessible, and innovative way to support public goods projects, ensuring that everyone has the opportunity to contribute to and engage with initiatives they believe in."

## 📖 Quick Index
- [💡 How does it Work?](#-how-does-it-work)
- [🎥 Demo](#-demo)
- [💻 Installation](#-installation)
- [🚀 Innovation](#-innovation)
- [🔧 Technologies](#-technologies)
- [📁 Public Repository](#-public-repository)
- [📧 Contact](#-contact)
 
## 💡 How does it Work?  
Every 15 days, the creators update their donors, adding a new exclusive NFT with each update. This keeps the project eligible to receive donations. Donors receive an NFT, and creators can redeem the donated funds through a quadratic voting process held every 24 hours

## 🎥 Demo?
[![Vídeo de demonstração](linkimg.png)](linkvideo)

## 💻 Installation

**1 - Download the files**
```commandline
git clone https://github.com/lumitylabs/batshare.git
```
**2 - Smart contract setup**  
In the blockchain folder, rename 'hardhat.config.js.exemple' to 'hardhat.config.js'  
and add your wallet private key to 'SEPOLIA_PRIVATE_KEY' and add your 'INFURA_API_KEY'
  
**2.1 - Deploy**  
```commandline
npx hardhat run --network localhost scripts/deploy.js
```  
Store the addresses for both contracts  

**2.2 - Contract ABI setup**  
In the path 'blockchain\artifacts\contracts' copy the files 'BatToken.json' and 'QuadraticFunding.json'  
Paste on the folders 'server\config' and 'web\src\model'  

**2.2 - Contract Addresses setup**  
On the file 'web\src\model\ContractData.ts' replace the contract addresses for the deployed ones  
  
**3 - Server setup**  
In the server folder rename the file 'exemple.env' to '.env' and fill the fields with your firebase and infura data  
  
**3.1 - Run server**  
 ```commandline
npm install
vercel dev
```

**4 - Front end setup**  
Set your server url on 'web\src\model\repository.ts' then run
 ```commandline
npm install
npm run dev
```

## 🚀 Innovation
- The Batshare simplifies the process of donations and project creation, making it accessible and rewarding. Through the BAT currency, donations become easy, and NFTs add extra motivation for donors to participate in each update. This helps donors stay updated on projects and encourages creators to make improvements for the community.
    
- An important innovation is our approach to the quadratic function, eliminating complex rounds and allowing projects to receive donations continuously while expediting payments.
    
- We have designed an intuitive interface that allows users to create projects and contribute in seconds. Additionally, we facilitate direct communication between donors, collaborators, and creators, promoting closer and more efficient interaction.
    
- We value neutrality, security, and transparency on our platform. Projects are displayed randomly, avoiding any bias. We also use Blockchain technology to ensure security and transparency in transactions.

## 🔧 Technologies
- TypeScript
- React

## 📁 Public Repository

- [Public Repository](https://github.com/lumitylabs/batshare)
- [Live Preview](https://batshare.lumitylabs.com/)

## 📧 Contact
Questions or suggestions, please feel free to contact us :)  
| Contact | Luciano Ferreira | Rafael Souza  
| ------ | ------ |  
| Email | lucianofbn@lumitylabs.com | rafaelsouza@lumitylabs.com  
| Discord | @lucianofbn | @rafaelsouza  
