
/**
 * Module dependencies.
 */

var fylke = require( './fylke' ),
    async = require( 'async' )


/**
 * Get all fastleger
 *
 * @public
 * @param {Function} callback
 */
module.exports.getAll = function( callback ) {
  async.auto({

    "getFylker": fylke.getAll,

    "getFastleger": ["getFylker", function( callback, results ) {
      async.concat(results.getFylker, function( _fylke, callback ) {
        fylke.getFastlegerForFylkeById( _fylke.id, function( err, fastleger ){
          callback( err, fastleger )
        })
      }, callback )
    }]
    
  }, callback)  
}