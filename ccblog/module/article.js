/**
 * Created by i on 2015/3/24.
 */
var mongoose=require('../db');
var articeslSchema = new mongoose.Schema({
    author:String,
    createTime:Object,
    title:String,
    content:String
},{collection:'articles'});
var articleModel = mongoose.model('Article',articeslSchema);
function Article(article){
    this.author=article.author;
    this.title=article.title;
    this.content=article.content;
}
module.exports=Article;
Article.get=function(conditions,callback){
    articleModel.find(conditions, function (err, docs) {
        if (err) {
            return callback(err);
        }
        callback(null,docs);
    });
};
Article.prototype.save=function(callback){
    var date=new Date();
    var time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    var newArticle=new articleModel({
        author:this.author,
        createTime:date,
        title:this.title,
        content:this.content
    });
    newArticle.save(function(err,article){
        console.log(err+article);
        if(err){
            callback(err);
        }else{
            callback(null,article);
        }


    });
};
