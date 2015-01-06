var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
    title: String,
    content: String,
    postDate: {type: Date, default: Date.now},
    praiseCount: {type: Number, default: 0},
    praises: [
    	{type: ObjectId, ref: 'Praise'}
    ]
});

ArticleSchema.statics = {
    findAll: function (callback) {
        return this.find({}, callback);
    },
    findByID : function (id, callback){
        return this.findOne({_id: id}, callback);
    }
};

var ArticleModel= mongoose.model('Articles', ArticleSchema);
module.exports = ArticleModel;
