/*
 * Grunt live-reload with connect-iconv.
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/connect-iconv
 */

"use strict";

module.exports = function( grunt ){

    grunt.initConfig( {
        connect: {
            livereload: {
                options: {
                    port: 8000,
                    hostname: "localhost",
                    base: "../htdocs",
                    livereload: true,

                    middleware: function( connect, options, middlewares ){
                        middlewares.unshift( require( "./connect-iconv.js" )( { encode: "shift_jis" } ) );
                        return middlewares;
                    }
                }
            }
        },

        open: {
            main: {
                path: [
                    "http://<%= connect.livereload.options.hostname %>",
                    ":<%= connect.livereload.options.port %>"
                ].join( "" )
            }
        },

        watch: {
            options: {
                livereload: true
            },
            htdocs: {
                files: [ "../htdocs/**/*.*" ]
            }
        }
    } );

    grunt.loadNpmTasks( "grunt-contrib-connect" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-open" );

    grunt.registerTask( "default", [
        "connect",
        "open",
        "watch"
    ] );
};
