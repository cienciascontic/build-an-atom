// Copyright 2013-2017, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var ToElementChallengeView = require( 'BUILD_AN_ATOM/game/view/ToElementChallengeView' );

  /**
   * @param {CountsToElementChallenge} countsToElementChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToElementChallengeView( countsToElementChallenge, layoutBounds, tandem ) {
    ToElementChallengeView.call( this, countsToElementChallenge, layoutBounds, tandem ); // Call super constructor.

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToElementChallenge.answerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.25;
    particleCountsNode.centerY = this.periodicTable.centerY;
  }

  buildAnAtom.register( 'CountsToElementChallengeView', CountsToElementChallengeView );

  // Inherit from ChallengeView.
  return inherit( ToElementChallengeView, CountsToElementChallengeView );
} );
