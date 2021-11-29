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
    pin install -r requirements.txt -r requirements-lib.txt
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

4. Deploy contracts using brownie
    ```bash
    brownie run deploy -I
    ```
    This will open interactive console. Once the console is running you can create new plan by typing into console:
    ```bash
    run("create_plan")
    ```
    You can also make changes to `scripts/create_plan.py` in order to create some different plan.

    Keep the console running while testing the contracts.

5. Finally you need to run the nodes with the data. The current deployment (for local testing) registers 2 nodes based on the private keys you have in `.env`. For running a new node open a new terminal (run the `source venv/bin/activate` if neede) and execute:
    ```bash
    felt-node-worker node1
    # or
    felt-node-worker node2
    ```
    **You need to open 2 terminals and run both nodes in order to coplete the training plan.** In other case one node would wait for other forever.

    This executes the `felt/node/background_worker.py`. Right now the nodes are using sample data which are fix typed in the code and you can change it based on your needs. _This will be changed in a near future._



## Installation - contracts
## Installation - felt library (nodes, builders)
## Installation - web application

## Installation
1. Setup environment.

    ```bash
    make install
    ```

2. Install the React client dependencies.

    ```bash
    cd ./webapp
    yarn install
    ```
    or 

    ```bash
    cd ./webapp
    npm install 
    ```

3. Obtain [web3.storage](https://web3.storage) token and place it into `.env` file.

    You can use the .env_example in this repo 
    as a template, just fill in the values and rename it to '.env'. 

    Here is what your .env should look like:

    ```bash
    export WEB3_STORAGE_TOKEN='ab...'
    ...
    ```



4. If you want to be able to deploy to testnets, do the following.

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
   
5. Create brownie account(s) following instructions here:
       https://eth-brownie.readthedocs.io/en/stable/account-management.html

6. Import the brownie account to MetaMask using their private key(s)



## Usage

1. Open the Brownie console. Starting the console launches a fresh [Ganache](https://www.trufflesuite.com/ganache) instance in the background.

    ```bash
    $ brownie console
    Brownie v1.9.0 - Python development framework for Ethereum

    ReactMixProject is the active project.
    Launching 'ganache-cli'...
    Brownie environment is ready.
    ```

    Alternatively, to run on Kovan, set the network flag to kovan

    ```bash
    $ brownie console --network kovan
    Brownie v1.14.6 - Python development framework for Ethereum

    ReactMixProject is the active project.
    Brownie environment is ready.
    ```

2. Run the [deployment script](scripts/deploy.py) to deploy the project's smart contracts.

    ```python
    >>> run("deploy")
    Running 'scripts.deploy.main'...
    ```
    Or steps 1. and 2. combinde:
    ```bash
    brownie run deploy -I
    ```

3. While Brownie is still running, start the React app in a different terminal.

    The first time this app is used, the node modules have to be installed in /src.
    To do this, navigate to ./client/src and run

    ```bash
    # make sure to use a different terminal, not the brownie console
    npm install
    npm audit fix
    ```

4. Connect Metamask to the local Ganache network. In the upper right corner, click the network dropdown menu. Select `Localhost 8545`, or `Kovan test network`:



5. Interact with the smart contracts using the web interface or via the Brownie console.

    ```python
    # get the newest vyper storage contract
    >>> vyper_storage = VyperStorage[-1]

    # the default sender of the transaction is the contract creator
    >>> vyper_storage.set(1337)
    ```

    Any changes to the contracts from the console should show on the website after a refresh, and vice versa.

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


## Resources

This mix provides a bare-bones implementation of [Create React App](https://create-react-app.dev/), configured to work with Brownie.

To get started with React and building a front-end for your dApps:

* [Rimble](https://rimble.consensys.design/) is an open-source library of React components and guides to help you make dApps. Along with components they provide guides and tutorials to help you get started.
* For more in-depth information, read the [Create React App documentation](https://create-react-app.dev/docs/getting-started)


To get started with Brownie:

* Check out the other [Brownie mixes](https://github.com/brownie-mix/) that can be used as a starting point for your own contracts. They also provide example code to help you get started.
* ["Getting Started with Brownie"](https://medium.com/@iamdefinitelyahuman/getting-started-with-brownie-part-1-9b2181f4cb99) is a good tutorial to help you familiarize yourself with Brownie
* For more in-depth information, read the [Brownie documentation](https://eth-brownie.readthedocs.io/en/stable/)


Any questions? Join our [Gitter](https://gitter.im/eth-brownie/community) channel to chat and share with others in the community.


