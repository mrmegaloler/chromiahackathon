# Chroma-chat Example Project

This repository contains rell code for the Chroma-chat Example, as well as a simple client that works with this backend.

## Usage Instruction

### Server

1. If you have yet to setup Eclipse IDE with the Rell plugin, follow [these instructions](https://rell.chromia.com/en/master/eclipse/index.html) to do so.
2. Open Eclipse IDE and choose "Open Project from File System". Select this project's root directory.
3. Right-click the `rell/config/run.xml` file in the Eclipse project explorer and choose "Run As > Rell Postchain App".
4. Once the Postchain app has started, open a browser tab and navigate to [http://localhost:7740/brid/iid_1](http://localhost:7740/brid/iid_1). Take note of the chain's RID. We'll need this to configure the client. 

### Client

1. If you don't have Node.js installed, download and install the latest [LTS version](https://nodejs.org/en/). *Note:* If you're on an M1 Mac, you may need to [run Node.js on the x86_64 architecture using Rosetta](https://stackoverflow.com/questions/65342769/install-node-on-m1-mac).
2. Open `chroma-chat-client/src/blockchain/blockchain.js`. Replace the value of `blockchainRID` on line 18 with the RID for your chain (obtained in step 4, above).
3. Open a terminal or command line at this project's root folder and install dependencies:
```
> cd chroma-chat-client
> npm i
```
4. Start the client:
```
> npm start
```

Communication with the Rell backend is handled in `chroma-chat-client/src/blockchain/`.
