// Copyright 2002-2013, University of Colorado

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var NumberAtom = require( 'symbol/model/NumberAtom' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Button = require( 'SUN/Button' );
  var TabView = require( "JOIST/TabView" );
  var SymbolNode = require( "symbol/view/SymbolNode" );
  var BAAImages = require( "common/BAAImages" );
  var PeriodicTableNode = require( "buildanatom/view/PeriodicTableNode" );
  var AtomWithParticleStacks = require( "symbol/view/AtomWithParticleStacks" );
  var ParticleCountDisplay = require( "common/view/ParticleCountDisplay" );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function SymbolTabView( model ) {
    TabView.call( this ); // Call super constructor.

    // Add the node that shows the interactive symbol
    var symbolNode = new SymbolNode( model.numberAtom );
    this.addChild( symbolNode );

    // Add the scale image - just an image with no functionality.
    var scaleImage = new Image( BAAImages.getImage( "scale.svg" ) );
    scaleImage.scale( 0.25 ); // Scale empirically determined to match design layout.
    scaleImage.x = 0;
    scaleImage.y = 0;
    this.addChild( scaleImage );

    // Add the periodic table
    var periodicTable = new PeriodicTableNode( model.numberAtom );
    this.addChild( periodicTable );

    // Add the particle count display.
    var particleCountDisplay = new ParticleCountDisplay( model.numberAtom );
    this.addChild( particleCountDisplay );

    // Add the atom display.
    console.log( "periodicTableNode.maxX + 20 = " + periodicTable.right + 20 );
    var atomView = new AtomWithParticleStacks( model );
    this.addChild( atomView );

    // Add the reset button. TODO: i18n
    var resetButton = new Button( new Text( "Reset", { font: 'bold 16px Arial'} ),
                                  function() {
                                    model.reset();
                                  },
                                  {
                                    fill: 'orange',
                                    xMargin: 10,
                                    lineWidth: 1.5
                                  } );
    this.addChild( resetButton );

    // Do the layout.
    symbolNode.top = 10;
    periodicTable.left = 0;
    periodicTable.top = symbolNode.bottom;
    symbolNode.centerX = periodicTable.center.x;
    atomView.left = periodicTable.right + 40;
    atomView.top = symbolNode.top + 40;
    particleCountDisplay.left = atomView.left;
    particleCountDisplay.bottom = atomView.top - 10;

    // Keep the particle count indicator centered above the atom display.


    resetButton.center = new Vector2( atomView.centerX, atomView.bottom + 40 );

  }

  // Inherit from TabView.
  inherit( SymbolTabView, TabView );

  return SymbolTabView;
} );