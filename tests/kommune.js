var expect = require( 'expect.js' ),
		kommune = require( '../lib/kommune' )

describe( "kommune", function(){

	describe( "kommune.getAllByFylkeId", function() {

		it("should provide an array with objects konsisiting of id and name", function( done ) {
			kommune.getAllByFylkeId("04", function( err, kommuner ) {
				console.log( kommuner)
				done()
			})
		})

	})

})