'use strict';

//setting up the base app module to extend off
var app = angular.module('sketchDraftanddrawApp');

// Main controller for the controls
app.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Instanciating up the sketch canvas with specific values
    var color    = '#ffffff',
    radius       = 0,
    transparity  = '',
    stroke       = '',
    drawingSurfaceImageData = '',
    data = '',
    sketchCanvas = Sketch.create({
        container: document.getElementById( 'container' ),
        autoclear: false,

        setup: function() {
            console.log( 'setup' );
        },

        // update: function() {
        //     radius = 2 + abs( sin( this.millis * 0.003 ) * 50 );
        // },

        // Event handlers

        keydown: function() {
            if ( this.keys.C ) this.clear();
        },

        // Mouse & touch events are merged, so handling touch events by default
        // and powering sketches using the touches array is recommended for easy
        // scalability. If you only need to handle the mouse / desktop browsers,
        // use the 0th touch element and you get wider device support for free.
        touchmove: function() {

            for ( var i = this.touches.length - 1, touch; i >= 0; i-- ) {

                touch = this.touches[i];

                this.lineCap = 'round';
                this.lineJoin = 'round';
                this.fillStyle = this.strokeStyle = color;
                this.lineWidth = radius;

                this.beginPath();
                this.moveTo( touch.ox, touch.oy );
                this.lineTo( touch.x, touch.y );
                this.stroke();
            }
        }
    });
    // controls to be refactored, possibly a factory but have to look into scope issues
    $scope.controls = function(type, attr){
        if ( type == 'radius'){
            radius = attr;
        } else if ( type == 'color' ) {
            color = attr;
        } else if ( type == 'eraser' ) {
            transparity = sketchCanvas.globalCompositeOperation;
            stroke      = sketchCanvas.strokeStyle;
            sketchCanvas.globalCompositeOperation = "destination-out";
            sketchCanvas.strokeStyle = "rgba(0,0,0,1)";
        } else if ( type == 'pencil' ){
            sketchCanvas.globalCompositeOperation = transparity;
            sketchCanvas.strokeStyle = stroke;
        } else if ( type == 'save' ){
            drawingSurfaceImageData = sketchCanvas.getImageData(0, 0,
                             sketchCanvas.width,
                             sketchCanvas.height);
            data = sketchCanvas.canvas.toDataURL();
            window.open(data, "toDataURL() image", "width=700, height=900");
        } else if ( type == 'draw' ){
            sketchCanvas.putImageData(drawingSurfaceImageData, 0, 0);
        } else if ( type == 'clear' ){
            sketchCanvas.clearRect(0, 0, sketchCanvas.width, sketchCanvas.height);
        }
    }
});





// app.directive('')
