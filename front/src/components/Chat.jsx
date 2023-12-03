// import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
// import { ethers } from "ethers";

// export const Chat = () => {

//     const sendMessage = async () => {
//         // Creating a random signer from a wallet, ideally this is the wallet you will connect
//         const signer = ethers.Wallet.createRandom();

//         // Initialize wallet user
//         // 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
//         const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

//         // This will be the wallet address of the recipient
//         const bobWalletAddress = "0x16c5594E7D47206AFDd1e303B9741CB1d36065d6";

//         // Send a message to Bob
//         const aliceMessagesBob = await userAlice.chat.send(bobWalletAddress, {
//             content: "Gm gm! It's a me... Mario",
//         });

//         // Initialize Stream
//         const stream = await userAlice.initStream([CONSTANTS.STREAM.CHAT]);

//         // Configure stream listen events and what to do
//         stream.on(CONSTANTS.STREAM.CHAT, (message) => {
//             console.log(message);
//         });

//         // Connect Stream
//         stream.connect();
//     }
//     return (
//         <button onClick={sendMessage}></button>
//     )
// }