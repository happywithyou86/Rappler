(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getOneMood = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;

    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Mood
          .find({postId:query.postId, userId: query.userId})
          .exec(result);

          function result(error, mood) {
            if(mood) { res.json('already voted a mood');}
            else { res.json('Not Yet Voted for a mood for this certain post');}
          }
      });
  };

  exports.getMoodCount = function(req, res, next) {
    var query = node.url.parse( req.url ,true).query;

    node.mongodDB(node, node.config.dbName)
      .then(function() {
        node.MoodCount
          .find({postId:query.postId})
          .exec(result);

          function result(error, mood) {
            res.json(mood);
          }
      });
  };

}());
