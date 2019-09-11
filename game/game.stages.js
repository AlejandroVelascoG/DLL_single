/**
 * # Game stages definition file
 * Copyright(c) 2019 Alejandro Velasco <javier.velasco@urosario.edu.co>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

 module.exports = function(stager, settings) {

     stager
       .next('bienvenida')
       .next('instructions')
       .next('tutorial')
       .next('quiz')
       .repeat('prep', settings.TRAINING)
       .repeat('trials', settings.REPEAT)
       .next('rating')
       .next('demograf')
       .next('end')
       .gameover();

     stager.extendStage('tutorial', {
       steps: [
         'tutorial_Training',
         'puntaje_training',
         'game_training',
         'tiempo',
         'recompensa'
       ]
     });

     stager.extendStage('prep', {
          steps: [
            'training',
            'puntaje'
          ]
     });

     stager.extendStage('trials', {
        steps: [
          'game',
          'puntaje'
        ]
     });

     // Modify the stager to skip one stage.
     // stager.skip('bienvenida');
     // stager.skip('instructions');
     //  stager.skip('tutorial');
     // stager.skip('quiz');
     // stager.skip('prep');
     // stager.skip('trials');
     // stager.skip('rating');
     // stager.skip('demograf');
      // stager.skip('end');



     return stager.getState();
 };
