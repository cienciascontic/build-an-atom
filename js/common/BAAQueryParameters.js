// Copyright 2016-2017, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  var BAAQueryParameters = QueryStringMachine.getAll( {

    // shows the game reward regardless of score
    reward: { type: 'flag' },

    challengesPerLevel: {
      type: 'number',
      defaultValue: 5
    }
  } );

  buildAnAtom.register('BAAQueryParameters', BAAQueryParameters);

  return BAAQueryParameters;
} );