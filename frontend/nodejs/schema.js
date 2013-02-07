/** SCHEMA --------------------------------------------------*/
var mongoose       = require('mongoose')
    , util         = require('util')
    , crypto       = require('crypto')
    , Schema       = mongoose.Schema
    , ObjectId     = Schema.ObjectId

/*
var ReviewSchema = new Schema({
    _creator: {type:Schema.Types.ObjectId,ref:'User'}
    , url: {type: String, index: true}
    , name: {type: String,index: true}
    , created: Number
    , notes: [{type:Schema.Types.ObjectId,ref:'Note'}]
});

var NoteSchema   = new Schema({
    _creator: {type:Schema.Types.ObjectId,ref:'User'}
    , _review: {type:Schema.Types.ObjectId,ref:'Review'}
    , created: {type: Number, index: true}
    , note: String
    , x1: Number
    , y1: Number
    , height: Number
    , width: Number
});
*/

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

exports.ObjectId = ObjectId;
exports.User = mongoose.model('User',UserSchema);

mongoose.connect('mongodb://localhost/parkurban');
