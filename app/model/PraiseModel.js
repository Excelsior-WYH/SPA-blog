var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var PraiseSchema = new Schema({
    articleID: String,
    userIP: String,
    praiseDate: {type: Date, default: Date.now}
});

PraiseSchema.statics = {
    findAll: function (callback) {
        return this.find({}, callback);
    }
};

var PraiseModel= mongoose.model('Praise', PraiseSchema);
module.exports = PraiseModel;
