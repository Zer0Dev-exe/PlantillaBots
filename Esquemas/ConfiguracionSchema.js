const {model, Schema} = require('mongoose');

let configuracionSchema = new Schema({
    Developers: Array,
    StaffRoles: Array,
});

module.exports = model("configuracionData", configuracionSchema);