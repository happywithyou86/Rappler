(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getPostList = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query;
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find()
          .skip(query.skip)
          .limit(query.limit)
          .sort({date: 1})
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };

  exports.getOnePost = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query,
        id    = query.id.toString();
    console.log( id );
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .findById(node.ObjectId(id), callback);

          function callback( handleError , post ) {
            if( handleError ) next( handleError );
            res.status(200).send( post );
          }
      });
  };

  exports.getPostListApproved = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query;
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find({status: query.status})
          .skip(query.skip)
          .limit(query.limit)
          .sort({data: 1})
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };

  exports.getPostDepartmentList = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query;
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find({department: query.department})
          .skip(query.skip)
          .limit(query.limit)
          .sort({date: 1})
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };

  exports.getPostDepartmentListApproved = function( req, res, next ) {
    var query = node.url.parse( req.url ,true).query;
    node.mongoDB( node, node.config.dbName )
      .then(function() {
        node.Post
          .find({department: query.department, status: query.status})
          .skip(query.skip)
          .limit(query.limit)
          .sort({date: 1})
          .exec( documents );

          function documents( handleError , documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };
}());
