(this["webpackJsonpFELT-webapp"]=this["webpackJsonpFELT-webapp"]||[]).push([[22],{119:function(e){e.exports=JSON.parse('{"abi":[],"allSourcePaths":{"3":"/home/breta/.brownie/packages/smartcontractkit/chainlink-brownie-contracts@0.2.2/contracts/src/v0.6/vendor/SafeMathChainlink.sol"},"ast":{"absolutePath":"/home/breta/.brownie/packages/smartcontractkit/chainlink-brownie-contracts@0.2.2/contracts/src/v0.6/vendor/SafeMathChainlink.sol","exportedSymbols":{"SafeMathChainlink":[524]},"id":525,"nodeType":"SourceUnit","nodes":[{"id":387,"literals":["solidity","^","0.6",".0"],"nodeType":"PragmaDirective","src":"32:23:3"},{"abstract":false,"baseContracts":[],"contractDependencies":[],"contractKind":"library","documentation":{"id":388,"nodeType":"StructuredDocumentation","src":"57:563:3","text":"@dev Wrappers over Solidity\'s arithmetic operations with added overflow\\nchecks.\\n * Arithmetic operations in Solidity wrap on overflow. This can easily result\\nin bugs, because programmers usually assume that an overflow raises an\\nerror, which is the standard behavior in high level programming languages.\\n`SafeMath` restores this intuition by reverting the transaction when an\\noperation overflows.\\n * Using this library instead of the unchecked operations eliminates an entire\\nclass of bugs, so it\'s recommended to use it always."},"fullyImplemented":true,"id":524,"linearizedBaseContracts":[524],"name":"SafeMathChainlink","nodeType":"ContractDefinition","nodes":[{"body":{"id":413,"nodeType":"Block","src":"930:95:3","statements":[{"assignments":[399],"declarations":[{"constant":false,"id":399,"mutability":"mutable","name":"c","nodeType":"VariableDeclaration","overrides":null,"scope":413,"src":"936:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":398,"name":"uint256","nodeType":"ElementaryTypeName","src":"936:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"id":403,"initialValue":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":402,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":400,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":391,"src":"948:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"+","rightExpression":{"argumentTypes":null,"id":401,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":393,"src":"952:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"948:5:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"VariableDeclarationStatement","src":"936:17:3"},{"expression":{"argumentTypes":null,"arguments":[{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":407,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":405,"name":"c","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":399,"src":"967:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":">=","rightExpression":{"argumentTypes":null,"id":406,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":391,"src":"972:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"967:6:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},{"argumentTypes":null,"hexValue":"536166654d6174683a206164646974696f6e206f766572666c6f77","id":408,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"975:29:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_stringliteral_30cc447bcc13b3e22b45cef0dd9b0b514842d836dd9b6eb384e20dedfb47723a","typeString":"literal_string \\"SafeMath: addition overflow\\""},"value":"SafeMath: addition overflow"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bool","typeString":"bool"},{"typeIdentifier":"t_stringliteral_30cc447bcc13b3e22b45cef0dd9b0b514842d836dd9b6eb384e20dedfb47723a","typeString":"literal_string \\"SafeMath: addition overflow\\""}],"id":404,"name":"require","nodeType":"Identifier","overloadedDeclarations":[-18,-18],"referencedDeclaration":-18,"src":"959:7:3","typeDescriptions":{"typeIdentifier":"t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$","typeString":"function (bool,string memory) pure"}},"id":409,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"names":[],"nodeType":"FunctionCall","src":"959:46:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":410,"nodeType":"ExpressionStatement","src":"959:46:3"},{"expression":{"argumentTypes":null,"id":411,"name":"c","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":399,"src":"1019:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"functionReturnParameters":397,"id":412,"nodeType":"Return","src":"1012:8:3"}]},"documentation":{"id":389,"nodeType":"StructuredDocumentation","src":"651:209:3","text":"@dev Returns the addition of two unsigned integers, reverting on\\noverflow.\\n    * Counterpart to Solidity\'s `+` operator.\\n    * Requirements:\\n- Addition cannot overflow."},"id":414,"implemented":true,"kind":"function","modifiers":[],"name":"add","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":394,"nodeType":"ParameterList","parameters":[{"constant":false,"id":391,"mutability":"mutable","name":"a","nodeType":"VariableDeclaration","overrides":null,"scope":414,"src":"876:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":390,"name":"uint256","nodeType":"ElementaryTypeName","src":"876:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"},{"constant":false,"id":393,"mutability":"mutable","name":"b","nodeType":"VariableDeclaration","overrides":null,"scope":414,"src":"887:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":392,"name":"uint256","nodeType":"ElementaryTypeName","src":"887:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"875:22:3"},"returnParameters":{"id":397,"nodeType":"ParameterList","parameters":[{"constant":false,"id":396,"mutability":"mutable","name":"","nodeType":"VariableDeclaration","overrides":null,"scope":414,"src":"921:7:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":395,"name":"uint256","nodeType":"ElementaryTypeName","src":"921:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"920:9:3"},"scope":524,"src":"863:162:3","stateMutability":"pure","virtual":false,"visibility":"internal"},{"body":{"id":439,"nodeType":"Block","src":"1344:98:3","statements":[{"expression":{"argumentTypes":null,"arguments":[{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":427,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":425,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":419,"src":"1358:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"<=","rightExpression":{"argumentTypes":null,"id":426,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":417,"src":"1363:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"1358:6:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},{"argumentTypes":null,"hexValue":"536166654d6174683a207375627472616374696f6e206f766572666c6f77","id":428,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"1366:32:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_stringliteral_50b058e9b5320e58880d88223c9801cd9eecdcf90323d5c2318bc1b6b916e862","typeString":"literal_string \\"SafeMath: subtraction overflow\\""},"value":"SafeMath: subtraction overflow"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bool","typeString":"bool"},{"typeIdentifier":"t_stringliteral_50b058e9b5320e58880d88223c9801cd9eecdcf90323d5c2318bc1b6b916e862","typeString":"literal_string \\"SafeMath: subtraction overflow\\""}],"id":424,"name":"require","nodeType":"Identifier","overloadedDeclarations":[-18,-18],"referencedDeclaration":-18,"src":"1350:7:3","typeDescriptions":{"typeIdentifier":"t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$","typeString":"function (bool,string memory) pure"}},"id":429,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"names":[],"nodeType":"FunctionCall","src":"1350:49:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":430,"nodeType":"ExpressionStatement","src":"1350:49:3"},{"assignments":[432],"declarations":[{"constant":false,"id":432,"mutability":"mutable","name":"c","nodeType":"VariableDeclaration","overrides":null,"scope":439,"src":"1405:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":431,"name":"uint256","nodeType":"ElementaryTypeName","src":"1405:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"id":436,"initialValue":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":435,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":433,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":417,"src":"1417:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"-","rightExpression":{"argumentTypes":null,"id":434,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":419,"src":"1421:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"1417:5:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"VariableDeclarationStatement","src":"1405:17:3"},{"expression":{"argumentTypes":null,"id":437,"name":"c","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":432,"src":"1436:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"functionReturnParameters":423,"id":438,"nodeType":"Return","src":"1429:8:3"}]},"documentation":{"id":415,"nodeType":"StructuredDocumentation","src":"1029:245:3","text":"@dev Returns the subtraction of two unsigned integers, reverting on\\noverflow (when the result is negative).\\n    * Counterpart to Solidity\'s `-` operator.\\n    * Requirements:\\n- Subtraction cannot overflow."},"id":440,"implemented":true,"kind":"function","modifiers":[],"name":"sub","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":420,"nodeType":"ParameterList","parameters":[{"constant":false,"id":417,"mutability":"mutable","name":"a","nodeType":"VariableDeclaration","overrides":null,"scope":440,"src":"1290:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":416,"name":"uint256","nodeType":"ElementaryTypeName","src":"1290:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"},{"constant":false,"id":419,"mutability":"mutable","name":"b","nodeType":"VariableDeclaration","overrides":null,"scope":440,"src":"1301:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":418,"name":"uint256","nodeType":"ElementaryTypeName","src":"1301:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"1289:22:3"},"returnParameters":{"id":423,"nodeType":"ParameterList","parameters":[{"constant":false,"id":422,"mutability":"mutable","name":"","nodeType":"VariableDeclaration","overrides":null,"scope":440,"src":"1335:7:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":421,"name":"uint256","nodeType":"ElementaryTypeName","src":"1335:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"1334:9:3"},"scope":524,"src":"1277:165:3","stateMutability":"pure","virtual":false,"visibility":"internal"},{"body":{"id":474,"nodeType":"Block","src":"1737:351:3","statements":[{"condition":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":452,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":450,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":443,"src":"1952:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"argumentTypes":null,"hexValue":"30","id":451,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1957:1:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"1952:6:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"falseBody":null,"id":456,"nodeType":"IfStatement","src":"1948:35:3","trueBody":{"id":455,"nodeType":"Block","src":"1960:23:3","statements":[{"expression":{"argumentTypes":null,"hexValue":"30","id":453,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1975:1:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"functionReturnParameters":449,"id":454,"nodeType":"Return","src":"1968:8:3"}]}},{"assignments":[458],"declarations":[{"constant":false,"id":458,"mutability":"mutable","name":"c","nodeType":"VariableDeclaration","overrides":null,"scope":474,"src":"1989:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":457,"name":"uint256","nodeType":"ElementaryTypeName","src":"1989:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"id":462,"initialValue":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":461,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":459,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":443,"src":"2001:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"*","rightExpression":{"argumentTypes":null,"id":460,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":445,"src":"2005:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"2001:5:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"VariableDeclarationStatement","src":"1989:17:3"},{"expression":{"argumentTypes":null,"arguments":[{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":468,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":466,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":464,"name":"c","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":458,"src":"2020:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"/","rightExpression":{"argumentTypes":null,"id":465,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":443,"src":"2024:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"2020:5:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"argumentTypes":null,"id":467,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":445,"src":"2029:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"2020:10:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},{"argumentTypes":null,"hexValue":"536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77","id":469,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"2032:35:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_stringliteral_9113bb53c2876a3805b2c9242029423fc540a728243ce887ab24c82cf119fba3","typeString":"literal_string \\"SafeMath: multiplication overflow\\""},"value":"SafeMath: multiplication overflow"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bool","typeString":"bool"},{"typeIdentifier":"t_stringliteral_9113bb53c2876a3805b2c9242029423fc540a728243ce887ab24c82cf119fba3","typeString":"literal_string \\"SafeMath: multiplication overflow\\""}],"id":463,"name":"require","nodeType":"Identifier","overloadedDeclarations":[-18,-18],"referencedDeclaration":-18,"src":"2012:7:3","typeDescriptions":{"typeIdentifier":"t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$","typeString":"function (bool,string memory) pure"}},"id":470,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"names":[],"nodeType":"FunctionCall","src":"2012:56:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":471,"nodeType":"ExpressionStatement","src":"2012:56:3"},{"expression":{"argumentTypes":null,"id":472,"name":"c","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":458,"src":"2082:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"functionReturnParameters":449,"id":473,"nodeType":"Return","src":"2075:8:3"}]},"documentation":{"id":441,"nodeType":"StructuredDocumentation","src":"1446:221:3","text":"@dev Returns the multiplication of two unsigned integers, reverting on\\noverflow.\\n    * Counterpart to Solidity\'s `*` operator.\\n    * Requirements:\\n- Multiplication cannot overflow."},"id":475,"implemented":true,"kind":"function","modifiers":[],"name":"mul","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":446,"nodeType":"ParameterList","parameters":[{"constant":false,"id":443,"mutability":"mutable","name":"a","nodeType":"VariableDeclaration","overrides":null,"scope":475,"src":"1683:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":442,"name":"uint256","nodeType":"ElementaryTypeName","src":"1683:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"},{"constant":false,"id":445,"mutability":"mutable","name":"b","nodeType":"VariableDeclaration","overrides":null,"scope":475,"src":"1694:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":444,"name":"uint256","nodeType":"ElementaryTypeName","src":"1694:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"1682:22:3"},"returnParameters":{"id":449,"nodeType":"ParameterList","parameters":[{"constant":false,"id":448,"mutability":"mutable","name":"","nodeType":"VariableDeclaration","overrides":null,"scope":475,"src":"1728:7:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":447,"name":"uint256","nodeType":"ElementaryTypeName","src":"1728:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"1727:9:3"},"scope":524,"src":"1670:418:3","stateMutability":"pure","virtual":false,"visibility":"internal"},{"body":{"id":500,"nodeType":"Block","src":"2596:237:3","statements":[{"expression":{"argumentTypes":null,"arguments":[{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":488,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":486,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":480,"src":"2672:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":">","rightExpression":{"argumentTypes":null,"hexValue":"30","id":487,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"2676:1:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"2672:5:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},{"argumentTypes":null,"hexValue":"536166654d6174683a206469766973696f6e206279207a65726f","id":489,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"2679:28:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_stringliteral_5b7cc70dda4dc2143e5adb63bd5d1f349504f461dbdfd9bc76fac1f8ca6d019f","typeString":"literal_string \\"SafeMath: division by zero\\""},"value":"SafeMath: division by zero"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bool","typeString":"bool"},{"typeIdentifier":"t_stringliteral_5b7cc70dda4dc2143e5adb63bd5d1f349504f461dbdfd9bc76fac1f8ca6d019f","typeString":"literal_string \\"SafeMath: division by zero\\""}],"id":485,"name":"require","nodeType":"Identifier","overloadedDeclarations":[-18,-18],"referencedDeclaration":-18,"src":"2664:7:3","typeDescriptions":{"typeIdentifier":"t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$","typeString":"function (bool,string memory) pure"}},"id":490,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"names":[],"nodeType":"FunctionCall","src":"2664:44:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":491,"nodeType":"ExpressionStatement","src":"2664:44:3"},{"assignments":[493],"declarations":[{"constant":false,"id":493,"mutability":"mutable","name":"c","nodeType":"VariableDeclaration","overrides":null,"scope":500,"src":"2714:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":492,"name":"uint256","nodeType":"ElementaryTypeName","src":"2714:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"id":497,"initialValue":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":496,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":494,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":478,"src":"2726:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"/","rightExpression":{"argumentTypes":null,"id":495,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":480,"src":"2730:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"2726:5:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"VariableDeclarationStatement","src":"2714:17:3"},{"expression":{"argumentTypes":null,"id":498,"name":"c","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":493,"src":"2827:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"functionReturnParameters":484,"id":499,"nodeType":"Return","src":"2820:8:3"}]},"documentation":{"id":476,"nodeType":"StructuredDocumentation","src":"2092:434:3","text":"@dev Returns the integer division of two unsigned integers. Reverts on\\ndivision by zero. The result is rounded towards zero.\\n    * Counterpart to Solidity\'s `/` operator. Note: this function uses a\\n`revert` opcode (which leaves remaining gas untouched) while Solidity\\nuses an invalid opcode to revert (consuming all remaining gas).\\n    * Requirements:\\n- The divisor cannot be zero."},"id":501,"implemented":true,"kind":"function","modifiers":[],"name":"div","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":481,"nodeType":"ParameterList","parameters":[{"constant":false,"id":478,"mutability":"mutable","name":"a","nodeType":"VariableDeclaration","overrides":null,"scope":501,"src":"2542:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":477,"name":"uint256","nodeType":"ElementaryTypeName","src":"2542:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"},{"constant":false,"id":480,"mutability":"mutable","name":"b","nodeType":"VariableDeclaration","overrides":null,"scope":501,"src":"2553:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":479,"name":"uint256","nodeType":"ElementaryTypeName","src":"2553:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"2541:22:3"},"returnParameters":{"id":484,"nodeType":"ParameterList","parameters":[{"constant":false,"id":483,"mutability":"mutable","name":"","nodeType":"VariableDeclaration","overrides":null,"scope":501,"src":"2587:7:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":482,"name":"uint256","nodeType":"ElementaryTypeName","src":"2587:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"2586:9:3"},"scope":524,"src":"2529:304:3","stateMutability":"pure","virtual":false,"visibility":"internal"},{"body":{"id":522,"nodeType":"Block","src":"3330:72:3","statements":[{"expression":{"argumentTypes":null,"arguments":[{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":514,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":512,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":506,"src":"3344:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"!=","rightExpression":{"argumentTypes":null,"hexValue":"30","id":513,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"3349:1:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"3344:6:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},{"argumentTypes":null,"hexValue":"536166654d6174683a206d6f64756c6f206279207a65726f","id":515,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"3352:26:3","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_stringliteral_726e51f7b81fce0a68f5f214f445e275313b20b1633f08ce954ee39abf8d7832","typeString":"literal_string \\"SafeMath: modulo by zero\\""},"value":"SafeMath: modulo by zero"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bool","typeString":"bool"},{"typeIdentifier":"t_stringliteral_726e51f7b81fce0a68f5f214f445e275313b20b1633f08ce954ee39abf8d7832","typeString":"literal_string \\"SafeMath: modulo by zero\\""}],"id":511,"name":"require","nodeType":"Identifier","overloadedDeclarations":[-18,-18],"referencedDeclaration":-18,"src":"3336:7:3","typeDescriptions":{"typeIdentifier":"t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$","typeString":"function (bool,string memory) pure"}},"id":516,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"names":[],"nodeType":"FunctionCall","src":"3336:43:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":517,"nodeType":"ExpressionStatement","src":"3336:43:3"},{"expression":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":520,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":518,"name":"a","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":504,"src":"3392:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"%","rightExpression":{"argumentTypes":null,"id":519,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":506,"src":"3396:1:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"3392:5:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"functionReturnParameters":510,"id":521,"nodeType":"Return","src":"3385:12:3"}]},"documentation":{"id":502,"nodeType":"StructuredDocumentation","src":"2837:423:3","text":"@dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),\\nReverts when dividing by zero.\\n    * Counterpart to Solidity\'s `%` operator. This function uses a `revert`\\nopcode (which leaves remaining gas untouched) while Solidity uses an\\ninvalid opcode to revert (consuming all remaining gas).\\n    * Requirements:\\n- The divisor cannot be zero."},"id":523,"implemented":true,"kind":"function","modifiers":[],"name":"mod","nodeType":"FunctionDefinition","overrides":null,"parameters":{"id":507,"nodeType":"ParameterList","parameters":[{"constant":false,"id":504,"mutability":"mutable","name":"a","nodeType":"VariableDeclaration","overrides":null,"scope":523,"src":"3276:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":503,"name":"uint256","nodeType":"ElementaryTypeName","src":"3276:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"},{"constant":false,"id":506,"mutability":"mutable","name":"b","nodeType":"VariableDeclaration","overrides":null,"scope":523,"src":"3287:9:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":505,"name":"uint256","nodeType":"ElementaryTypeName","src":"3287:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"3275:22:3"},"returnParameters":{"id":510,"nodeType":"ParameterList","parameters":[{"constant":false,"id":509,"mutability":"mutable","name":"","nodeType":"VariableDeclaration","overrides":null,"scope":523,"src":"3321:7:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":508,"name":"uint256","nodeType":"ElementaryTypeName","src":"3321:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"3320:9:3"},"scope":524,"src":"3263:139:3","stateMutability":"pure","virtual":false,"visibility":"internal"}],"scope":525,"src":"621:2783:3"}],"src":"32:3373:3"},"bytecode":"60566023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212204f232f471d5df216681a3be48278c145275c1e409d5622e969a9f791a0a97e7264736f6c63430006060033","bytecodeSha1":"3b4158955f564edb18bd7a8ffdb49859c904f0b7","compiler":{"evm_version":"istanbul","optimizer":{"enabled":true,"runs":200},"version":"0.6.6+commit.6c089d02"},"contractName":"SafeMathChainlink","coverageMap":{"branches":{"3":{}},"statements":{"3":{}}},"dependencies":[],"deployedBytecode":"73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212204f232f471d5df216681a3be48278c145275c1e409d5622e969a9f791a0a97e7264736f6c63430006060033","deployedSourceMap":"621:2783:3:-:0;;;;;;12:1:-1;9;2:12","language":"Solidity","natspec":{"details":"Wrappers over Solidity\'s arithmetic operations with added overflow checks. * Arithmetic operations in Solidity wrap on overflow. This can easily result in bugs, because programmers usually assume that an overflow raises an error, which is the standard behavior in high level programming languages. `SafeMath` restores this intuition by reverting the transaction when an operation overflows. * Using this library instead of the unchecked operations eliminates an entire class of bugs, so it\'s recommended to use it always.","methods":{}},"offset":[621,3404],"opcodes":"PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0x4F 0x23 0x2F SELFBALANCE SAR 0x5D CALLCODE AND PUSH9 0x1A3BE48278C145275C 0x1E BLOCKHASH SWAP14 JUMP 0x22 0xE9 PUSH10 0xA9F791A0A97E7264736F PUSH13 0x63430006060033000000000000 ","pcMap":{"0":{"offset":[621,3404],"op":"PUSH20","path":"3","value":"0x0"},"21":{"fn":null,"offset":[621,3404],"op":"ADDRESS","path":"3"},"22":{"fn":null,"offset":[621,3404],"op":"EQ","path":"3"},"23":{"fn":null,"offset":[621,3404],"op":"PUSH1","path":"3","value":"0x80"},"25":{"fn":null,"offset":[621,3404],"op":"PUSH1","path":"3","value":"0x40"},"27":{"fn":null,"offset":[621,3404],"op":"MSTORE","path":"3"},"28":{"op":"PUSH1","value":"0x0"},"30":{"op":"DUP1"},"31":{"op":"REVERT"}},"sha1":"c340d007a40b2480548b791283f57f49f1aab1d7","source":"// SPDX-License-Identifier: MIT\\npragma solidity ^0.6.0;\\n\\n/**\\n * @dev Wrappers over Solidity\'s arithmetic operations with added overflow\\n * checks.\\n *\\n * Arithmetic operations in Solidity wrap on overflow. This can easily result\\n * in bugs, because programmers usually assume that an overflow raises an\\n * error, which is the standard behavior in high level programming languages.\\n * `SafeMath` restores this intuition by reverting the transaction when an\\n * operation overflows.\\n *\\n * Using this library instead of the unchecked operations eliminates an entire\\n * class of bugs, so it\'s recommended to use it always.\\n */\\nlibrary SafeMathChainlink {\\n  /**\\n    * @dev Returns the addition of two unsigned integers, reverting on\\n    * overflow.\\n    *\\n    * Counterpart to Solidity\'s `+` operator.\\n    *\\n    * Requirements:\\n    * - Addition cannot overflow.\\n    */\\n  function add(uint256 a, uint256 b) internal pure returns (uint256) {\\n    uint256 c = a + b;\\n    require(c >= a, \\"SafeMath: addition overflow\\");\\n\\n    return c;\\n  }\\n\\n  /**\\n    * @dev Returns the subtraction of two unsigned integers, reverting on\\n    * overflow (when the result is negative).\\n    *\\n    * Counterpart to Solidity\'s `-` operator.\\n    *\\n    * Requirements:\\n    * - Subtraction cannot overflow.\\n    */\\n  function sub(uint256 a, uint256 b) internal pure returns (uint256) {\\n    require(b <= a, \\"SafeMath: subtraction overflow\\");\\n    uint256 c = a - b;\\n\\n    return c;\\n  }\\n\\n  /**\\n    * @dev Returns the multiplication of two unsigned integers, reverting on\\n    * overflow.\\n    *\\n    * Counterpart to Solidity\'s `*` operator.\\n    *\\n    * Requirements:\\n    * - Multiplication cannot overflow.\\n    */\\n  function mul(uint256 a, uint256 b) internal pure returns (uint256) {\\n    // Gas optimization: this is cheaper than requiring \'a\' not being zero, but the\\n    // benefit is lost if \'b\' is also tested.\\n    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522\\n    if (a == 0) {\\n      return 0;\\n    }\\n\\n    uint256 c = a * b;\\n    require(c / a == b, \\"SafeMath: multiplication overflow\\");\\n\\n    return c;\\n  }\\n\\n  /**\\n    * @dev Returns the integer division of two unsigned integers. Reverts on\\n    * division by zero. The result is rounded towards zero.\\n    *\\n    * Counterpart to Solidity\'s `/` operator. Note: this function uses a\\n    * `revert` opcode (which leaves remaining gas untouched) while Solidity\\n    * uses an invalid opcode to revert (consuming all remaining gas).\\n    *\\n    * Requirements:\\n    * - The divisor cannot be zero.\\n    */\\n  function div(uint256 a, uint256 b) internal pure returns (uint256) {\\n    // Solidity only automatically asserts when dividing by 0\\n    require(b > 0, \\"SafeMath: division by zero\\");\\n    uint256 c = a / b;\\n    // assert(a == b * c + a % b); // There is no case in which this doesn\'t hold\\n\\n    return c;\\n  }\\n\\n  /**\\n    * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),\\n    * Reverts when dividing by zero.\\n    *\\n    * Counterpart to Solidity\'s `%` operator. This function uses a `revert`\\n    * opcode (which leaves remaining gas untouched) while Solidity uses an\\n    * invalid opcode to revert (consuming all remaining gas).\\n    *\\n    * Requirements:\\n    * - The divisor cannot be zero.\\n    */\\n  function mod(uint256 a, uint256 b) internal pure returns (uint256) {\\n    require(b != 0, \\"SafeMath: modulo by zero\\");\\n    return a % b;\\n  }\\n}\\n","sourceMap":"621:2783:3:-:0;;132:2:-1;166:7;155:9;146:7;137:37;255:7;249:14;246:1;241:23;235:4;232:33;222:2;;269:9;222:2;293:9;290:1;283:20;323:4;314:7;306:22;347:7;338;331:24","sourcePath":"/home/breta/.brownie/packages/smartcontractkit/chainlink-brownie-contracts@0.2.2/contracts/src/v0.6/vendor/SafeMathChainlink.sol","type":"library"}')}}]);
//# sourceMappingURL=22.56d7a00d.chunk.js.map