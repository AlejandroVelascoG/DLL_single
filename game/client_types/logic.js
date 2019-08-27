/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2019 Alejandro Velasco <javier.velasco@urosario.edu.co>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var stepRules = ngc.stepRules;
var constants = ngc.constants;
var J = ngc.JSUS;
var counter = 0;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var node = gameRoom.node;
    var channel =  gameRoom.channel;

    // Must implement the stages here.

    // Increment counter.
    counter = counter ? ++counter : settings.SESSION_ID || 1;

    stager.setOnInit(function() {

      node.on.data('quiz-over', function(msg) {
          // Move client to part2.
          // (async so that it finishes all current step operations).
    });
});

    stager.extendStep('instructions', {
        cb: function() {
            console.log('Instructions.');
            node.game.p = Math.random();
        }
    });

    stager.extendStep('tutorial_Training', {
        cb: function() {
            console.log('tutorial_Training');
            entrenamiento(node.game.p);
        }
    });

    stager.extendStep('puntaje_training', {
        cb: function() {
            console.log('puntaje_training');
            entrenamiento(node.game.p);
        }
    });

    // stager.extendStep('tutorialGame', {
    //     cb: function() {
    //         console.log('tutorialGame');
    //         perros();
    //     }
    // });

    // stager.extendStep('tiempo', {
    // cb: function() {
    //     console.log('tiempo');
    //     }
    // });
    //
    // stager.extendStep('recompensa', {
    // cb: function() {
    //     console.log('recompensa');
    //     }
    // });

    // stager.extendStep('quiz', {
    //     cb: function() {
    //         console.log('Quiz');
    //     }
    // });

    // stager.extendStep('training', {
    //     cb: function() {
    //         console.log('Rondas');
    //     }
    // });

    stager.extendStep('training', {
        cb: function() {
            console.log('Training');
            entrenamiento(node.game.p);
        }
    });

    stager.extendStep('puntaje', {
        cb: function() {
            console.log('Score');
        }
    });

    // stager.extendStep('debrief', {
    //     cb: function() {
    //         console.log('Debrief');
    //     }
    // });

    stager.extendStep('end', {
        cb: function() {
            node.game.memory.save(channel.getGameDir() + 'data/data_' +
                                  node.nodename + '.json');
        }
    });

    stager.setOnGameOver(function() {

        // Something to do.

    });

    // Here we group together the definition of the game logic.
    return {
        nodename: 'lgc' + counter,
        // Extracts, and compacts the game plot that we defined above.
        plot: stager.getState(),

    };

    function entrenamiento(p) {
      var players = node.game.pl.id.getAllKeys();

      var as = [];
      var bs = [];
      var cs = [];
      var ds = [];
      var sendt = []
      var sendh = []
      var dict = {};

      for (var i=1; i < 17; i++) {
        as[i - 1] = 'A' + i + '.jpg';
      }

      for (var i=1; i < 17; i++) {
        bs[i - 1] = 'B' + i + '.jpg';
      }

      for (var i=1; i < 17; i++) {
        cs[i - 1] = 'C' + i + '.jpg';
      }

      for (var i=1; i < 17; i++) {
        ds[i - 1] = 'D' + i + '.jpg';
      }

      for(var i = 1; i < 17; i++){
        dict[as[i]] = "A";
      }

      for(var i = 1; i < 17; i++){
        dict[bs[i]] = "B";
      }

      for(var i = 1; i < 17; i++){
        dict[cs[i]] = "C";
      }

      for(var i = 1; i < 17; i++){
        dict[ds[i]] = "D";
      }

      var terrier = as.concat(cs);
      var hound = bs.concat(ds);

      terrier.sort(function(a, b){return 0.5 - Math.random()});
      hound.sort(function(a, b){return 0.5 - Math.random()});

      for(var i = 1; i < 6; i++){
        sendt.push(terrier[i]);
        sendh.push(hound[i]);
      }

      if(p < 0.5){
        node.say('Settings', players[0], [players[0], sendt, dict, 'terrier']);
      } else {
        node.say('Settings', players[0], [players[0], sendh, dict, 'hound']);
      }

    }

};
