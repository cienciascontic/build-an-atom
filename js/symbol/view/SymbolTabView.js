// Copyright 2002-2013, University of Colorado

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function ( require ) {
  "use strict";

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SymbolModel = require( 'symbol/model/SymbolModel' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Button = require( 'SUN/Button' );
  var TabView = require( "JOIST/TabView" );
  var SymbolNode = require( "symbol/view/SymbolNode" );

  // Size of the stage, in screen coordinates.  These values were obtained by
  // setting a Chrome window to 1024 x 768 and measuring the actual display region.
  var STAGE_SIZE = new Bounds2( 0, 0, 1010, 655 );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function SymbolTabView( model ) {

    var thisView = this;

    // Initialize the scene.
    var scene = new TabView();
    scene.layoutBounds = STAGE_SIZE;
    this.scene = scene;

    // Add the node that shows the interactive symbol
    scene.addChild( new SymbolNode( model ).mutate( { center: new Vector2( STAGE_SIZE.width / 2, STAGE_SIZE.height / 2)}) );

    // Add the reset button. TODO: i18n
    scene.addChild( new Button( new Text( "Reset", { font: 'bold 24px Arial'} ),
                                   function () {
                                     console.log( "Reset button pressed." );
                                     model.reset();
                                   },
                                   {
                                     fill: 'orange',
                                     xMargin: 10,
                                     lineWidth: 1.5
                                   } ).mutate( {center: new Vector2( 900, 650 )} ) );
  }

  return SymbolTabView;
} );