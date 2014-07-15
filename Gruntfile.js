/*
 * 
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/
 */

"use strict";

module.exports = function( grunt ){

    grunt.initConfig( {
        connect: {
            livereload: {
                options: {
                    port: 8000,
                    hostname: "localhost",
                    base: "./htdocs",
                    livereload: true,

                    middleware: function( connect, options, middlewares ){
                        middlewares.unshift( require( "./connect-iconv.js" )( { encode: "shift_jis" } ) );
                        return middlewares;
                    }
                }
            }
        }
    } );

    grunt.loadNpmTasks( "grunt-contrib-connect" );

    grunt.registerTask( "default", [
        "connect::keepalive"
    ] );
};
