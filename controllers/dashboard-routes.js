const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            //allPosts handlebar
            res.render('all-posts', { posts, layout: 'dashboard' });
        })
        .catch(err => {
            console.log(err);
            res.redirect('login');
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id)
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render('edit-post', {
                    post,
                    layout: 'dashboard'
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.redirect('login');
        });
});

router.get('/new', withAuth, (req, res) => {
    res.render('newPost', {
        layout: 'dashboard'
    })
})
module.exports = router;