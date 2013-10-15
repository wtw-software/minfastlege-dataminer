var conf 								  = require( './conf' ),
		cheerio 	   					= require( 'cheerio' ),
		httpclient   					= require( './httpclient' ),
		parseHTMLForFastleger = require( './parseHTMLForFastleger' )


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

module.exports.getFastlegerForKommuneById = function( kommuneId, callback ) {
	httpclient.get( conf.url, {
		sok: "søk+etter+fastlege",
		fylke: fylkeId,
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

module.exports.getAllByFylkeId = function getAllByFylkeId( fylkeId, callback ) {
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
