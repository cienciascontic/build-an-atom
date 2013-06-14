// Copyright 2002-2013, University of Colorado

/**
 * Combination of a periodic table and an enlarged, dynamic, element symbol
 * sitting above the table.
 *
 */
define( function( require ) {
  "use strict";

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var PeriodicTableNode = require( 'common/view/PeriodicTableNode' );
  var AtomIdentifier = require( 'common/view/AtomIdentifier' );

  // Constants
  var SYMBOL_WIDTH_PROPORTION = 0.2;
  var SYMBOL_ASPECT_RATIO = 0.8; // Width/height.

  function PeriodicTableAndSymbol( numberAtom ) {

    Node.call( this ); // Call super constructor.

    // Create and add the periodic table.
    var periodicTable = new PeriodicTableNode( numberAtom, 0 );
    this.addChild( periodicTable );

    // Create and add the symbol, which only shows a bigger version of the selected element symbol.
    var symbolRectangle = new Rectangle( 0, 0, periodicTable.width * SYMBOL_WIDTH_PROPORTION, periodicTable.width * SYMBOL_WIDTH_PROPORTION / SYMBOL_ASPECT_RATIO,
                                         {
                                           fill: 'white',
                                           stroke: 'black',
                                           lineWidth: 2
                                         } );
    this.addChild( symbolRectangle );

    // Add the text that represents the chosen element.
    numberAtom.protonCountProperty.link( function( numProtons ) {
      symbolRectangle.removeAllChildren();
      var symbolText = new Text( AtomIdentifier.getSymbol( numberAtom.protonCount ),
                                 {
                                   font: "48px Tahoma bold"
                                 });
      symbolText.scale( Math.min( Math.min( symbolRectangle.width * 0.8 / symbolText.width, symbolRectangle.height * 0.8 / symbolText.height), 1 ) );
      symbolText.center = new Vector2( symbolRectangle.width / 2, symbolRectangle.height / 2 );
      symbolRectangle.addChild( symbolText );
    } );

    // Do the layout.  This positions the symbol to fit into the top portion of the table.
    symbolRectangle.centerX = (7.5 / 18 ) * periodicTable.width;
    symbolRectangle.top = 0;
    periodicTable.top = symbolRectangle.bottom - ( periodicTable.height / 7 * 2.5);
    periodicTable.left = 0;
  }

  // Inherit from Node.
  inherit( Node, PeriodicTableAndSymbol );

  return PeriodicTableAndSymbol;
} );