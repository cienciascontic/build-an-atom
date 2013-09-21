// Copyright 2002-2013, University of Colorado Boulder

// RequireJS configuration file for Build an Atom.
require.config(
  {
    deps: ['build-an-atom-main'],

    paths: {

      // third-party libs
      i18n: '../../sherpa/i18n-2.0.4',

      // PhET libs, uppercase names to identify them in require.js imports
      ASSERT: '../../assert/js',
      AXON: '../../axon/js',
      DOT: '../../dot/js',
      JOIST: '../../joist/js',
      KITE: '../../kite/js',
      PHETCOMMON: '../../phetcommon/js',
      PHET_CORE: '../../phet-core/js',
      SCENERY: '../../scenery/js',
      SCENERY_PHET: '../../scenery-phet/js',
      SUN: '../../sun/js',
      VIBE: '../../vibe/js'
    },

    urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts

  } );
