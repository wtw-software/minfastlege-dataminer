var Buffer       = require( 'buffer' ).Buffer,
		hyperquest   = require( 'hyperquest' ),
		querystring  = require( 'querystring' )


function bufferToUTF8( buffer ) {
	return buffer.toString( 'utf8' )
}

function streamBuffer( stream ) {
	var buffer

	buffer = []
	stream.on( 'data', function( data ) {
		buffer.push( data )
	})

	return buffer
}

module.exports.get = function( url, params, callback ) {
	var url, query, req, data, converter, kommuner, id, navn
	
	url = url + "?" + querystring.stringify( params )

	req = hyperquest.get( url )
	
	req.setHeader( "Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" )
	req.setHeader( "Accept-Language", "no,en-US;q=0.8,en;q=0.6" )
	req.setHeader( "Cache-Control", "private" )
	req.setHeader( "User-Agent", "Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1" )

	req.on( 'response', function( response ){
		response.setEncoding( 'binary' )
	})

	data = streamBuffer( req )

	req.on( 'end', function() {
		data = data.map( bufferToUTF8 )
							 .join( '' )
		callback( null, data )
	})
}