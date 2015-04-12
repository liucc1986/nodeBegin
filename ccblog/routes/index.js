var express = require('express');
var router = express.Router();
var Article=require('../module/article');
var settings=require('../settings');
var markdown=require('markdown');
/* GET home page. */
router.get('/',function(req,res,next){
    Article.pageQuery({},{pageNum:1,pageSize:settings.pagesize},function(err,count,docs){
        if(err){
            return next(err);
        }
        var totalPage=Math.ceil(count/settings.pagesize);
        docs.forEach(function(doc){
            doc.content=markdown.parse(doc.content);
        });
        res.render('index',{
            title:'首页',
            totalPage:totalPage,
            pageNum:1,
            pageSize:settings.pagesize,
            docs:docs,
            categoryJson:settings.categoryJson


        });

    });
});

module.exports = router;
