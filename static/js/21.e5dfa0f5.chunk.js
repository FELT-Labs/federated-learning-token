(this["webpackJsonpFELT-webapp"]=this["webpackJsonpFELT-webapp"]||[]).push([[21],{118:function(e){e.exports=JSON.parse('{"abi":[{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"decimalPlaces","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"increaseApproval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"tokenName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"tokenSymbol","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"totalTokensIssued","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"allSourcePaths":{"2":"/home/breta/.brownie/packages/smartcontractkit/chainlink-brownie-contracts@0.2.2/contracts/src/v0.6/interfaces/LinkTokenInterface.sol"},"ast":{"absolutePath":"/home/breta/.brownie/packages/smartcontractkit/chainlink-brownie-contracts@0.2.2/contracts/src/v0.6/interfaces/LinkTokenInterface.sol","exportedSymbols":{"LinkTokenInterface":[335]},"id":336,"nodeType":"SourceUnit","nodes":[{"id":242,"literals":["solidity","^","0.6",".0"],"nodeType":"PragmaDirective","src":"32:23:2"},{"abstract":false,"baseContracts":[],"contractDependencies":[],"contractKind":"interface","documentation":null,"fullyImplemented":false,"id":335,"linearizedBaseContracts":[335],"name":"LinkTokenInterface","nodeType":"ContractDefinition","nodes":[{"body":null,"documentation":null,"functionSelector":"dd62ed3e","id":251,"implemented":false,"kind":"function","modifiers":[],"name":"allowance","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":247,"nodeType":"ParameterList","parameters":[{"constant":false,"id":244,"mutability":"mutable","name":"owner","nodeType":"VariableDeclaration","overrides":null,"scope":251,"src":"109:13:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":243,"name":"address","nodeType":"ElementaryTypeName","src":"109:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"},{"constant":false,"id":246,"mutability":"mutable","name":"spender","nodeType":"VariableDeclaration","overrides":null,"scope":251,"src":"124:15:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":245,"name":"address","nodeType":"ElementaryTypeName","src":"124:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"}],"src":"108:32:2"},"returnParameters":{"id":250,"nodeType":"ParameterList","parameters":[{"constant":false,"id":249,"mutability":"mutable","name":"remaining","nodeType":"VariableDeclaration","overrides":null,"scope":251,"src":"164:17:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":248,"name":"uint256","nodeType":"ElementaryTypeName","src":"164:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"163:19:2"},"scope":335,"src":"90:93:2","stateMutability":"view","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"095ea7b3","id":260,"implemented":false,"kind":"function","modifiers":[],"name":"approve","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":256,"nodeType":"ParameterList","parameters":[{"constant":false,"id":253,"mutability":"mutable","name":"spender","nodeType":"VariableDeclaration","overrides":null,"scope":260,"src":"203:15:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":252,"name":"address","nodeType":"ElementaryTypeName","src":"203:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"},{"constant":false,"id":255,"mutability":"mutable","name":"value","nodeType":"VariableDeclaration","overrides":null,"scope":260,"src":"220:13:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":254,"name":"uint256","nodeType":"ElementaryTypeName","src":"220:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"202:32:2"},"returnParameters":{"id":259,"nodeType":"ParameterList","parameters":[{"constant":false,"id":258,"mutability":"mutable","name":"success","nodeType":"VariableDeclaration","overrides":null,"scope":260,"src":"253:12:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":257,"name":"bool","nodeType":"ElementaryTypeName","src":"253:4:2","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"value":null,"visibility":"internal"}],"src":"252:14:2"},"scope":335,"src":"186:81:2","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"70a08231","id":267,"implemented":false,"kind":"function","modifiers":[],"name":"balanceOf","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":263,"nodeType":"ParameterList","parameters":[{"constant":false,"id":262,"mutability":"mutable","name":"owner","nodeType":"VariableDeclaration","overrides":null,"scope":267,"src":"289:13:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":261,"name":"address","nodeType":"ElementaryTypeName","src":"289:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"}],"src":"288:15:2"},"returnParameters":{"id":266,"nodeType":"ParameterList","parameters":[{"constant":false,"id":265,"mutability":"mutable","name":"balance","nodeType":"VariableDeclaration","overrides":null,"scope":267,"src":"327:15:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":264,"name":"uint256","nodeType":"ElementaryTypeName","src":"327:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"326:17:2"},"scope":335,"src":"270:74:2","stateMutability":"view","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"313ce567","id":272,"implemented":false,"kind":"function","modifiers":[],"name":"decimals","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":268,"nodeType":"ParameterList","parameters":[],"src":"364:2:2"},"returnParameters":{"id":271,"nodeType":"ParameterList","parameters":[{"constant":false,"id":270,"mutability":"mutable","name":"decimalPlaces","nodeType":"VariableDeclaration","overrides":null,"scope":272,"src":"390:19:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"},"typeName":{"id":269,"name":"uint8","nodeType":"ElementaryTypeName","src":"390:5:2","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"value":null,"visibility":"internal"}],"src":"389:21:2"},"scope":335,"src":"347:64:2","stateMutability":"view","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"66188463","id":281,"implemented":false,"kind":"function","modifiers":[],"name":"decreaseApproval","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":277,"nodeType":"ParameterList","parameters":[{"constant":false,"id":274,"mutability":"mutable","name":"spender","nodeType":"VariableDeclaration","overrides":null,"scope":281,"src":"440:15:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":273,"name":"address","nodeType":"ElementaryTypeName","src":"440:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"},{"constant":false,"id":276,"mutability":"mutable","name":"addedValue","nodeType":"VariableDeclaration","overrides":null,"scope":281,"src":"457:18:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":275,"name":"uint256","nodeType":"ElementaryTypeName","src":"457:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"439:37:2"},"returnParameters":{"id":280,"nodeType":"ParameterList","parameters":[{"constant":false,"id":279,"mutability":"mutable","name":"success","nodeType":"VariableDeclaration","overrides":null,"scope":281,"src":"495:12:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":278,"name":"bool","nodeType":"ElementaryTypeName","src":"495:4:2","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"value":null,"visibility":"internal"}],"src":"494:14:2"},"scope":335,"src":"414:95:2","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"d73dd623","id":288,"implemented":false,"kind":"function","modifiers":[],"name":"increaseApproval","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":286,"nodeType":"ParameterList","parameters":[{"constant":false,"id":283,"mutability":"mutable","name":"spender","nodeType":"VariableDeclaration","overrides":null,"scope":288,"src":"538:15:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":282,"name":"address","nodeType":"ElementaryTypeName","src":"538:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"},{"constant":false,"id":285,"mutability":"mutable","name":"subtractedValue","nodeType":"VariableDeclaration","overrides":null,"scope":288,"src":"555:23:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":284,"name":"uint256","nodeType":"ElementaryTypeName","src":"555:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"537:42:2"},"returnParameters":{"id":287,"nodeType":"ParameterList","parameters":[],"src":"588:0:2"},"scope":335,"src":"512:77:2","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"06fdde03","id":293,"implemented":false,"kind":"function","modifiers":[],"name":"name","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":289,"nodeType":"ParameterList","parameters":[],"src":"605:2:2"},"returnParameters":{"id":292,"nodeType":"ParameterList","parameters":[{"constant":false,"id":291,"mutability":"mutable","name":"tokenName","nodeType":"VariableDeclaration","overrides":null,"scope":293,"src":"631:23:2","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":290,"name":"string","nodeType":"ElementaryTypeName","src":"631:6:2","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"}],"src":"630:25:2"},"scope":335,"src":"592:64:2","stateMutability":"view","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"95d89b41","id":298,"implemented":false,"kind":"function","modifiers":[],"name":"symbol","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":294,"nodeType":"ParameterList","parameters":[],"src":"674:2:2"},"returnParameters":{"id":297,"nodeType":"ParameterList","parameters":[{"constant":false,"id":296,"mutability":"mutable","name":"tokenSymbol","nodeType":"VariableDeclaration","overrides":null,"scope":298,"src":"700:25:2","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":295,"name":"string","nodeType":"ElementaryTypeName","src":"700:6:2","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"}],"src":"699:27:2"},"scope":335,"src":"659:68:2","stateMutability":"view","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"18160ddd","id":303,"implemented":false,"kind":"function","modifiers":[],"name":"totalSupply","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":299,"nodeType":"ParameterList","parameters":[],"src":"750:2:2"},"returnParameters":{"id":302,"nodeType":"ParameterList","parameters":[{"constant":false,"id":301,"mutability":"mutable","name":"totalTokensIssued","nodeType":"VariableDeclaration","overrides":null,"scope":303,"src":"776:25:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":300,"name":"uint256","nodeType":"ElementaryTypeName","src":"776:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"775:27:2"},"scope":335,"src":"730:73:2","stateMutability":"view","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"a9059cbb","id":312,"implemented":false,"kind":"function","modifiers":[],"name":"transfer","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":308,"nodeType":"ParameterList","parameters":[{"constant":false,"id":305,"mutability":"mutable","name":"to","nodeType":"VariableDeclaration","overrides":null,"scope":312,"src":"824:10:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":304,"name":"address","nodeType":"ElementaryTypeName","src":"824:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"},{"constant":false,"id":307,"mutability":"mutable","name":"value","nodeType":"VariableDeclaration","overrides":null,"scope":312,"src":"836:13:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":306,"name":"uint256","nodeType":"ElementaryTypeName","src":"836:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"823:27:2"},"returnParameters":{"id":311,"nodeType":"ParameterList","parameters":[{"constant":false,"id":310,"mutability":"mutable","name":"success","nodeType":"VariableDeclaration","overrides":null,"scope":312,"src":"869:12:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":309,"name":"bool","nodeType":"ElementaryTypeName","src":"869:4:2","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"value":null,"visibility":"internal"}],"src":"868:14:2"},"scope":335,"src":"806:77:2","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"4000aea0","id":323,"implemented":false,"kind":"function","modifiers":[],"name":"transferAndCall","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":319,"nodeType":"ParameterList","parameters":[{"constant":false,"id":314,"mutability":"mutable","name":"to","nodeType":"VariableDeclaration","overrides":null,"scope":323,"src":"911:10:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":313,"name":"address","nodeType":"ElementaryTypeName","src":"911:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"},{"constant":false,"id":316,"mutability":"mutable","name":"value","nodeType":"VariableDeclaration","overrides":null,"scope":323,"src":"923:13:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":315,"name":"uint256","nodeType":"ElementaryTypeName","src":"923:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"},{"constant":false,"id":318,"mutability":"mutable","name":"data","nodeType":"VariableDeclaration","overrides":null,"scope":323,"src":"938:19:2","stateVariable":false,"storageLocation":"calldata","typeDescriptions":{"typeIdentifier":"t_bytes_calldata_ptr","typeString":"bytes"},"typeName":{"id":317,"name":"bytes","nodeType":"ElementaryTypeName","src":"938:5:2","typeDescriptions":{"typeIdentifier":"t_bytes_storage_ptr","typeString":"bytes"}},"value":null,"visibility":"internal"}],"src":"910:48:2"},"returnParameters":{"id":322,"nodeType":"ParameterList","parameters":[{"constant":false,"id":321,"mutability":"mutable","name":"success","nodeType":"VariableDeclaration","overrides":null,"scope":323,"src":"977:12:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":320,"name":"bool","nodeType":"ElementaryTypeName","src":"977:4:2","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"value":null,"visibility":"internal"}],"src":"976:14:2"},"scope":335,"src":"886:105:2","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":null,"documentation":null,"functionSelector":"23b872dd","id":334,"implemented":false,"kind":"function","modifiers":[],"name":"transferFrom","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":330,"nodeType":"ParameterList","parameters":[{"constant":false,"id":325,"mutability":"mutable","name":"from","nodeType":"VariableDeclaration","overrides":null,"scope":334,"src":"1016:12:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":324,"name":"address","nodeType":"ElementaryTypeName","src":"1016:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"},{"constant":false,"id":327,"mutability":"mutable","name":"to","nodeType":"VariableDeclaration","overrides":null,"scope":334,"src":"1030:10:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":326,"name":"address","nodeType":"ElementaryTypeName","src":"1030:7:2","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"},{"constant":false,"id":329,"mutability":"mutable","name":"value","nodeType":"VariableDeclaration","overrides":null,"scope":334,"src":"1042:13:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":328,"name":"uint256","nodeType":"ElementaryTypeName","src":"1042:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"1015:41:2"},"returnParameters":{"id":333,"nodeType":"ParameterList","parameters":[{"constant":false,"id":332,"mutability":"mutable","name":"success","nodeType":"VariableDeclaration","overrides":null,"scope":334,"src":"1075:12:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":331,"name":"bool","nodeType":"ElementaryTypeName","src":"1075:4:2","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"value":null,"visibility":"internal"}],"src":"1074:14:2"},"scope":335,"src":"994:95:2","stateMutability":"nonpayable","virtual":false,"visibility":"external"}],"scope":336,"src":"57:1034:2"}],"src":"32:1060:2"},"bytecode":"","bytecodeSha1":"da39a3ee5e6b4b0d3255bfef95601890afd80709","compiler":{"evm_version":"istanbul","optimizer":{"enabled":true,"runs":200},"version":"0.6.6+commit.6c089d02"},"contractName":"LinkTokenInterface","coverageMap":{"branches":{},"statements":{}},"dependencies":[],"deployedBytecode":"","deployedSourceMap":"","language":"Solidity","natspec":{"methods":{}},"offset":[57,1091],"opcodes":"","pcMap":{},"sha1":"e33383623fa71f4d718c89a7ce4b878c422c6ea0","source":"// SPDX-License-Identifier: MIT\\npragma solidity ^0.6.0;\\n\\ninterface LinkTokenInterface {\\n  function allowance(address owner, address spender) external view returns (uint256 remaining);\\n  function approve(address spender, uint256 value) external returns (bool success);\\n  function balanceOf(address owner) external view returns (uint256 balance);\\n  function decimals() external view returns (uint8 decimalPlaces);\\n  function decreaseApproval(address spender, uint256 addedValue) external returns (bool success);\\n  function increaseApproval(address spender, uint256 subtractedValue) external;\\n  function name() external view returns (string memory tokenName);\\n  function symbol() external view returns (string memory tokenSymbol);\\n  function totalSupply() external view returns (uint256 totalTokensIssued);\\n  function transfer(address to, uint256 value) external returns (bool success);\\n  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool success);\\n  function transferFrom(address from, address to, uint256 value) external returns (bool success);\\n}\\n","sourceMap":"","sourcePath":"/home/breta/.brownie/packages/smartcontractkit/chainlink-brownie-contracts@0.2.2/contracts/src/v0.6/interfaces/LinkTokenInterface.sol","type":"interface"}')}}]);
//# sourceMappingURL=21.e5dfa0f5.chunk.js.map