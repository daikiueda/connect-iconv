"use strict";

var parseURL = require( "url" ).parse,
    path = require( "path" ),
    iconv = require( "iconv-lite" );

/**
 * @param options
 *   @param {String} options.encode
 *   @param {Array} [options.fileTypes]
 * @returns {Function}
 */
module.exports = function( options ){

    options = options || {};
    
    var myEncoding = options.encode || "utf8",
        fileTypes = options.fileTypes || [ "/", ".html", ".css", ".js", ".txt" ],
        pattern = new RegExp( "(" + fileTypes.join( "|" ) + ")$" );
    
    return function( req, res, next ){

        if( !pattern.test( parseURL( req.url ).pathname ) ){
            return next();
        }

        var write = res.write,
            end = res.end;
        
        function restore(){
            res.write = write;
            res.end = end;
        }

        res.convertedContent = "";
        
        res.write = function( string, encoding ){
            res.convertedContent += iconv.decode( new Buffer( string ), myEncoding );
            return true;
        };

        res.end = function( string, encoding ){
            var contentString = ( res.convertedContent !== "" )? res.convertedContent: string;
            
            restore();
            res.setHeader( "content-length", Buffer.byteLength( contentString, encoding ) );
            return end.call( res, contentString, encoding );
        };
        
        next();
    }
};