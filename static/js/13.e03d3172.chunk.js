(this["webpackJsonpFELT-webapp"]=this["webpackJsonpFELT-webapp"]||[]).push([[13],{125:function(e){e.exports=JSON.parse('{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"allSourcePaths":{"1":"/home/breta/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.3.2/contracts/token/ERC20/IERC20.sol","2":"/home/breta/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.3.2/contracts/token/ERC20/extensions/IERC20Metadata.sol"},"ast":{"absolutePath":"/home/breta/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.3.2/contracts/token/ERC20/extensions/IERC20Metadata.sol","exportedSymbols":{"IERC20":[1873],"IERC20Metadata":[1898]},"id":1899,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":1875,"literals":["solidity","^","0.8",".0"],"nodeType":"PragmaDirective","src":"33:23:2"},{"absolutePath":"/home/breta/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.3.2/contracts/token/ERC20/IERC20.sol","file":"../IERC20.sol","id":1876,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":1899,"sourceUnit":1874,"src":"58:23:2","symbolAliases":[],"unitAlias":""},{"abstract":false,"baseContracts":[{"baseName":{"id":1878,"name":"IERC20","nodeType":"IdentifierPath","referencedDeclaration":1873,"src":"228:6:2"},"id":1879,"nodeType":"InheritanceSpecifier","src":"228:6:2"}],"canonicalName":"IERC20Metadata","contractDependencies":[],"contractKind":"interface","documentation":{"id":1877,"nodeType":"StructuredDocumentation","src":"83:116:2","text":" @dev Interface for the optional metadata functions from the ERC20 standard.\\n _Available since v4.1._"},"fullyImplemented":false,"id":1898,"linearizedBaseContracts":[1898,1873],"name":"IERC20Metadata","nameLocation":"210:14:2","nodeType":"ContractDefinition","nodes":[{"documentation":{"id":1880,"nodeType":"StructuredDocumentation","src":"241:54:2","text":" @dev Returns the name of the token."},"functionSelector":"06fdde03","id":1885,"implemented":false,"kind":"function","modifiers":[],"name":"name","nameLocation":"309:4:2","nodeType":"FunctionDefinition","parameters":{"id":1881,"nodeType":"ParameterList","parameters":[],"src":"313:2:2"},"returnParameters":{"id":1884,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1883,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1885,"src":"339:13:2","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":1882,"name":"string","nodeType":"ElementaryTypeName","src":"339:6:2","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"visibility":"internal"}],"src":"338:15:2"},"scope":1898,"src":"300:54:2","stateMutability":"view","virtual":false,"visibility":"external"},{"documentation":{"id":1886,"nodeType":"StructuredDocumentation","src":"360:56:2","text":" @dev Returns the symbol of the token."},"functionSelector":"95d89b41","id":1891,"implemented":false,"kind":"function","modifiers":[],"name":"symbol","nameLocation":"430:6:2","nodeType":"FunctionDefinition","parameters":{"id":1887,"nodeType":"ParameterList","parameters":[],"src":"436:2:2"},"returnParameters":{"id":1890,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1889,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1891,"src":"462:13:2","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":1888,"name":"string","nodeType":"ElementaryTypeName","src":"462:6:2","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"visibility":"internal"}],"src":"461:15:2"},"scope":1898,"src":"421:56:2","stateMutability":"view","virtual":false,"visibility":"external"},{"documentation":{"id":1892,"nodeType":"StructuredDocumentation","src":"483:65:2","text":" @dev Returns the decimals places of the token."},"functionSelector":"313ce567","id":1897,"implemented":false,"kind":"function","modifiers":[],"name":"decimals","nameLocation":"562:8:2","nodeType":"FunctionDefinition","parameters":{"id":1893,"nodeType":"ParameterList","parameters":[],"src":"570:2:2"},"returnParameters":{"id":1896,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1895,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1897,"src":"596:5:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"},"typeName":{"id":1894,"name":"uint8","nodeType":"ElementaryTypeName","src":"596:5:2","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"visibility":"internal"}],"src":"595:7:2"},"scope":1898,"src":"553:50:2","stateMutability":"view","virtual":false,"visibility":"external"}],"scope":1899,"src":"200:405:2","usedErrors":[]}],"src":"33:573:2"},"bytecode":"","bytecodeSha1":"da39a3ee5e6b4b0d3255bfef95601890afd80709","compiler":{"evm_version":"istanbul","optimizer":{"enabled":true,"runs":200},"version":"0.8.10+commit.fc410830"},"contractName":"IERC20Metadata","coverageMap":{"branches":{},"statements":{}},"dependencies":["OpenZeppelin/openzeppelin-contracts@4.3.2/IERC20"],"deployedBytecode":"","deployedSourceMap":"","language":"Solidity","natspec":{"details":"Interface for the optional metadata functions from the ERC20 standard. _Available since v4.1._","kind":"dev","methods":{"allowance(address,address)":{"details":"Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called."},"approve(address,uint256)":{"details":"Sets `amount` as the allowance of `spender` over the caller\'s tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender\'s allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event."},"balanceOf(address)":{"details":"Returns the amount of tokens owned by `account`."},"decimals()":{"details":"Returns the decimals places of the token."},"name()":{"details":"Returns the name of the token."},"symbol()":{"details":"Returns the symbol of the token."},"totalSupply()":{"details":"Returns the amount of tokens in existence."},"transfer(address,uint256)":{"details":"Moves `amount` tokens from the caller\'s account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event."},"transferFrom(address,address,uint256)":{"details":"Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller\'s allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event."}},"version":1},"offset":[200,605],"opcodes":"","pcMap":{},"sha1":"b161b91d2d390ac907747aaa70acf5806a4cde5c","source":"// SPDX-License-Identifier: MIT\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"../IERC20.sol\\";\\n\\n/**\\n * @dev Interface for the optional metadata functions from the ERC20 standard.\\n *\\n * _Available since v4.1._\\n */\\ninterface IERC20Metadata is IERC20 {\\n    /**\\n     * @dev Returns the name of the token.\\n     */\\n    function name() external view returns (string memory);\\n\\n    /**\\n     * @dev Returns the symbol of the token.\\n     */\\n    function symbol() external view returns (string memory);\\n\\n    /**\\n     * @dev Returns the decimals places of the token.\\n     */\\n    function decimals() external view returns (uint8);\\n}\\n","sourceMap":"","sourcePath":"/home/breta/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.3.2/contracts/token/ERC20/extensions/IERC20Metadata.sol","type":"interface"}')}}]);
//# sourceMappingURL=13.e03d3172.chunk.js.map