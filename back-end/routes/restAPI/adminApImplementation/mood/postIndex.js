(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postOneMood = function(req, res, next) {
    console.log(req.body.postId);
    console.log(req.params);
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        var mood = node.Mood({
          postId: req.body.postId,
          userId: req.body.userId,
          mood: req.body.mood
        });

        return mood;
      }).then(function(mood, error) {
        mood.save(function(err) {
          node.mongoDB(node, node.config.dbName)
            .then(function() {
              node.ModeCount
                .findOne({}, function(error, count) {
                  if(count) {
                    var moodCount = node.MoodCount({
                      happy: 1,
                      sad: 1,
                      annoyed: 1,
                      inspired: 1,
                      afraid: 1
                    });
                    return moodCount;
                  } else {
                    console.log(count);
                  }
                });
            }).then(function(count, error) {
              console.log(count);
            });
        });
      });
  };
}());
