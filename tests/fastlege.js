var expect = require( 'expect.js' ),
    fastlege = require( '../lib/fastlege' )

describe( "fastlege", function() {

  describe( "fastlege.getAll", function() {

    it("should provide an array with objects", function( done ) {
      this.timeout( 15000 )
      fastlege.getAll(function( err, fastLeger ) {
      	fastLeger.slice( 0, 20 ).forEach(function( fastLege ){
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

  describe( "fastlege.getAllGroupedByFylkeAndKommune", function() {

    it("should return an array with fylkeobjects with populated kommuner with populated fastleger", function( done ) {
      this.timeout( 15000 )
      fastlege.getAllGroupedByFylkeAndKommune(function( err, fylker ){
        var fylkeNavn = fylker.map(function( fylke ) {
          return fylke.navn.toLowerCase()
        })
        var kommunenavn = fylker.map(function( fylke ) {
          return fylke.kommuner.map(function( kommune ) {
            return kommune.navn.toLowerCase()
          })
        }).reduce(function( prev, curr ) {
          return prev.concat( curr )
        }, [])

        var expectedFylker = [ "akershus", "telemark", "østfold" ]
        var expectedKommuner = ["asker", "kragerø", "oslo", "skien", "ås", "jølster", "vik", "bardu", "våler" ]

        expectedFylker.forEach(function( fylke ){
          expect( fylkeNavn.indexOf(fylke) ).not.to.be( -1 )  
        })

        expectedKommuner.forEach(function( kommune ){
          expect( kommunenavn.indexOf(kommune) ).not.to.be( -1 )  
        })

        done()
      })      
    })

  })

})