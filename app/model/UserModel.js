var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    user_name: String,
    password: String
});

UserSchema.statics = {
    fetch: function (callback) {
        return this.find({}, callback);
    }
}
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;