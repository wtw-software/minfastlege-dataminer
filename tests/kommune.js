var expect = require( 'expect.js' ),
    kommune = require( '../lib/kommune' )

describe( "kommune", function(){

  describe( "kommune.getAllByFylkeId", function() {

    it("should provide an array with objects konsisiting of id and name", function( done ) {
    	this.timeout( 15000 )
      kommune.getAllByFylkeId("04", function( err, kommuner ) {
      	kommuner.forEach(function( kommune ){
      		expect( kommune["id"] ).not.to.be( undefined )
       		expect( kommune["navn"] ).not.to.be( undefined )
      	})
        done()
      })
    })

  })

})