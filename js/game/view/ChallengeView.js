// Copyright 2013-2017, University of Colorado Boulder

/**
 * Base class for challenge views.  This type adds the titles, buttons, and such
 * and controls the visibility based on the state of the challenge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAChallengeState = require( 'BUILD_AN_ATOM/game/model/BAAChallengeState' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var Color = require( 'SCENERY/util/Color' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var GameAudioPlayer = require( 'VEGAS/GameAudioPlayer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );

  // strings
  var checkString = require( 'string!VEGAS/check' );
  var nextString = require( 'string!VEGAS/next' );
  var showAnswerString = require( 'string!VEGAS/showAnswer' );
  var tryAgainString = require( 'string!VEGAS/tryAgain' );

  // constants
  var BUTTON_FONT = new PhetFont( 20 );
  var BUTTON_FILL = new Color( 0, 255, 153 );
  var POINT_TEXT_OPTIONS = { font: new PhetFont( { size: 20, weight: 'bold' } ) };
  var BUTTON_MAX_WIDTH = 350;
  var BUTTON_TOUCH_AREA_DILATION = 8;

  /**
   * @param {BAAGameChallenge} challenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function ChallengeView( challenge, layoutBounds, tandem ) {
    Node.call( this ); // Call super constructor.
    var self = this;
    this.challenge = challenge;

    // Audio player used for audio feedback.
    this.gameAudioPlayer = new GameAudioPlayer( challenge.model.soundEnabledProperty );

    // Layout assumes that bounds start at (0,0), so verify that this is true.
    assert && assert( layoutBounds.minX === 0 && layoutBounds.minY === 0 );

    // Add the parent nodes where subclasses will add the challenge presentation
    // and the interactive controls.
    this.challengePresentationNode = new Node();
    this.addChild( this.challengePresentationNode );
    this.interactiveAnswerNode = new Node();
    this.addChild( this.interactiveAnswerNode );

    // Face node used to signal correct/incorrect answers.
    var faceNode = new FaceNode( layoutBounds.width * 0.4, { visible: false, opacity: 0.75 } );
    var pointDisplay = new Text( '+0', POINT_TEXT_OPTIONS );
    pointDisplay.centerX = 0;
    pointDisplay.top = faceNode.height / 2;
    faceNode.addChild( pointDisplay );
    this.addChild( faceNode );

    // Buttons.
    this.buttons = [];
    this.checkAnswerButton = new TextPushButton( checkString, {
      listener: function() { self.checkAnswer(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'checkAnswerButton' )
    } );
    this.addChild( this.checkAnswerButton );
    this.buttons.push( this.checkAnswerButton );

    this.nextButton = new TextPushButton( nextString, {
      listener: function() { challenge.next(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'nextButton' )
    } );
    this.addChild( this.nextButton );
    this.buttons.push( this.nextButton );

    this.tryAgainButton = new TextPushButton( tryAgainString, {
      listener: function() { challenge.tryAgain(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'tryAgainButton' )
    } );
    this.addChild( this.tryAgainButton );
    this.buttons.push( this.tryAgainButton );

    this.displayCorrectAnswerButton = new TextPushButton( showAnswerString, {
      listener: function() { challenge.displayCorrectAnswer(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'displayCorrectAnswerButton' )
    } );
    this.addChild( this.displayCorrectAnswerButton );
    this.buttons.push( this.displayCorrectAnswerButton );

    // Utility function to hide all buttons and the feedback face.
    var hideButtonsAndFace = function hideButtonsAndFace() {
      self.buttons.forEach( function( button ) {
        button.visible = false;
      } );
      faceNode.visible = false;
    };
    hideButtonsAndFace();

    // Utility function to enable/disable interaction with answer portion of
    // the displayed challenge.
    var setAnswerNodeInteractive = function( interactive ) {
      self.interactiveAnswerNode.pickable = interactive;
    };

    // Update the visibility of the various buttons and other nodes based on
    // the challenge state.
    // Set up the handlers that update the visibility of the various buttons and other nodes based on the challenge state.
    var stateChangeHandlers = {};
    stateChangeHandlers[ BAAChallengeState.PRESENTING_CHALLENGE ] = function() {
      self.clearAnswer();
      setAnswerNodeInteractive( true );
      self.checkAnswerButton.visible = true;
    };
    stateChangeHandlers[ BAAChallengeState.CHALLENGE_SOLVED_CORRECTLY ] = function() {
      setAnswerNodeInteractive( false );
      faceNode.smile();
      pointDisplay.text = '+' + challenge.pointValue;
      faceNode.visible = true;
      self.nextButton.visible = true;
      self.gameAudioPlayer.correctAnswer();
    };
    stateChangeHandlers[ BAAChallengeState.PRESENTING_TRY_AGAIN ] = function() {
      setAnswerNodeInteractive( false );
      faceNode.frown();
      pointDisplay.text = '';
      faceNode.visible = true;
      self.tryAgainButton.visible = true;
      self.gameAudioPlayer.wrongAnswer();
    };
    stateChangeHandlers[ BAAChallengeState.ATTEMPTS_EXHAUSTED ] = function() {
      setAnswerNodeInteractive( false );
      self.displayCorrectAnswerButton.visible = true;
      faceNode.frown();
      pointDisplay.text = '';
      faceNode.visible = true;
      self.gameAudioPlayer.wrongAnswer();
    };
    stateChangeHandlers[ BAAChallengeState.DISPLAYING_CORRECT_ANSWER ] = function() {
      setAnswerNodeInteractive( false );
      self.nextButton.visible = true;
      self.displayCorrectAnswer();
    };

    // Update the appearance of the challenge as the state changes.
    challenge.challengeStateProperty.link( function( challengeState ) {
      hideButtonsAndFace();
      // TODO: Is the check for undefined really needed
      if ( stateChangeHandlers[ challengeState ] !== undefined ) {
        stateChangeHandlers[ challengeState ]();
      }
    } );

    // Do an initial layout, but the subclasses can and should move the
    // buttons as needed.
    this.setButtonCenter( layoutBounds.width * 0.75, layoutBounds.height * 0.92 );
    faceNode.centerX = layoutBounds.width / 2;
    faceNode.centerY = layoutBounds.height / 2;
  }

  buildAnAtom.register( 'ChallengeView', ChallengeView );

  // Inherit from Node.
  return inherit( Node, ChallengeView, {

    /**
     * @public
     */
    dispose: function() {
      this.checkAnswerButton.dispose();
      this.nextButton.dispose();
      this.tryAgainButton.dispose();
      this.displayCorrectAnswerButton.dispose();
      Node.prototype.dispose.call( this );
    },

    // Function to clear the user's answer, generally used when
    // giving the user another chance to answer.  Must be implemented
    // in subclasses if any action is desired.

    /**
     * Function to clear the user's answer, generally used when giving the user another chance to answer.  Must be
     * implemented in subclasses if any action is desired.
     * @public
     */
    clearAnswer: function() {},

    /**
     * Function to display the correct answer.  Must be implemented in subclasses.
     * @public
     */
    displayCorrectAnswer: function() {},

    /**
     * Function to check the user's submitted answer.  Must be implemented in subclasses.
     * @public
     */
    checkAnswer: function() {},

    /**
     * Function to set the location of all buttons.
     * @param {number} x
     * @param {number} y
     * @public
     */
    setButtonCenter: function( x, y ) {
      this.buttons.forEach( function( button ) {
        button.centerX = x;
        button.centerY = y;
      } );
    }
  } );
} );
