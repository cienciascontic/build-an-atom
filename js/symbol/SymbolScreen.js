// Copyright 2017, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var BuildAnAtomModel = require( 'BUILD_AN_ATOM/common/model/BuildAnAtomModel' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var SymbolView = require( 'BUILD_AN_ATOM/symbol/view/SymbolView' );

  // strings
  var symbolString = require( 'string!BUILD_AN_ATOM/symbol' );

  // images
  var elementIcon = require( 'image!BUILD_AN_ATOM/element_icon.png' );
  var elementIconSmall = require( 'image!BUILD_AN_ATOM/element_icon_small.png' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function SymbolScreen( tandem ) {
    Screen.call(
      this,
      function() { return new BuildAnAtomModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new SymbolView( model, tandem.createTandem( 'view' ) ); },
      {
        name: symbolString,
        backgroundColorProperty: new Property( 'rgb( 242, 255, 204 )' ), /* Light yellow-green */
        homeScreenIcon: new Image( elementIcon ),
        navigationBarIcon: new Image( elementIconSmall ),
        tandem: tandem
      }
    );
  }

  buildAnAtom.register( 'SymbolScreen', SymbolScreen );

  return inherit( Screen, SymbolScreen );
} );