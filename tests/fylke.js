var expect 					= require( 'expect.js' ),
		fylke 					= require( '../lib/fylke' ),
		async 				  = require( 'async' )


// fylke.getAll(function( err, fylker ){
// 	fylker.forEach(function( _fylke ){

// 		fylke.getFastlegerForFylkeById(_fylke.id, function( err, fastleger ){
// 			console.log(fastleger )
// 		})

// 	})
// })


// describe( "fylke", function(){

// 	describe( "fylke.getAll", function() {

// 		it( "should provide an array with objects konsisiting of id and name", function( done ) {
// 			fylke.getAll( function( err, fylker ) {
// 				expect( fylker[0].id ).not.to.be( undefined )
// 				expect( fylker[0].navn ).not.to.be( undefined )
// 				done()
// 			})
// 		})

// 	})
	
// 	describe( "fylke.getFastleger", function() {

// 		it( "should provide and array of objects", function( done ) {
// 			this.timeout( 5000 )
// 			fylke.getFastlegerForFylkeById("02", function( err, fastLeger ) {
// 				expect( fastLeger[0]["fastlege"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["kjønn"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["praksisnavn"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["tilgj"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["adresse"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["poststed"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["gp"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["fl"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["antallinnbyggerepålisten"] ).not.to.be( undefined )
// 				expect( fastLeger[0]["ledig"] ).not.to.be( undefined )
// 				done()
// 			})	
// 		})

// 	})

// })