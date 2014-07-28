"use strict";

var expect = require( "chai" ).expect,
    exec = require( "child_process" ).exec,
    get = require( "http" ).get;


describe( "grunt-contrib-connect", function(){

    describe( "shift-jis", function(){

        var server;

        before( function( done ){
            server = exec( "grunt connect:test_shift_jis:keepalive", function( err ){
                if( err ){ done( err ); }
            } );
            server.stdout.on( "data", function( data ){
                if( data.indexOf( "Started connect web server" ) >= 0 ){
                    done();
                }

                if( data.indexOf( "Fatal error" ) >= 0 ){
                    done( new Error( data ) );
                }
            } );
        } );

        after( function(){ server.kill(); } );

        it( ".html", function( done ){

            get( "http://localhost:8000/", function( res ){
                res.on( "data", function( chunk ){
                    expect( chunk.toString() ).to.contain( "テスト" );
                    done();
                } );
            } ).on( "error", done );
        } );
    } );
} );