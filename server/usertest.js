require('dotenv').config();
const commonOp = require('./chainop/commonOp');

commonOp.getAllProducts('0x6435518a2c28099931812c698dd49bfae7638cedf2867a6d30f5357ce6f13f64').
then((data)=>{
    console.log(data);
}).
catch((e)=>{
   console.log(e);
})


