// @author yomotsu
// MIT License

var img2matrix = function () {

  'use strict';

  return {
    fromImage: fromImage,
    fromUrl  : fromUrl
  }

  function fromImage ( image, width, depth, minHeight, maxHeight ) {

    width = width|0;
    depth = depth|0;

    var i, j;
    var matrix = [];
    var canvas = document.createElement( 'canvas' ),
        ctx = canvas.getContext( '2d' );
    var imgData, pixel, channels = 4;
    var heightRange = maxHeight - minHeight;
    var heightData;

    canvas.width  = width;
    canvas.height = depth;

    // document.body.appendChild( canvas );

    ctx.drawImage( image, 0, 0, width, depth );
    imgData = ctx.getImageData( 0, 0, width, depth ).data;

    for ( i = 0|0; i < depth; i = ( i + 1 )|0 ) { //row

      matrix.push( [] );

      for ( j = 0|0; j < width; j = ( j + 1 )|0 ) { //col

        pixel = i * depth + j;
        heightData = imgData[ pixel * channels ] / 255 * heightRange + minHeight;

        matrix[ i ].push( heightData );

      }

    }

    return matrix;
  
  }

  function fromUrl ( url, width, depth, minHeight, maxHeight ) {

    return function () {

      return new Promise( function( onFulfilled, onRejected ) {

        var image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = function () {

          var matrix = fromImage( image, width, depth, minHeight, maxHeight );
          onFulfilled( matrix );

        };

        image.src = url;

      } );

    }

  }

}();
