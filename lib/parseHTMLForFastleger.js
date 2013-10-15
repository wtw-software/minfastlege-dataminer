
/**
 * Module dependencies.
 */

var cheerio = require( 'cheerio' )

/**
 * Clean a text, lowercase and remove special characters
 *
 * @private
 * @param {String} text
 * @return {String}
 */
function parseFieldText( text ) {
  text = text
         .toLowerCase()
         .match(/[a-z]+|[æøå]+/g)
         .join( '' )
  return text
}

/**
 * Parse a value
 *
 * @private
 * @param {String} text
 * @return {String|Boolean}
 */
function parseValueText( text ) {
  text = text.replace( /\t|\n/g, "" )
  if(!text) {
    return null
  }
  if( text.toLowerCase() == "ja" ) {
    return true
  }
  if( text.toLowerCase() == "nei" ) {
    return false
  }
  return text 
}

/**
 * Parse a html string for fastleger
 *
 * @public
 * @param {String} html
 * @return {Array}
 */
module.exports = function( html ) {
  var fastleger, $, $table, $thead, $tbody, trs, $tr, fieldIndex, fastlege, i, fieldname
  
  fastleger = []

  $ = cheerio.load( html )

  $table = $( '#fastlege' )
  $thead = $table.find( 'thead' )
  $tbody = $table.find( 'tbody' )


  fieldIndex = $thead
  .find( 'th' )
  .map(function() {
    return parseFieldText( $(this).text() )
  })

  var trs = $tbody.find( "tr" )

  fastleger = trs.map(function() {
    $tr = $( this )
    fastlege = {}

    for( i = 0; i < fieldIndex.length; i++ ) {
      fieldname = fieldIndex[ i ]
      fastlege[ fieldname ] = parseValueText( $($tr.children()[i]).text() )
    }

    return fastlege
  })

  return fastleger
}