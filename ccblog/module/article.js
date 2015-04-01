/**
 * Created by i on 2015/3/24.
 */
var mongoose=require('../db');
var Schema=mongoose.Schema;
var ObjectId=Schema.ObjectId;
var articeslSchema = new mongoose.Schema({
    userId:{type:ObjectId,ref:"User"},
    createTime:Object,
    title:String,
    content:String
});
var articleModel = mongoose.model('Article',articeslSchema);
function Article(article){
    this.userId=article.userId;
    this.title=article.title;
    this.content=article.content;
}
module.exports=Article;
//Article.get=function(conditions,callback){
//    articleModel.find(conditions,null,{sort:  {'_id' : -1 }}, function (err, docs) {
//        if (err) {
//            return callback(err);
//        }
//        console.log(docs[0].userId)
//        callback(null,docs);
//    });
//};
Article.pageQuery=function(query,pageInfo,callback){
    articleModel.count(query,function(err,count){
        if(err){
            return console.log(err);
        }
        console.log('文章条数：',count);
        var queryCursor=articleModel.find(query).sort({'_id':-1});
        if(pageInfo && pageInfo.pageNum){
            queryCursor.skip((pageInfo.pageNum-1)*pageInfo.pageSize).limit(pageInfo.pageSize);
        }
        queryCursor.populate('userId').exec(function (err,docs) {
            if(err){return callback(err)}
            callback(err,count,docs);
        })
    })
}

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
        userId:this.userId,
        createTime:time,
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
