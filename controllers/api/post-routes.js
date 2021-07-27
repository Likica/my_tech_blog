const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/api/posts', withAuth, (req, res) => {

    Post.create({

        body: req.body,
        user_id: req.session.user_id
    })
        .then(newPost => res.json(newPost))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/api/post/:id:id', withAuth, (req, res) => {
    Post.update(
        {
            body: req.body
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(affectedRows => {
            if (!affectedRows) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/api/post/:id:id', withAuth, (req, res) => {
    // console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (!affectedRows) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;