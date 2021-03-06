const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Comment.create({
        body: req.body,
        user_id: req.session.user_id

    })
        .then(newPost => res.json(newPost))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});


module.exports = router;