(this["webpackJsonpFELT-webapp"]=this["webpackJsonpFELT-webapp"]||[]).push([[15],{130:function(e){e.exports=JSON.parse('{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"allSourcePaths":{"1":"/Users/filip/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.3.2/contracts/token/ERC20/IERC20.sol"},"ast":{"absolutePath":"/Users/filip/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.3.2/contracts/token/ERC20/IERC20.sol","exportedSymbols":{"IERC20":[1604]},"id":1605,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":1528,"literals":["solidity","^","0.8",".0"],"nodeType":"PragmaDirective","src":"33:23:1"},{"abstract":false,"baseContracts":[],"canonicalName":"IERC20","contractDependencies":[],"contractKind":"interface","documentation":{"id":1529,"nodeType":"StructuredDocumentation","src":"58:70:1","text":" @dev Interface of the ERC20 standard as defined in the EIP."},"fullyImplemented":false,"id":1604,"linearizedBaseContracts":[1604],"name":"IERC20","nameLocation":"139:6:1","nodeType":"ContractDefinition","nodes":[{"documentation":{"id":1530,"nodeType":"StructuredDocumentation","src":"152:66:1","text":" @dev Returns the amount of tokens in existence."},"functionSelector":"18160ddd","id":1535,"implemented":false,"kind":"function","modifiers":[],"name":"totalSupply","nameLocation":"232:11:1","nodeType":"FunctionDefinition","parameters":{"id":1531,"nodeType":"ParameterList","parameters":[],"src":"243:2:1"},"returnParameters":{"id":1534,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1533,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1535,"src":"269:7:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1532,"name":"uint256","nodeType":"ElementaryTypeName","src":"269:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"268:9:1"},"scope":1604,"src":"223:55:1","stateMutability":"view","virtual":false,"visibility":"external"},{"documentation":{"id":1536,"nodeType":"StructuredDocumentation","src":"284:72:1","text":" @dev Returns the amount of tokens owned by `account`."},"functionSelector":"70a08231","id":1543,"implemented":false,"kind":"function","modifiers":[],"name":"balanceOf","nameLocation":"370:9:1","nodeType":"FunctionDefinition","parameters":{"id":1539,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1538,"mutability":"mutable","name":"account","nameLocation":"388:7:1","nodeType":"VariableDeclaration","scope":1543,"src":"380:15:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1537,"name":"address","nodeType":"ElementaryTypeName","src":"380:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"379:17:1"},"returnParameters":{"id":1542,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1541,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1543,"src":"420:7:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1540,"name":"uint256","nodeType":"ElementaryTypeName","src":"420:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"419:9:1"},"scope":1604,"src":"361:68:1","stateMutability":"view","virtual":false,"visibility":"external"},{"documentation":{"id":1544,"nodeType":"StructuredDocumentation","src":"435:209:1","text":" @dev Moves `amount` tokens from the caller\'s account to `recipient`.\\n Returns a boolean value indicating whether the operation succeeded.\\n Emits a {Transfer} event."},"functionSelector":"a9059cbb","id":1553,"implemented":false,"kind":"function","modifiers":[],"name":"transfer","nameLocation":"658:8:1","nodeType":"FunctionDefinition","parameters":{"id":1549,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1546,"mutability":"mutable","name":"recipient","nameLocation":"675:9:1","nodeType":"VariableDeclaration","scope":1553,"src":"667:17:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1545,"name":"address","nodeType":"ElementaryTypeName","src":"667:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1548,"mutability":"mutable","name":"amount","nameLocation":"694:6:1","nodeType":"VariableDeclaration","scope":1553,"src":"686:14:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1547,"name":"uint256","nodeType":"ElementaryTypeName","src":"686:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"666:35:1"},"returnParameters":{"id":1552,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1551,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1553,"src":"720:4:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":1550,"name":"bool","nodeType":"ElementaryTypeName","src":"720:4:1","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"}],"src":"719:6:1"},"scope":1604,"src":"649:77:1","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"documentation":{"id":1554,"nodeType":"StructuredDocumentation","src":"732:264:1","text":" @dev Returns the remaining number of tokens that `spender` will be\\n allowed to spend on behalf of `owner` through {transferFrom}. This is\\n zero by default.\\n This value changes when {approve} or {transferFrom} are called."},"functionSelector":"dd62ed3e","id":1563,"implemented":false,"kind":"function","modifiers":[],"name":"allowance","nameLocation":"1010:9:1","nodeType":"FunctionDefinition","parameters":{"id":1559,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1556,"mutability":"mutable","name":"owner","nameLocation":"1028:5:1","nodeType":"VariableDeclaration","scope":1563,"src":"1020:13:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1555,"name":"address","nodeType":"ElementaryTypeName","src":"1020:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1558,"mutability":"mutable","name":"spender","nameLocation":"1043:7:1","nodeType":"VariableDeclaration","scope":1563,"src":"1035:15:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1557,"name":"address","nodeType":"ElementaryTypeName","src":"1035:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"1019:32:1"},"returnParameters":{"id":1562,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1561,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1563,"src":"1075:7:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1560,"name":"uint256","nodeType":"ElementaryTypeName","src":"1075:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"1074:9:1"},"scope":1604,"src":"1001:83:1","stateMutability":"view","virtual":false,"visibility":"external"},{"documentation":{"id":1564,"nodeType":"StructuredDocumentation","src":"1090:642:1","text":" @dev Sets `amount` as the allowance of `spender` over the caller\'s tokens.\\n Returns a boolean value indicating whether the operation succeeded.\\n IMPORTANT: Beware that changing an allowance with this method brings the risk\\n that someone may use both the old and the new allowance by unfortunate\\n transaction ordering. One possible solution to mitigate this race\\n condition is to first reduce the spender\'s allowance to 0 and set the\\n desired value afterwards:\\n https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\\n Emits an {Approval} event."},"functionSelector":"095ea7b3","id":1573,"implemented":false,"kind":"function","modifiers":[],"name":"approve","nameLocation":"1746:7:1","nodeType":"FunctionDefinition","parameters":{"id":1569,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1566,"mutability":"mutable","name":"spender","nameLocation":"1762:7:1","nodeType":"VariableDeclaration","scope":1573,"src":"1754:15:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1565,"name":"address","nodeType":"ElementaryTypeName","src":"1754:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1568,"mutability":"mutable","name":"amount","nameLocation":"1779:6:1","nodeType":"VariableDeclaration","scope":1573,"src":"1771:14:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1567,"name":"uint256","nodeType":"ElementaryTypeName","src":"1771:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"1753:33:1"},"returnParameters":{"id":1572,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1571,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1573,"src":"1805:4:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":1570,"name":"bool","nodeType":"ElementaryTypeName","src":"1805:4:1","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"}],"src":"1804:6:1"},"scope":1604,"src":"1737:74:1","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"documentation":{"id":1574,"nodeType":"StructuredDocumentation","src":"1817:296:1","text":" @dev Moves `amount` tokens from `sender` to `recipient` using the\\n allowance mechanism. `amount` is then deducted from the caller\'s\\n allowance.\\n Returns a boolean value indicating whether the operation succeeded.\\n Emits a {Transfer} event."},"functionSelector":"23b872dd","id":1585,"implemented":false,"kind":"function","modifiers":[],"name":"transferFrom","nameLocation":"2127:12:1","nodeType":"FunctionDefinition","parameters":{"id":1581,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1576,"mutability":"mutable","name":"sender","nameLocation":"2157:6:1","nodeType":"VariableDeclaration","scope":1585,"src":"2149:14:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1575,"name":"address","nodeType":"ElementaryTypeName","src":"2149:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1578,"mutability":"mutable","name":"recipient","nameLocation":"2181:9:1","nodeType":"VariableDeclaration","scope":1585,"src":"2173:17:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1577,"name":"address","nodeType":"ElementaryTypeName","src":"2173:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1580,"mutability":"mutable","name":"amount","nameLocation":"2208:6:1","nodeType":"VariableDeclaration","scope":1585,"src":"2200:14:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1579,"name":"uint256","nodeType":"ElementaryTypeName","src":"2200:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"2139:81:1"},"returnParameters":{"id":1584,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1583,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1585,"src":"2239:4:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":1582,"name":"bool","nodeType":"ElementaryTypeName","src":"2239:4:1","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"}],"src":"2238:6:1"},"scope":1604,"src":"2118:127:1","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"anonymous":false,"documentation":{"id":1586,"nodeType":"StructuredDocumentation","src":"2251:158:1","text":" @dev Emitted when `value` tokens are moved from one account (`from`) to\\n another (`to`).\\n Note that `value` may be zero."},"id":1594,"name":"Transfer","nameLocation":"2420:8:1","nodeType":"EventDefinition","parameters":{"id":1593,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1588,"indexed":true,"mutability":"mutable","name":"from","nameLocation":"2445:4:1","nodeType":"VariableDeclaration","scope":1594,"src":"2429:20:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1587,"name":"address","nodeType":"ElementaryTypeName","src":"2429:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1590,"indexed":true,"mutability":"mutable","name":"to","nameLocation":"2467:2:1","nodeType":"VariableDeclaration","scope":1594,"src":"2451:18:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1589,"name":"address","nodeType":"ElementaryTypeName","src":"2451:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1592,"indexed":false,"mutability":"mutable","name":"value","nameLocation":"2479:5:1","nodeType":"VariableDeclaration","scope":1594,"src":"2471:13:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1591,"name":"uint256","nodeType":"ElementaryTypeName","src":"2471:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"2428:57:1"},"src":"2414:72:1"},{"anonymous":false,"documentation":{"id":1595,"nodeType":"StructuredDocumentation","src":"2492:148:1","text":" @dev Emitted when the allowance of a `spender` for an `owner` is set by\\n a call to {approve}. `value` is the new allowance."},"id":1603,"name":"Approval","nameLocation":"2651:8:1","nodeType":"EventDefinition","parameters":{"id":1602,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1597,"indexed":true,"mutability":"mutable","name":"owner","nameLocation":"2676:5:1","nodeType":"VariableDeclaration","scope":1603,"src":"2660:21:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1596,"name":"address","nodeType":"ElementaryTypeName","src":"2660:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1599,"indexed":true,"mutability":"mutable","name":"spender","nameLocation":"2699:7:1","nodeType":"VariableDeclaration","scope":1603,"src":"2683:23:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1598,"name":"address","nodeType":"ElementaryTypeName","src":"2683:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1601,"indexed":false,"mutability":"mutable","name":"value","nameLocation":"2716:5:1","nodeType":"VariableDeclaration","scope":1603,"src":"2708:13:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1600,"name":"uint256","nodeType":"ElementaryTypeName","src":"2708:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"2659:63:1"},"src":"2645:78:1"}],"scope":1605,"src":"129:2596:1","usedErrors":[]}],"src":"33:2693:1"},"bytecode":"","bytecodeSha1":"da39a3ee5e6b4b0d3255bfef95601890afd80709","compiler":{"evm_version":"istanbul","optimizer":{"enabled":true,"runs":200},"version":"0.8.10+commit.fc410830"},"contractName":"IERC20","coverageMap":{"branches":{},"statements":{}},"dependencies":[],"deployedBytecode":"","deployedSourceMap":"","language":"Solidity","natspec":{"details":"Interface of the ERC20 standard as defined in the EIP.","events":{"Approval(address,address,uint256)":{"details":"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance."},"Transfer(address,address,uint256)":{"details":"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero."}},"kind":"dev","methods":{"allowance(address,address)":{"details":"Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called."},"approve(address,uint256)":{"details":"Sets `amount` as the allowance of `spender` over the caller\'s tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender\'s allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event."},"balanceOf(address)":{"details":"Returns the amount of tokens owned by `account`."},"totalSupply()":{"details":"Returns the amount of tokens in existence."},"transfer(address,uint256)":{"details":"Moves `amount` tokens from the caller\'s account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event."},"transferFrom(address,address,uint256)":{"details":"Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller\'s allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event."}},"version":1},"offset":[129,2725],"opcodes":"","pcMap":{},"sha1":"2a16c581fa3e71c55f5a07d494a1d6c4f937e6eb","source":"// SPDX-License-Identifier: MIT\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Interface of the ERC20 standard as defined in the EIP.\\n */\\ninterface IERC20 {\\n    /**\\n     * @dev Returns the amount of tokens in existence.\\n     */\\n    function totalSupply() external view returns (uint256);\\n\\n    /**\\n     * @dev Returns the amount of tokens owned by `account`.\\n     */\\n    function balanceOf(address account) external view returns (uint256);\\n\\n    /**\\n     * @dev Moves `amount` tokens from the caller\'s account to `recipient`.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transfer(address recipient, uint256 amount) external returns (bool);\\n\\n    /**\\n     * @dev Returns the remaining number of tokens that `spender` will be\\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\\n     * zero by default.\\n     *\\n     * This value changes when {approve} or {transferFrom} are called.\\n     */\\n    function allowance(address owner, address spender) external view returns (uint256);\\n\\n    /**\\n     * @dev Sets `amount` as the allowance of `spender` over the caller\'s tokens.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\\n     * that someone may use both the old and the new allowance by unfortunate\\n     * transaction ordering. One possible solution to mitigate this race\\n     * condition is to first reduce the spender\'s allowance to 0 and set the\\n     * desired value afterwards:\\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\\n     *\\n     * Emits an {Approval} event.\\n     */\\n    function approve(address spender, uint256 amount) external returns (bool);\\n\\n    /**\\n     * @dev Moves `amount` tokens from `sender` to `recipient` using the\\n     * allowance mechanism. `amount` is then deducted from the caller\'s\\n     * allowance.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transferFrom(\\n        address sender,\\n        address recipient,\\n        uint256 amount\\n    ) external returns (bool);\\n\\n    /**\\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\\n     * another (`to`).\\n     *\\n     * Note that `value` may be zero.\\n     */\\n    event Transfer(address indexed from, address indexed to, uint256 value);\\n\\n    /**\\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\\n     * a call to {approve}. `value` is the new allowance.\\n     */\\n    event Approval(address indexed owner, address indexed spender, uint256 value);\\n}\\n","sourceMap":"","sourcePath":"/Users/filip/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.3.2/contracts/token/ERC20/IERC20.sol","type":"interface"}')}}]);
//# sourceMappingURL=15.bb5c3246.chunk.js.map