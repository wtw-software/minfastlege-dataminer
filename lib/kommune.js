
/**
 * Module dependencies.
 */

var conf                  = require( './conf' ),
    cheerio               = require( 'cheerio' ),
    httpclient            = require( './httpclient' ),
    parseHTMLForFastleger = require( './parseHTMLForFastleger' )


/**
 * kommune object
 * @type Object
 */
module.exports = kommune = {}

/**
 * Parse html for kommuner, returning array of
 * kommune objects
 *
 * @param {String} html
 * @return {Array}
 * @private
 */
function parseHTMLForKommuner( html ) {
  var kommuner, $, id, navn

  kommuner = []
  $ = cheerio.load( html )
  
  $( "select[name='kommune'] option" ).each(function( index ) {
    id = $( this ).val()
    navn = $( this ).text()

    if( navn.toLowerCase().match("alle") ) {
      return null
    }

    kommuner.push({ id: id, navn: navn })
  })

  return kommuner
}

/**
 * Get all fastleger for a kommune by its id
 *
 * @public
 * @param {String|Number} kommuneId
 * @param {Function} callback
 */
kommune.getFastlegerForKommuneById = function( kommuneId, callback ) {
  httpclient.get( conf.url, {
    sok: "søk+etter+fastlege",
    kommune: kommuneId,
  },
  function( err, html ){
    if( err ) {
      return callback( err )
    }
    var fastleger = parseHTMLForFastleger( html )
    callback( null, fastleger )
  })
}

/**
 * Get all kommuner for a fylke by its id
 *
 * @public
 * @param {String|Number} fylkeId
 * @param {Function} callback
 */
kommune.getAllByFylkeId = function getAllByFylkeId( fylkeId, callback ) {
  httpclient.get( conf.url, {
    sok: "søk+etter+fastlege",
    fylke: fylkeId,
    sort: true
  },
  function( err, html ){
    if( err ) {
      return callback( err )
    }
    var kommuner = parseHTMLForKommuner( html )
    callback( null, kommuner )
  })
}
