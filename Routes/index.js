var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var User = require('../models/users');
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Petal Palet - Curated Colour Palette Inspiration' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Petal Palet - Curated Colour Palette Inspiration' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Petal Palet - Curated Colour Palette Inspiration' });
});

router.get('/loginError', function(req, res, next) {
  res.render('loginError', { title: 'Petal Palet - Curated Colour Palette Inspiration' });
});


/* GET feed page. */
router.get('/feed', function(req, res, next) {

    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('feed');
        }
    }catch (err) {
            res.render('loginError');
        }
});



/**
 * Adds comments to our database
 */
router.post('/addComment', function(req, res, next) {
    // Extract the request body which contains the comments
    comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

/**
 * Returns all comments from our database
 */
router.get('/getComments', function(req, res, next) {

    Comment.find({}, function (err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
});

/**
  Updates a comment already in the database
 */
router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

/**
 * Deletes a comment from the database
 */
router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.remove({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the document"});
    });
});

/*
 Verifies a JWT
 */
function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}



module.exports = router;

