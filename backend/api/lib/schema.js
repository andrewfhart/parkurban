/**
 * ParkUrban API Server
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/
/** SCHEMA --------------------------------------------------*/
var mongoose       = require('mongoose')
    , util         = require('util')
    , crypto       = require('crypto')
    , Schema       = mongoose.Schema
    , ObjectId     = Schema.ObjectId
    
var InventorySchema = new Schema({
  name: String,
  description: String,
  status: String,
  address: String,
  city: String,
  state: String,
  zip: {type: String, index:true},
  loc: [Number,Number]
});

InventorySchema.index({'loc':'2d'});

var UserSchema = new Schema({
    mail: {type: String, index: true, unique: true}
    , password: String
    , salt: String
    , name: String
    , grhash: String
    /*, reviews: [ReviewSchema]*/
});

UserSchema.path('password').set(function (cleartext) {
    this.salt = this.makeSalt();
    return this.encryptPassword(cleartext);
});

// This isn't working at the moment, perhaps because the setter
// is being called first, which encrypts any password to a very
// long (longer than 8 characters) string
UserSchema.path('password').validate(function (value) {
  return (value.length > 8)
}, 'Password must be at least 8 characters in length');

UserSchema.methods.makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};

UserSchema.methods.encryptPassword = function (cleartext) {
    console.log('cleartext was...');
    console.log(util.inspect(cleartext));
    console.log('salt was...');
    console.log(util.inspect(this.salt));
    var encrypted = crypto.createHmac('sha1', this.salt)
        .update(cleartext).digest('hex');
    console.log(encrypted);
    return encrypted;
};

UserSchema.methods.authenticate = function (password) {
    return this.encryptPassword(password) === this.password;
};

exports.ObjectId  = ObjectId;
exports.User      = mongoose.model('User', UserSchema);
exports.Inventory = mongoose.model('Inventory', InventorySchema);

mongoose.connect('mongodb://localhost/parkurban');
