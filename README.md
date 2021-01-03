# Ethereum Frontend Boilerplate
Build decentralized applications (*dApps*) on top of the Ethereum blockchain using the latest *bleeding-edge* technologies and tools to accelerate the development process with a reliable, modern, fast, and customizable approach.

You can find a simple decentralized Crowdfunding dApp example built using this boilerplate on branch `example`.


## Table of Contents
- [What is an Ethereum dApp?](#what-is-an-ethereum-dapp)
- [What is Included?](#what-is-included)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
    - [Prerequisities](#prerequisities)
    - [Initialization](#initialization)
- [Development Rules](#development-rules)
    - [Commit](#commit)
    - [Branch](#branch)
- [License](#license)

### What is an Ethereum dApp?
*DApp* (or *dApp*) is an abbreviated form for Decentralized Application, a computer application that runs on a distributed computing system. 

In a classical software application approach, the code runs on centralized servers (e.g., AWS or NodeJS). However, in a full-decentralized process, the dApp has its backend code running on a decentralized peer-to-peer network (e.g., Ethereum Blockchain smart contracts) as well as its frontend application running on a decentralized storage system (e.g., Swarm or IPFS). The frontend calls the backend blockchain nodes directly through RPC endpoints.

<div align="center">
    <img 
        align="center" 
        src="./resources/Ethereum_dApp_architecture.png" 
        alt="An overview of an Ethereum dApp Architecture"
    />
    </div>
<p align="center"> <i>Figure 1.</i> An overview of an Ethereum dApp Architecture. </p>

This repository is focused on help you creating modern and effective clients to interact with your smart contracts (SC) business logic deployed in a local or remote (public networks) environment.

### What is Included?
The frontend is built on top of [Create React App](https://create-react-app.dev/), a tool that bootstrap a React application with some useful tools under the hood (e.g., [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/), [ESLint](https://eslint.org/), ...) removing the burden of learning and configuration. 

Your environment will have everything you need to build a modern Ethereum dApp frontend:

* The most famous Javascript library for building modern and reactive user interfaces. [[React](https://reactjs.org/)]
* Drizzle is a collection of front-end libraries that make writing dApp user interfaces easier and more predictable. The core of Drizzle is based on a Redux store that takes care of synchronizing your contract data, transaction data and more. [[Drizzle](https://www.trufflesuite.com/drizzle)]
* The world's most popular React UI framework. [[Material-UI](https://material-ui.com/)]
* The world's most popular open source form library for React and React Native. [[Formik](https://formik.org/)]
* Linters for statical analysis of your TypeScript code. [[ESLint](https://eslint.org/)]


## Folder Structure
```
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
├── src
│   ├── assets
│       ├── contracts
│           └── MyContract.json
│       ├── fonts
│       ├── icons
│   ├── constants
│       ├── environment.ts
│       ├── options.ts
│       └── theme.ts
│   ├── core
│       ├── pages
│           ├── Main
│               ├── components
│                   └── Navbar.tsx
│               └── Main.tsx
│   ├── shared
│       ├── components
│           ├── CircularLoader.tsx
│           ├── ETHAccount.tsx
│           ├── ETHAddress.tsx
│           ├── SimpleCacheCallMethod.tsx
│           ├── SimpleCacheSendTx.tsx
│           ├── SimpleSendTxForm.tsx
│           └── TransitionsModal.tsx
│       ├── utils
│           ├── drizzle.ts
│           └── metamask.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── Types.ts
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── tsconfig.json
├── package.json
├── README.md
```
The files inside each folder (e.g., SimpleCacheSendTx.tsx, theme.ts) are to be considered placeholders that must be modified with your application needs.

* **`public`**: Boilerplate folder which contains the icon and starting `index.html` file which contains the entire application components under the root div element.
* **`src`**: Contains the entire React application folders and files. The files contains respectively the bootstraping container component (`App.tsx`), the index where this component is rendered into the DOM (`index.tsx`) and, the custom types definition (`Types.ts`). The folders are listed below: 
    * **`assets`**: A set of folders that mantain static information regarding your smart contract JSON artifacts obtained from compilation (`/contracts`), the custom icons (`/icons`) and fonts (`/fonts`) for your application. 
    * **`constants`**: The constants folder contains the custom configuration files: 
        * **`environment.ts`**: Describes which networks and entry point contracts you want for the application. 
        * **`options.ts`**: Returns a JS object with the custom configuration for your Drizzle instance.
        * **`theme.ts`**: Returns a custom theme configuration using Material-UI.
    * **`core`**: The core set of the application custom components. Each folder describing a page contains the components used as containers for entire application pages (e.g., `Main.tsx`) and a list of components (`/components`) that are used inside specific pages (e.g., `NavBar`). 
    * **`shared`**: A set of reusable components (`/components`) across different pages (e.g., `CircularLoader.tsx`) and utilities functionalities for Drizzle (`drizzle.ts`) and MetaMask (`metamask.ts`).

## Getting Started

### Prerequisities
You need to have the following installed:

* [git](https://git-scm.com/downloads) >= *2.21.0*
* [node](https://nodejs.org/en/download/) >= *10.15.3*
* [npm](https://www.npmjs.com/get-npm) >= *6.14.8*

Please install [MetaMask](https://metamask.io/) extension in your favorite browser.

### Initialization
Clone the repository and install the packages:

```bash
git clone https://github.com/Innovation-Advisory-Links-Foundation/Ethereum-Frontend-Boilerplate.git
cd Ethereum-Frontend-Boilerplate
npm install
```

Configure the `src/constants/environment.ts` file:

```TypeScript
export default {
    EP_ADDRESS_DEV: "YOUR-ENTRY-POINT-SC-DEV-ADDRESS",
    EP_ADDRESS_NET: "YOUR-ENTRY-POINT-SC-NET-ADDRESS",
    WEB3_PROVIDER: new Web3(Web3.givenProvider),
    NET_NETWORK_TYPE: "YOUR-NETWORK-TYPE",
    NET_NETWORK_ID: YOUR-CHAIN-ID,
    DEV_NETWORK_TYPE: "private",
    PUBLIC_NET_MODE: false
}
```

* The `EP_ADDRESS_DEV` and `EP_ADDRESS_NET` values must contain, respectively, the addresses for local (private) and public test network development of your entry point smart contract. 
* The `WEB3_PROVIDER` is the instance of Web3 library injected by MetaMask in your browser. 
* The `NET_NETWORK_TYPE` and `NET_NETWORK_ID` are the public network type/name (e.g., ropsten, goerli, rinkeby, ...) and the correspondent chain id (e.g., ropsten chain id -> 3). 
* The `DEV_NETWORK_TYPE` and `PUBLIC_NET_MODE` are constants and must not be changed.

To start your application.

```bash
npm start
```

Run ESLint to check the syntax and style of your TypeScript code.

```bash
npm run lint
```

To interact with your application locally you need to import your Ganache accounts into MetaMask and select on MetaMask a custom network where your Ganache node is running (You can find more [here](https://docs.metamask.io/guide/getting-started.html#basic-considerations)).

To interact with your application remotely you need to import your public network account and select the network on MetaMask (nb. You will need to refill your accounts with Ether. For test network you can use faucet, like [this one](https://faucet.ropsten.be/) for Ropsten).

##  Development Rules

### Commit

See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

#### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semicolons, etc.; no production code change)
- `refactor`: (refactoring production code, e.g., renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc.; no production code change)

**References**:

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [Git Commit Msg](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)

### Branch

* The *master* branch must be used for releases only.
* There is a dev branch, used to merge all sub dev branch.
* Avoid long descriptive names for long-lived branches.
* No CamelCase.
* Use grouping tokens (words) at the beginning of your branch names (in a similar way to the `type` of commit).
* Define and use small lead tokens to differentiate branches in a meaningful way to your workflow.
* Use slashes to separate parts of your branch names.
* Remove branch after merge if it is not essential.

Examples:
    
    git branch -b docs/README
    git branch -b test/one-function
    git branch -b feat/side-bar
    git branch -b style/header

## License
This repository is released under the [MIT](https://github.com/Innovation-Advisory-Links-Foundation/Ethereum-Backend-Boilerplate/blob/master/LICENSE) License.

---
Ethereum Frontend Boilerplate © 2020+, [LINKS Foundation](https://linksfoundation.com/)