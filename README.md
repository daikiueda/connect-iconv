connect-iconv [![Build Status](https://travis-ci.org/daikiueda/connect-iconv.svg?branch=master)](https://travis-ci.org/daikiueda/connect-iconv)
=============

[![NPM](https://nodei.co/npm/connect-iconv.png?compact=true)](https://nodei.co/npm/connect-iconv/)

Convert character encodings as connect middleware. 

## Install

```Bash
$ npm install connect-iconv
```

## Usage

### require( "connect-iconv" )( _options_ )

#### Arguments

* __options__ Object

  * ```encode``` String  
    default: "utf8"
  
  * ```fileTypes``` Array _(optional)_  
    default: [ "/", ".html", ".css", ".js", ".txt" ]

### for example : )

#### with "grunt-contrib-connect"

```JavaScript
module.exports = function( grunt ){
    grunt.initConfig( {
        connect: {
            livereload: {
                options: {
                    port: 8000,
                    hostname: "localhost"
                    base: "../htdocs",
                    middleware: function( connect, options, middlewares ){
                        middlewares.unshift( require( "connect-iconv" )( { encode: "shift_jis" } ) );
                        return middlewares;
                    }
                }
            }
        }
    } );
    grunt.loadNpmTasks( "grunt-contrib-connect" );
};
```
