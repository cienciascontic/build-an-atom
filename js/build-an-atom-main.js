// Copyright 2002-2013, University of Colorado
require(
  [
    'buildanatom/model/BuildAnAtomModel',
    'buildanatom/view/BuildAnAtomView',
    'game/model/GameModel',
    'game/view/GameTabView',
    'symbol/model/SymbolTabModel',
    'symbol/view/SymbolTabView',
    'SCENERY/nodes/Circle',
    'SCENERY/nodes/Rectangle' ,
    'SCENERY/nodes/Text' ,
    'JOIST/Sim',
    'JOIST/SimLauncher',
    'imageLoader'
  ],
  function( BuildAnAtomModel, BuildAnAtomView, GameModel, GameTabView, SymbolTabModel, SymbolTabView, Circle, Rectangle, Text, Sim, SimLauncher, imageLoader ) {
    "use strict";

    // TODO: Icons are temporary, will be replaced by screen shots or something later.
    var icon1 = new Rectangle( 0, 0, 50, 50, {fill: 'rgb(255, 254, 223)'} );
    icon1.addChild( new Circle( 10,
      {
        stroke: 'blue',
        lineWidth: 0.5,
        lineDash: [ 1, 1 ],
        translation: {x: 25, y: 25 }
      }
    ) );
    icon1.addChild( new Circle( 20,
      {
        stroke: 'blue',
        lineWidth: 0.5,
        lineDash: [ 1, 1 ],
        translation: {x: 25, y: 25 }
      }
    ) );

    var icon2 = new Rectangle( 0, 0, 50, 50, {fill: 'rgb(255, 254, 223)'} );
    icon2.addChild( new Rectangle( 0, 0, 30, 30,
      {
        stroke: 'black',
        lineWidth: 0.5,
        translation: {x: 10, y: 10 },
        fill: 'rgb( 255, 255, 255)'
      }
    ) );
    icon2.addChild( new Text( "H", {
      translation: { x: 17, y: 30 },
      font: "20px Arial"
    } ) );

    var icon3 = new Rectangle( 0, 0, 50, 50, {fill: 'rgb(255, 254, 223)'} );
    icon3.addChild( new Circle( 10,
                                {
                                  stroke: 'blue',
                                  lineWidth: 0.5,
                                  lineDash: [ 1, 1 ],
                                  translation: {x: 25, y: 25 }
                                }
    ) );
    icon3.addChild( new Circle( 20,
                                {
                                  stroke: 'blue',
                                  lineWidth: 0.5,
                                  lineDash: [ 1, 1 ],
                                  translation: {x: 25, y: 25 }
                                }
    ) );
    icon3.addChild( new Text( "?",
                              {
                                font: '40px Arial Bold',
                                fill: 'rgba(50, 50, 50, 20)',
                                centerX: 25,
                                centerY: 25
                              }));

    SimLauncher.launch( imageLoader, function() {

      //Create and start the sim
      //TODO: i18n
      new Sim( "Build an Atom", [
        { name: "Build an Atom",
          icon: icon1,
          backgroundColor: 'rgb(255, 254, 223)',
          createModel: function() {
            return new BuildAnAtomModel();
          },
          createView: function( model ) {
            return new BuildAnAtomView( model );
          }
        },
        { name: "Symbol",
          icon: icon2,
          backgroundColor: 'rgb(255, 254, 223)',
          createModel: function() {
            return new SymbolTabModel();
          },
          createView: function( model ) {
            return new SymbolTabView( model );
          }
        },
        { name: "Game",
          icon: icon3,
          backgroundColor: 'rgb(255, 254, 223)',
          createModel: function() {
            return new GameModel();
          },
          createView: function( model ) {
            return new GameTabView( model );
          }
        }
      ], { home: true, tab: 0, navigationBarInFront: true} ).start();
    } );

  } );
