const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema(
  {
    vendor: {  
            type: Number ,
            default: 0
          },
    parking: {  
    type: Number ,
    default: 0
    },
    gaurd: {  
    type: Number ,
    default: 0
    },
    booking: {  
        type: Number ,
        default: 0
        },
        user: {  
            type: Number ,
            default: 0
            },
 
  
}
);

module.exports = mongoose.model("Code", codeSchema);
