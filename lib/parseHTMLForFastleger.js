var cheerio = require( 'cheerio' )


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

function parseFieldText( text ) {
	text = text
				 .toLowerCase()
				 .match(/[a-z]+|[æøå]+/g)
				 .join( '' )
	return text
}

function parseValueText( text ) {
	text = text.replace( /\t|\n/g, "" )
	if( text.toLowerCase() == "ja" ) {
		return true
	}
	if( text.toLowerCase() == "nei" ) {
		return false
	}
	return text 
}