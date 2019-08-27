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
         .next('tutorial_training')
         .next('quiz')
         .repeat('prep', settings.TRAINING)
         .next('debrief')
         .next('end')
         .gameover();

     stager.extendStage('tutorial_training', {
       steps: [
         'tutorialTraining',
         'puntaje_training'
       ]
     });

     stager.extendStage('prep', {
          steps: [
            'training',
            'puntaje'
          ]
     });


     // Modify the stager to skip one stage.
     // stager.skip('bienvenida');
     // stager.skip('instructions');
      stager.skip('tutorial_training');
     //stager.skip('quiz');
     // stager.skip('prep');
     // stager.skip('debrief');
      stager.skip('end');



     return stager.getState();
 };
