var conf 								  = require( './conf' )
		cheerio 	   					= require( 'cheerio' ),
		httpclient   					= require( './httpclient' ),
		parseHTMLForFastleger = require( './parseHTMLForFastleger' )


function parseHTMLForfylker( html ) {
	var fylker, $, id, navn, fylke

	fylker = []
	$ = cheerio.load( html )
	
	$( "select[name='fylke'] option" ).each(function( index ) {
		id = $( this ).val()
		navn = $( this ).text()

		if( navn.toLowerCase().match("alle") ) {
			return null
		}

		fylke = {
			id: id,
			navn: navn
		}

		fylker.push( fylke )
	})

	return fylker
}


module.exports.getAll = function( callback ) {
	httpclient.get( conf.url, {}, 
	function( err, html ) {
		if( err ) {
			return callback( err )
		}
		var fylker = parseHTMLForfylker( html )
		callback( null, fylker )
	})
}

module.exports.getFastlegerForFylkeById = function( fylkeId, callback ) {
	httpclient.get( conf.url, {
		fylke: fylkeId,
		sok: "søk+etter+fastlege"
	},
	function( err, html ){
		if( err ) {
			return callback( err )
		}
		var fastleger = parseHTMLForFastleger( html )
		callback( null, fastleger )
	})
}