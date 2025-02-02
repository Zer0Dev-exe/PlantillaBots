const {model, Schema} = require('mongoose');

let ejemploSchema = new Schema({
    Ejemplo1: String,
    Ejemplo2: Number,
    Ejemplo3: Boolean,
    Ejemplo4: Array,
    Ejemplo5: Object
});

module.exports = model("ejemploData", ejemploSchema);