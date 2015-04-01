/**
 * Created by i on 2015/3/29.
 */
var express=require('express');
var router=express.Router();
var Article=require('../module/article');
var settings=require('../settings');
router.get('/list/:pageNum/:pageSize',function(req,res,next){
    var pageNum=req.params.pageNum&&req.params.pageNum>0?req.params.pageNum:1;
    var pageSize=req.params.pageSize&&req.params.pageSize>0?req.params.pageSize:1;
    Article.pageQuery({},{pageNum:pageNum,pageSize:pageSize},function(err,count,docs){
        if(err){
            return next(err);
        }
        var totalPage=Math.ceil(count/settings.pagesize);
        res.render('index',{
            title:'文章列表',
            totalPage:totalPage,
            pageNum:pageNum,
            pageSize:pageSize,
            docs:docs

        });
    })

})
router.get('/add', function(req, res, next) {

    res.render('add', { title: '发表文章' });
});
router.post('/add', function(req, res, next) {
    var user=req.session.user;
    var title=req.body.title;
    var content=req.body.content;
    var article=new Article({
        userId:user._id,
        title:title,
        content:content
    });
    article.save(function(err,article){
        if(err){
            req.flash('error','发表失败');
            return res.redirect('back');
        }
        res.redirect('/');
    });
});
module.exports=router;