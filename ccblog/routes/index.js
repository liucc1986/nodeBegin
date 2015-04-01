var express = require('express');
var router = express.Router();
var Article=require('../module/article');
var settings=require('../settings');
/* GET home page. */
//router.get('/', function(req, res, next) {
//    Article.get({},function(err,docs){
//        if(err){
//            return req.flash('error','查询失败');
//        }
//        res.render('index', {
//            title: '首页',
//            docs:docs
//        });
//    });
//
//});
router.get('/',function(req,res,next){
    Article.pageQuery({},{pageNum:1,pageSize:settings.pagesize},function(err,count,docs){
        if(err){
            return next(err);
        }
        var totalPage=Math.ceil(count/settings.pagesize);
        res.render('index',{
            title:'首页',
            totalPage:totalPage,
            pageNum:1,
            pageSize:1,
            docs:docs

        });

    });
});

module.exports = router;
