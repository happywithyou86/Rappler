(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.postOneMood = function(req, res, next) {
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        var mood = node.Mood({
          postId: req.body.postId,
          userId: req.body.userId,
          mood: req.body.mood
        });

        return mood;
      }).then(function(mood, error) {
        mood.save(function(error) {
          if(error) next(error);
          return 'save';
        });
      }).then(function(moodSave, error) {
        node.MoodCount.count({}, function(error, count) {
          if(count === 0) {
            console.log('count: ' + (count === 0));

              var moodCount = node.MoodCount({
                happy: 1,
                sad: 1,
                annoyed: 1,
                inspired: 1,
                afraid: 1
              });
              moodCount.save(function(error) {
                if(error) next(error);
                res.json('success');
              });
          } else {
            node.ModeCount
              .find({}, function(error, count) {
                console.log( 'else count: ' + count);
              });
          }
        });

            // if(node.ModeCount === undefined) {
            //   console.log('node ModeCount undefined');
            //   var moodCount = node.MoodCount({
            //     happy: 1,
            //     sad: 1,
            //     annoyed: 1,
            //     inspired: 1,
            //     afraid: 1
            //   });
            //   return moodCount;
            // } else {
            //   console.log('node ModeCount else');
            //   node.ModeCount
            //     .findOne({}, function(error, count) {
            //       console.log( 'else count: ' + count);
            //     });
            // }

      });
  };
}());
