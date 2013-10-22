
/**
 * Module dependencies.
 */

var fylke   = require( './fylke' ),
    kommune = require( './kommune' ),
    async    = require( 'async' )

/**
 * fastlege object
 * @type Object
 */
module.exports = fastlege = {}

/**
 * Get all fastleger
 *
 * @public
 * @param {fastlegergetAllCallback} callback
 */
fastlege.getAll = function( callback ) {
  var fastLeger
  
  async.auto({

    "getFylker": fylke.getAll,

    "getFastleger": ["getFylker", function( callback, results ) {
      async.concat(results.getFylker, function( _fylke, callback ) {
        fylke.getFastlegerForFylkeById( _fylke.id, function( err, fastleger ){
          callback( err, fastleger )
        })
      }, callback )
    }]
    
  }, 
  function( err, results ) {
    if( err ) {
      return callback( err )
    }

    fastLeger = Array.isArray(results.getFastleger) ? results.getFastleger : []

    callback( null, fastLeger )
  })  
}

/**
 * Get all fastleger grouped on fylker containing kommuner container fastleger
 *
 * @public
 * @param {Function} callback
 */
fastlege.getAllGroupedByFylkeAndKommune = function( callback ) {
  var fylker

  async.auto({

    "getFylker": fylke.getAll,

    "getKommuner": ["getFylker", function( callback, results ) {
      async.each(results.getFylker, function( fylke, callback ){
        kommune.getAllByFylkeId( fylke.id, function( err, kommuner ) {
          if( err ) return callback( err )
          fylke.kommuner = kommuner
          callback( null)
        })
      }, callback)
    }],

    "getFastleger": ["getFylker", "getKommuner", function( callback, results ) {
      async.each(results.getFylker, function( _fylke, fylkeCallback ){
        async.each(_fylke.kommuner, function( _kommune, kommuneCallback ){
          kommune.getFastlegerForKommuneById(_kommune.id, function( err, fastLeger ) {
            if( err ) return callback( err )
            _kommune.fastLeger = fastLeger
            callback( null )
          })
        })
      }, callback)
    }]

  },
  function( err, results ) {
    if( err ) {
      return callback( err )
    }

    fylker = Array.isArray(results.getFylker) ? results.getFylker : []

    callback( null, fylker )
  })
}