var express = require('express');
var router = express.Router();
var Article=require('../module/article');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function(req, res, next) {
    if(!req.session.user){
        req.flash('error','请先登陆');
        return res.redirect('/');
    }
    res.render('add', { title: '发表文章' });
});
router.post('/add', function(req, res, next) {
    var author=req.session.user.username;
    var title=req.body.title;
    var content=req.body.content;
    var article=new Article({
        author:author,
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

module.exports = router;
