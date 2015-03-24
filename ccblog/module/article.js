/**
 * Created by i on 2015/3/24.
 */
var mongoose=require('../db');
var articeslSchema = new mongoose.Schema({
    author:String,
    createTime:Date,
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
Article.prototype.save=function(callback){
    var date=new Date();

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
