var expect          = require( 'expect.js' ),
    fylke           = require( '../lib/fylke' ),
    async           = require( 'async' )


describe( "fylke", function(){

	describe( "fylke.getAll", function() {

		it( "should provide an array with objects konsisiting of id and name", function( done ) {
			this.timeout( 15000 )
			fylke.getAll( function( err, fylker ) {
				fylker.forEach(function( fylke ) {
					expect( fylke.id ).not.to.be( undefined )
					expect( fylke.navn ).not.to.be( undefined )
				})
				done()
			})
		})

	})

	describe( "fylke.getFastleger", function() {

		it( "should provide and array of objects", function( done ) {

			this.timeout( 15000 )

			fylke.getFastlegerForFylkeById("02", function( err, fastLeger ) {
				fastLeger.forEach(function( fastLege ){
     			expect( fastLege["fastlege"] ).not.to.be( undefined )
					expect( fastLege["kjønn"] ).not.to.be( undefined )
					expect( fastLege["praksisnavn"] ).not.to.be( undefined )
					expect( fastLege["tilgj"] ).not.to.be( undefined )
					expect( fastLege["adresse"] ).not.to.be( undefined )
					expect( fastLege["poststed"] ).not.to.be( undefined )
					expect( fastLege["gp"] ).not.to.be( undefined )
					expect( fastLege["fl"] ).not.to.be( undefined )
					expect( fastLege["antallinnbyggerepålisten"] ).not.to.be( undefined )
					expect( fastLege["ledig"] ).not.to.be( undefined )
     		})

				done()
			})  
		})

	})

})