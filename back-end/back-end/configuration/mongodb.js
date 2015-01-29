(function() {
  'use strict';

  module.exports = function(node, dbName) {
    if (node.mongoose.connection.readyState !== 1) {
      console.log( process.env.MONGOLAB_URI );
      var db = node.Promise.all([node.mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/' + dbName)]);
      return db;
    } else {
      return node.Promise.all([node.mongoose]);
    }
  };

}());
