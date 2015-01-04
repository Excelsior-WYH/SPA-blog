var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
    title: String,
    content: String,
    postDate: {type: Date, default: Date.now}
});

ArticleSchema.statics = {
    findAll: function (callback) {
        return this.find({}, callback);
    }
};

var ArticleModel= mongoose.model('Articles',ArticleSchema);
module.exports = ArticleModel;
