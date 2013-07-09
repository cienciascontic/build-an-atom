// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that represents the electron shell in an atom as a "cloud" that grows
 * and shrinks depending on the number of electrons that it contains.  This
 * has also been referred to as the "Schroedinger model" representation.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  var ElectronCloudView = function ElectronCloudView( atom, mvt ) {

    // Call super constructor.
    Node.call( this );

    var electronCloud = new Circle( mvt.modelToViewDeltaX( atom.outerElectronShellRadius ),
                                    {
                                      fill: 'pink',
                                      translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                    }
    );
    this.addChild( electronCloud );

    // Function that updates the size of the cloud based on the number of electrons.
    var updateElectronCloud = function( numElectrons ) {
      if ( numElectrons === 0 ) {
        electronCloud.radius = 1E-5; // Arbitrary non-zero value.
        electronCloud.fill = 'transparent'
      }
      else {
        var radius = mvt.modelToViewDeltaX( atom.outerElectronShellRadius ) * ( numElectrons / 10 ); // TODO: Divisor should be max electrons, pull from a constant somewhere.;
        electronCloud.radius = radius;
        electronCloud.fill = new RadialGradient( 0, 0, 0, 0, 0, radius )
          .addColorStop( 0, 'blue' )
          .addColorStop( 1, 'rgba( 0, 0, 255, 0 )' );
      }
    };
    updateElectronCloud( atom.electrons.length );

    // Update the cloud as electrons come and go.
    atom.electrons.addListener( function( added, removed, resultingArray ) {
      updateElectronCloud( resultingArray.length );
    } );
  };

  // Inherit from Node.
  inherit( Node, ElectronCloudView );

  return ElectronCloudView;
} );