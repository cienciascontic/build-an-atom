// Copyright 2013-2017, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  var ToElementChallengeView = require( 'BUILD_AN_ATOM/game/view/ToElementChallengeView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {SchematicToElementChallenge} schematicToElementChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function SchematicToElementChallengeView( schematicToElementChallenge, layoutBounds, tandem ) {
    ToElementChallengeView.call( this, schematicToElementChallenge, layoutBounds, tandem ); // Call super constructor.

    // Create the model-view transform used by the schematic atom.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    var nonInteractiveSchematicNode = new NonInteractiveSchematicAtomNode(
      schematicToElementChallenge.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' )
    );
    this.challengePresentationNode.addChild( nonInteractiveSchematicNode );

    this.disposeSchematicToElementChallengeView = function(){
      nonInteractiveSchematicNode.dispose();
    };
  }

  buildAnAtom.register( 'SchematicToElementChallengeView', SchematicToElementChallengeView );

  // Inherit from ToElementChallengeView.
  return inherit( ToElementChallengeView, SchematicToElementChallengeView, {

    // @public
    dispose: function(){
      this.disposeSchematicToElementChallengeView();
      ToElementChallengeView.prototype.dispose.call(this);
    }
  } );
} );
