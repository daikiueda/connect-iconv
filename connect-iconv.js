"use strict";

var iconv = require( "iconv-lite" );

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

        if( !pattern.test( req.url.replace( /\?.*$/, "" ) ) ){
            return next();
        }

        var write = res.write,
            end = res.end;

        res.convertedContent = "";
        
        res.write = function( string, encoding ){
            res.convertedContent += iconv.decode( new Buffer( string ), myEncoding );
            return true;
        };

        res.end = function( string, encoding ){
            res.setHeader( "content-length", Buffer.byteLength( res.convertedContent, encoding ) );
            return end.call( res, res.convertedContent, encoding );
        };
        
        next();
    }
};