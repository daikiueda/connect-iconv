/*
 * Grunt live-reload with connect-iconv ( and test server setting ).
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/connect-iconv
 */

"use strict";

module.exports = function( grunt ){

    grunt.initConfig( {
        connect: {
            options: {
                port: 8000,
                hostname: "localhost"
            },
            livereload: {
                options: {
                    base: "../htdocs",
                    livereload: true,
                    middleware: function( connect, options, middlewares ){
                        middlewares.unshift( require( "./connect-iconv.js" )( { charset: "shift_jis" } ) );
                        return middlewares;
                    }
                }
            },

            test_shift_jis: {
                options: {
                    base: "test/htdocs_shift_jis",
                    middleware: function( connect, options, middlewares ){
                        middlewares.unshift( require( "./connect-iconv.js" )( { charset: "shift_jis" } ) );
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
        "connect:livereload",
        "open:main",
        "watch"
    ] );
};
