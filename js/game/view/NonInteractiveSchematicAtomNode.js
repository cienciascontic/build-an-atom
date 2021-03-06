// Copyright 2013-2017, University of Colorado Boulder

/**
 * A non-interactive representation of an atom where the individual sub-atomic particles are visible.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomNode = require( 'SHRED/view/AtomNode' );
  var AtomView = require( 'BUILD_AN_ATOM/common/view/AtomView' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Particle = require( 'SHRED/model/Particle' );
  var ParticleAtom = require( 'SHRED/model/ParticleAtom' );
  var ParticleView = require( 'SHRED/view/ParticleView' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {NumberAtom} numberAtom
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @constructor
   */
  function NonInteractiveSchematicAtomNode( numberAtom, modelViewTransform, tandem ) {
    Node.call( this, { pickable: false } ); // Call super constructor.

    // Add the electron shells.
    var particleAtom = new ParticleAtom( { tandem: tandem.createTandem( 'particleAtom' ) } );
    var atomNode = new AtomNode( particleAtom, modelViewTransform, {
      showElementNameProperty: new Property( false ),
      showNeutralOrIonProperty: new Property( false ),
      showStableOrUnstableProperty: new Property( false ),
      tandem: tandem.createTandem( 'atomNode' )
    } );
    this.addChild( atomNode );

    // Layer where the particles go.
    var particleLayer = new Node();
    this.addChild( particleLayer );

    // Utility function to create and add particles.
    var particleGroupTandem = tandem.createGroupTandem( 'particle' );
    var particleViewGroupTandem = tandem.createGroupTandem( 'particleView' );
    var particleViews = [];
    var modelParticles = []; // (phet-io) keep track for disposal
    var createAndAddParticles = function( particleType, number ) {
      _.times( number, function() {
        var particle = new Particle( particleType, {
          tandem: particleGroupTandem.createNextTandem(),
          maxZLayer: AtomView.NUM_NUCLEON_LAYERS - 1
        } );
        modelParticles.push( particle );
        particleAtom.addParticle( particle );
        var particleView = new ParticleView( particle, modelViewTransform, {
          tandem: particleViewGroupTandem.createNextTandem()
        } );
        particleLayer.addChild( particleView );
        particleViews.push( particleView );
      } );
    };

    // Create and add the individual particles.
    createAndAddParticles( 'proton', numberAtom.protonCountProperty.get() );
    createAndAddParticles( 'neutron', numberAtom.neutronCountProperty.get() );
    createAndAddParticles( 'electron', numberAtom.electronCountProperty.get() );
    particleAtom.moveAllParticlesToDestination();

    // Layer the particle views so that the nucleus looks good, with the
    // particles closer to the center being higher in the z-order.
    var particleViewsInNucleus = _.filter( particleLayer.children, function( particleView ) {
      return particleView.particle.destinationProperty.get().distance( particleAtom.positionProperty.get() ) < particleAtom.innerElectronShellRadius;
    } );

    if ( particleViewsInNucleus.length > 3 ) {
      particleViewsInNucleus = _.sortBy( particleViewsInNucleus, function( particleView ) {
        // Central nucleons should be in front
        return -particleView.particle.destinationProperty.get().distance( particleAtom.positionProperty.get() );
      } );
      particleViewsInNucleus.forEach( function( particleView ) {
        particleLayer.removeChild( particleView );
        particleLayer.addChild( particleView );
      } );
    }

    // @private called by dispose
    this.disposeNonInteractiveSchematicAtomNode = function() {
      particleViews.forEach( function( particleView ) {
        particleView.dispose();
      } );
      atomNode.dispose();
      particleAtom.dispose();
      particleLayer.children.forEach( function( particleView ) { particleView.dispose(); } );
      particleLayer.dispose();
      modelParticles.forEach( function( particle ) { particle.dispose(); } );
      modelParticles = [];
    };
  }

  buildAnAtom.register( 'NonInteractiveSchematicAtomNode', NonInteractiveSchematicAtomNode );

  // Inherit from Node.
  return inherit( Node, NonInteractiveSchematicAtomNode, {

    // @public
    dispose: function() {
      this.disposeNonInteractiveSchematicAtomNode();
      Node.prototype.dispose.call( this );
    }
  } );
} );
