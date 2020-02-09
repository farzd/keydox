
const nodeAbi = require('node-abi')
 
//make sure to change version info with your version
console.log("electron:"+nodeAbi.getAbi('7.1.8', 'electron'));
console.log("node:"+nodeAbi.getAbi('12.13.0', 'node'));