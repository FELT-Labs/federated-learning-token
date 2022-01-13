# FELT - Federeted Learning Token
Federated learning on blockchain.

It is a set of contracts that support federated learning projects. Allowing anonymous participation of data providers and preventing malicious activities. Data providers get rewards for sharing their data and resulting models can be further sold.

This repository contains 3 main components:
1. **Smart contracts**

    Smart contracts are the main building part of this project. We are using [Brownie library](https://eth-brownie.readthedocs.io/en/stable/) for building, testing and deploying.

2. **Felt package**

    [Felt](./felt) is build as a python package which provides tools for nodes and builder. For nodes it provides code which runs server, watches for new training plans and execute them.

    For builders it provide tools for creating new plan.

3. **Web application**

    Web application located at folder [`webapp`](./webapp) is intended as main page landing page of the token.

## Quick Start
1. Install python, recommended is **3.9** or higher

2. You need to install all dependencies. I recommend using `Makefile` when possible by running:
    ```bash
    make install-node
    # once finished, activate the python environment
    source venv/bin/activate
    ```

    Or else you need to install it like this:
    ```bash
    pip install -r requirements.txt -r requirements-lib.txt
    python -m pip install -e .
    ```

3. Create `.env` file using `.env_example` it should look something like this:
    ```bash
    export PRIVATE_KEY='0xc...'
    export NODE1_PRIVATE_KEY='0xc...'
    export NODE2_PRIVATE_KEY='0xc...'
    ### API key for web3 storage
    export WEB3_STORAGE_TOKEN='ab...'
    ```
    Private keys are just standard private keys which you generated. `WEB3_STORAGE_TOKEN` needs to be obtained from [web3.storage](https://web3.storage/).
    
5. Install [ganache-cli](https://www.npmjs.com/package/ganache-cli) which is needed for local development.
    ```bash
    npm install -g ganache-cli
    ```
    or
    ```bash
    yarn add global ganache-cli
    ```

6. Deploy contracts using brownie
    ```bash
    brownie run deploy -I
    ```
    This will start a fresh [Ganache](https://www.trufflesuite.com/ganache) instance in the background and open interactive console. Once the console is running you can create new plan by typing into console:
    ```bash
    run("create_plan")
    ```
    You can also make changes to `scripts/create_plan.py` in order to create some different plan.

    Keep the console running while testing the contracts.

7. Finally you need to run the nodes with the data. The current deployment (for local testing) registers 2 nodes based on the private keys you have in `.env`. For running a new node open a new terminal (run the `source venv/bin/activate` if neede) and execute:
    ```bash
    felt-node-worker node1
    # or
    felt-node-worker node2
    ```
    **You need to open 2 terminals and run both nodes in order to coplete the training plan.** In other case one node would wait for other forever.

    This executes the `felt/node/background_worker.py`. Right now the nodes are using sample data which are fix typed in the code and you can change it based on your needs. _This will be changed in a near future._


8. If you want to be able to deploy to testnets, do the following.

    Set your WEB3_INFURA_PROJECT_ID, and PRIVATE_KEY environment variables.

    You can get a WEB3_INFURA_PROJECT_ID by getting a free trial of Infura. At the moment, it does need to be infura with brownie. If you get lost, follow the instructions at https://ethereumico.io/knowledge-base/infura-api-key-guide/. You can find your PRIVATE_KEY from your ethereum wallet like metamask.

    You'll also need testnet ETH. You can get ETH into your wallet by using the faucet for the appropriate
    testnet. For Kovan, a faucet is available at https://linkfaucet.protofire.io/kovan.

    You can add your environment variables to a .env file. You can use the .env_example in this repo 
    as a template, just fill in the values and rename it to '.env'. 

    Here is what your .env should look like:

    ```bash
    export WEB3_INFURA_PROJECT_ID=<PROJECT_ID>
    export PRIVATE_KEY=<PRIVATE_KEY>
    ```


## Installation - contracts
## Installation - felt library (nodes, builders)
## Installation and run - web application (dapp)

1. Install the React client dependencies.

    ```bash
    cd ./webapp
    yarn install
    ```
    or 

    ```bash
    cd ./webapp
    npm install 
    ```
2. In case you want to test the dApp with local blockchain (ganache-cli), you can run local instance as:
    ```bash
    brownie run deploy -I
    # If needed install the requirements first:
    pip install -r requirements.txt -r requirements-lib.txt
    python -m pip install -e .
    ```

3. The application requires access to contract ABI and deployment address. Make sure that `webapp/src/artifacts` directory has same content as `build` directory. This should be handled by `deploy.py` script, but in some cases these directories can differ and you should copy content from `build` to `webapp/src/artifacts`.


### Known Issues
When running local blockchain (ganache-cli) MetaMask sometimes gives transaction error:

    the tx doesn't have the correct nonce. account has nonce of: X tx has nonce of: Y

This can be solved by opening `MetaMask > Settings > Advanced > Reset Account`. Or sometimes just switching to different blockchain and then back to localhost also helps.

## Ending a Session

When you close the Brownie console, the Ganache instance also terminates and the deployment artifacts are deleted.

To retain your deployment artifacts (and their functionality) you can launch Ganache yourself prior to launching Brownie. Brownie automatically attaches to the ganache instance where you can deploy the contracts. After closing Brownie, the chain and deployment artifacts will persist.

## Further Possibilities

### Testing

To run the test suite:

```bash
brownie test
```

### Deploying to a Live Network

To deploy your contracts to the mainnet or one of the test nets, first modify [`scripts/deploy.py`](`scripts/deploy.py`) to [use a funded account](https://eth-brownie.readthedocs.io/en/stable/account-management.html).

Then:

```bash
brownie run deploy --network kovan
```

Replace `kovan` with the name of the network you wish you use. You may also wish to adjust Brownie's [network settings](https://eth-brownie.readthedocs.io/en/stable/network-management.html).

For contracts deployed on a live network, the deployment information is stored permanently unless you:

* Delete or rename the contract file or
* Manually remove the `client/src/artifacts/` directory




