connect-iconv [![Build Status](https://travis-ci.org/daikiueda/connect-iconv.svg?branch=master)](https://travis-ci.org/daikiueda/connect-iconv)
=============

Convert character encodings as connect middleware. 

<h2 style="color:red;">DANGER!!</h2>

Does not work as your expect (>_<)

<!--

## Install

```Bash
$ npm install connect-iconv
```

## Usage

### require( "connect-iconv" )( _options_ )

#### Arguments

* __options__ Object

  * ```charset``` String  
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
                        middlewares.unshift( require( "connect-iconv" )( { charset: "shift_jis" } ) );
                        return middlewares;
                    }
                }
            }
        }
    } );
    grunt.loadNpmTasks( "grunt-contrib-connect" );
};
```
-->
