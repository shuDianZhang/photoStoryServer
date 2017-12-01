import { Article } from '../model/article/article.js'

export var postArticle = async (ctx) => {
    let title = ctx.request.body.title;
    let content = ctx.request.body.content;
    let user = ctx.session.user;
    let article = new Article({
        author: user,
        title: title,
        content: content
    });
    if (user) {
        article.save()
            .then(function (result) {
                ctx.body = {
                    status: 0,
                    msg: '文章发表成功!'
                }
                console.log('article:' + result.title + '....save success !');
            })
            .catch(function (err) {
                ctx.body = {
                    status: 2,
                    msg: '发布失败，错误代码：' + err
                }
                console.log('article insered fail , resones: ' + err);
            })
    } else {
        ctx.body = {
            status: 1,
            msg: '请先登录'
        }
    }
}

export var getArticleList = async (ctx) => {
    let user = ctx.session.user;
    let page = ctx.request.body.page;
    var articles = await Article.find({})
        .skip(page * 3)
        .limit(3)
        .sort({ '_id': -1 });
    ctx.body = {
        status: 0,
        content: articles
    }    
}