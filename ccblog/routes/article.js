/**
 * Created by i on 2015/3/29.
 */
var express=require('express');
var router=express.Router();
var Article=require('../module/article');
var settings=require('../settings');
var markdown=require('markdown');
var dateUtil=require('../util/dateUtil');


router.get('/tags/:tag',function(req,res,next){
    var tag=req.params.tag;
    Article.getTagArticles(tag,function(err,count,articles){
        if(err){
            return next(err);
        }
        var totalPage=Math.ceil(count/settings.pagesize);
        articles.forEach(function(articles){
            articles.content=markdown.parse(articles.content);
        });
        res.render('list',{
            pageNum:1,
            pageSize:0,
            totalPage:totalPage,
            title:tag+'相关文章',
            count:count,
            docs:articles,
            categoryJson:settings.categoryJson
        });
    })
})

router.get('/list/:pageNum?/:pageSize?',function(req,res,next){
    var pageNum=req.params.pageNum&&req.params.pageNum>0?req.params.pageNum:1;
    var pageSize=req.params.pageSize&&req.params.pageSize>0?req.params.pageSize:settings.pagesize;
    var query={};
    //var searchBtn=req.query.searchBtn;
    //if(searchBtn){
    //    req.session.keyword=req.query.keyword;
    //
    //}
    //if(req.session.keyword){
    //    var pattern=new RegExp(req.session.keyword,'i');
    //    query.title=pattern;
    //}
    var keyword=req.query.keyword;
    if(keyword){
        var pattern=new RegExp(keyword,'i');
        query.title=pattern;
    }

    Article.pageQuery(query,{pageNum:pageNum,pageSize:pageSize},function(err,count,docs){
        if(err){
            return next(err);
        }
        var totalPage=Math.ceil(count/settings.pagesize);
        docs.forEach(function(doc){
            doc.content=markdown.parse(doc.content);
        });
        if(keyword){
            res.render('search',{
                title:'搜索结果',
                totalPage:totalPage,
                pageNum:pageNum,
                pageSize:pageSize,
                docs:docs,
                keyword:keyword,
                categoryJson:settings.categoryJson

            });
        }else{
            res.render('list',{
                title:'文章列表',
                totalPage:totalPage,
                pageNum:pageNum,
                pageSize:pageSize,
                docs:docs,
                categoryJson:settings.categoryJson

            });
        }

    })

});
router.get('/category/:category/:pageNum?/:pageSize?',function(req,res,next){
    var category=req.params.category;
    console.log(category);
    var pageNum=req.params.pageNum&&req.params.pageNum>0?req.params.pageNum:1;
    var pageSize=req.params.pageSize&&req.params.pageSize>0?req.params.pageSize:settings.pagesize;
    Article.pageQuery({category:category},{pageNum:pageNum,pageSize:pageSize},function(err,count,docs){
        if(err){
            return next(err);
        }
        var totalPage=Math.ceil(count/settings.pagesize);
        docs.forEach(function(doc){
            doc.content=markdown.parse(doc.content);
        });
        res.render('list',{
            navActive:category,
            title:'文章列表',
            totalPage:totalPage,
            pageNum:pageNum,
            pageSize:pageSize,
            docs:docs,
            categoryJson:settings.categoryJson

        });
    })

});
router.get('/view/:articleId',function(req, res, next){
    var articleId=req.params.articleId;
    Article.findById(req.params.articleId,function(err,article){
        if(err){
            return next(err);
        }
        article.content=markdown.parse(article.content);
        res.render('view',{
            navActive:article.category,
            title:'文章详情',
            article:article,
            categoryJson:settings.categoryJson

        })
    })
});
router.get('/edit/:articleId',function(req,res,next){
    Article.findById(req.params.articleId,function(err,article){
        if(err){
            return next(err);
        }
        res.render('add',{
            title:'修改文章',
            cmd:'edit',
            article:article
        })
    })

});
router.post('/edit',function(req,res,next){
    var newArticle=new Article({
        category:req.body.category,
        content:req.body.content,
        title:req.body.title,
        updateTime:dateUtil.getTime()
    });
    newArticle.update(req.body._id,function(err,article){
        if(err){
            req.flash('err',err);
            return res.redirect('back');
        }
        req.flash('success',"更新成功");
        res.redirect('/article/view/'+req.body._id);
    })

});
router.get('/add', function(req, res, next) {

    res.render('add', {
        title: '发表文章',
        cmd:'add',
        article:{},
        navActive:'add'
    });
});
router.post('/add', function(req, res, next) {
    var user=req.session.user;
    var title=req.body.title;
    var content=req.body.content;
    var category=req.body.category;
    var tags=req.body.tags.replace(/，/g,',').split(',');
    var article=new Article({
        category:category,
        userId:user._id,
        title:title,
        content:content,
        tags:tags
    });
    article.save(function(err,article){
        if(err){
            req.flash('error','发表失败');
            return res.redirect('back');
        }
        res.redirect('/');
    });
});
router.get('/delete/:articleId',function(req,res,next){
    Article.deleteById(req.params.articleId,function(err){
        if(err){
            next(err);
            return res.redirect('back');
        }
        req.flash('success','删除文章成功');
        res.redirect('/');
    });
})
module.exports=router;