/**
 * # Player type implementation of the game stages
 * Copyright(c) 2019 Alejandro Velasco <javier.velasco@urosario.edu.co>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var stepRules = ngc.stepRules;
var constants = ngc.constants;
var publishLevels = constants.publishLevels;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var game;

    stager.setOnInit(function() {

        // Initialize the client.

        var header, frame;

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();

        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header);

        // this.doneButton = node.widgets.append('DoneButton', header);

        this.contadorComunicacion = 1;
        this.contadorComunicacionMensajes = 1;
        this.contadorMensajes = 0;
        this.indiceMensaje = 0;
        var dict = {};
        this.puntajeAcumulado = dict;
        this.check = [];
        this.perrosPantalla = [];
        this.conteoInstrucciones = 0;
        this.idymensaje = [];
        this.countperros = 0;
        this.respuestasRonda = [];

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('instructions', {
        donebutton: false,
        frame: 'instructions.htm',
        cb: function(){
          var continuar = W.getElementById('continuar');
          continuar.onclick = function() {
            node.done();
          }
        }
    });

    stager.extendStep('tutorial_Training', {
        donebutton: false,
        frame: 'tutorial_training.htm',
        cb: function(){

          node.on.data('Settings', function(msg) {

            var MESSAGE = msg.data; //Datos enviados desde logic con informacion para la ronda
            var ronda = node.player.stage.round; //Ronda en curso

            node.game.puntajeAcumulado[ronda] = 0;
            // node.game.contadorComunicacion = 1;
            node.game.check = [];
            node.game.perrosPantalla = [];
            node.game.respuestasRonda = [];
            var selectPerro1 = W.getElementById('select1');
            var selectPerro2 = W.getElementById('select2');
            var selectPerro3 = W.getElementById('select3');
            var selectPerro4 = W.getElementById('select4');
            var selectPerro5 = W.getElementById('select5');

            var otroJugador = MESSAGE[0];
            var perros = MESSAGE[1];
            var claves = MESSAGE[2];
            var raza = MESSAGE[3];

      var revision;

      revision = function(){
              var choice1 = selectPerro1.selectedIndex;
              var choice2 = selectPerro2.selectedIndex;
              var choice3 = selectPerro3.selectedIndex;
              var choice4 = selectPerro4.selectedIndex;
              var choice5 = selectPerro5.selectedIndex;

              var ans1 = selectPerro1.options[choice1].value;
              var ans2 = selectPerro2.options[choice2].value;
              var ans3 = selectPerro3.options[choice3].value;
              var ans4 = selectPerro4.options[choice4].value;
              var ans5 = selectPerro5.options[choice5].value;

              var clasif = [ans1, ans2, ans3, ans4, ans5];
              node.game.respuestasRonda = clasif;

              var key1 = claves[perros[0]];
              var key2 = claves[perros[1]];
              var key3 = claves[perros[2]];
              var key4 = claves[perros[3]];
              var key5 = claves[perros[4]];


              var keys = [key1, key3, key3, key4, key5];

              if (ans1 == key1){
                node.game.check.push(1);
              } else {
                node.game.check.push(0);
              }
              if (ans2 == key2){
                node.game.check.push(1);
              } else {
                node.game.check.push(0);
              }
              if (ans3 == key3){
                node.game.check.push(1);
              } else {
                node.game.check.push(0);
              }
              if (ans4 == key4){
                node.game.check.push(1);
              } else {
                node.game.check.push(0);
              }
              if (ans5 == key5){
                node.game.check.push(1);
              } else {
                node.game.check.push(0);
              }
              // console.log('puntos', node.game.check);
              var sum = 0;
              for (var i=0; i < node.game.check.length; i++) {
                sum += node.game.check[i];
              }
              // var sum = node.game.check.reduce(function(a, b) { return a + b; }, 0);
              node.game.puntajeAcumulado[ronda] = sum;
              // console.log('puntos', sum);
              // console.log('LISTA: ', node.game.perrosMensajes);
      };

                  // carga las imágenes de los cinco perros

            var foto1 = 'Perro1';
            var foto2 = 'Perro2';
            var foto3 = 'Perro3';
            var foto4 = 'Perro4';
            var foto5 = 'Perro5';

            W.getElementById(foto1).src = 'carpetaTut/T1.jpg';
            W.getElementById(foto2).src = 'carpetaTut/T2.jpg';
            W.getElementById(foto3).src = 'carpetaTut/T3.jpg';
            W.getElementById(foto4).src = 'carpetaTut/T4.jpg';
            W.getElementById(foto5).src = 'carpetaTut/T5.jpg';

            for(var i =1; i<6; i++){
            	W.getElementById('opB'+i).style.display = "none";
            	W.getElementById('opD'+i).style.display = "none";
            }

            node.on('Solicitud', function(msg){
              if(msg == 'terminar'){
                revision();
                node.done();
              }
              if(msg == 'seguir'){
                W.getElementById('confirmarRonda').style.display = "none";
              }
              if(msg == 'cerrarTut1'){
                W.getElementById('Tutorial1').style.display = "none";
              }
            });

            var continuar;
            continuar = W.getElementById('continuar');
            continuar.onclick = function() {

              var choice1 = selectPerro1.selectedIndex;
              var choice2 = selectPerro2.selectedIndex;
              var choice3 = selectPerro3.selectedIndex;
              var choice4 = selectPerro4.selectedIndex;
              var choice5 = selectPerro5.selectedIndex;

              var inds = [choice1, choice2, choice3, choice4, choice5];
              var j = 0;
              for(var i = 0; i<inds.length; i++){
                if(inds[i] != 0){
                  j++;
                }
              }
              if(j == 5){
                W.setInnerHTML('inst', '¡Bien! Ahora puede presionar el botón "Confirmar" para pasar a la segunda parte del tutorial. Se abrirá un cuadro de diálogo en el que podrá confirmar si ya terminó su clasificación o si desea permanecer en la ronda.');
                W.getElementById('confirmarRonda').style.display = "block";
              }

            };

          });
        }
    });

    stager.extendStep('puntaje_training', {
      frame: 'puntaje_training.htm',
      cb: function(){

		  var foto1 = 'Perro1';
	    var foto2 = 'Perro2';
	    var foto3 = 'Perro3';
	    var foto4 = 'Perro4';
	    var foto5 = 'Perro5';

	    W.getElementById(foto1).src = 'carpetaTut/T1.jpg';
	    W.getElementById(foto2).src = 'carpetaTut/T2.jpg';
	    W.getElementById(foto3).src = 'carpetaTut/T3.jpg';
	    W.getElementById(foto4).src = 'carpetaTut/T4.jpg';
	    W.getElementById(foto5).src = 'carpetaTut/T5.jpg';

      W.getElementById('select1').options[0].innerHTML = node.game.respuestasRonda[0];
      W.getElementById('select2').options[0].innerHTML = node.game.respuestasRonda[1];
      W.getElementById('select3').options[0].innerHTML = node.game.respuestasRonda[2];
      W.getElementById('select4').options[0].innerHTML = node.game.respuestasRonda[3];
      W.getElementById('select5').options[0].innerHTML = node.game.respuestasRonda[4];

      var listo = W.getElementById('listo');
      listo.onclick = function() {
        W.getElementById('aviso1').style.display = "none";
      };

        var continuar = W.getElementById('continuar');
        continuar.onclick = function() {
          node.done();
        };
      }
    });

stager.extendStep('training', {
    donebutton: false,
    frame: 'training.htm',
    cb: function(){

      node.on.data('Settings', function(msg) {

        var MESSAGE = msg.data; //Datos enviados desde logic con informacion para la ronda
        var ronda = node.player.stage.round; //Ronda en curso

        node.game.puntajeAcumulado[ronda] = 0;
        // node.game.contadorComunicacion = 1;
        node.game.check = [];
        node.game.perrosPantalla = [];
        node.game.respuestasRonda = [];
        var selectPerro1 = W.getElementById('select1');
        var selectPerro2 = W.getElementById('select2');
        var selectPerro3 = W.getElementById('select3');
        var selectPerro4 = W.getElementById('select4');
        var selectPerro5 = W.getElementById('select5');

        var otroJugador = MESSAGE[0];
        var perros = MESSAGE[1];
        var claves = MESSAGE[2];
        var raza = MESSAGE[3];

        // console.log('Perros: ', perros);
        if (perros == 'terrier') {
          texto = 'Observe que los perros de raza C tienen orejas un poco más puntiagudas, el pelaje un poco más áspero, y suelen llevar la cola parada.';
        } else {
          texto = 'Observe que los perros de raza B tienen el pelaje de tonos más claro y parduzco, y su contextura es más gruesa tanto de cuerpo como de hocico.';
        }
        W.setInnerHTML('inst', texto);

  var revision;

  revision = function(){
    var choice1 = selectPerro1.selectedIndex;
          var choice2 = selectPerro2.selectedIndex;
          var choice3 = selectPerro3.selectedIndex;
          var choice4 = selectPerro4.selectedIndex;
          var choice5 = selectPerro5.selectedIndex;

          var ans1 = selectPerro1.options[choice1].value;
          var ans2 = selectPerro2.options[choice2].value;
          var ans3 = selectPerro3.options[choice3].value;
          var ans4 = selectPerro4.options[choice4].value;
          var ans5 = selectPerro5.options[choice5].value;

          var clasif = [ans1, ans2, ans3, ans4, ans5];
          node.game.respuestasRonda = clasif;
          console.log('Respuestas en game', node.game.respuestasRonda);

          var key1 = claves[perros[0]];
          var key2 = claves[perros[1]];
          var key3 = claves[perros[2]];
          var key4 = claves[perros[3]];
          var key5 = claves[perros[4]];

          for (var i = 0; i < 5; i++) {
            node.set({ParaK: [perros[i], clasif[i]]});
          }

          var keys = [key1, key2, key3, key4, key5];

          if (ans1 == key1){
            node.game.check.push(1);
          } else {
            node.game.check.push(0);
          }
          if (ans2 == key2){
            node.game.check.push(1);
          } else {
            node.game.check.push(0);
          }
          if (ans3 == key3){
            node.game.check.push(1);
          } else {
            node.game.check.push(0);
          }
          if (ans4 == key4){
            node.game.check.push(1);
          } else {
            node.game.check.push(0);
          }
          if (ans5 == key5){
            node.game.check.push(1);
          } else {
            node.game.check.push(0);
          }
          // console.log('puntos', node.game.check);
          var sum = 0;
          for (var i=0; i < node.game.check.length; i++) {
            sum += node.game.check[i];
          }
          // var sum = node.game.check.reduce(function(a, b) { return a + b; }, 0);
          node.game.puntajeAcumulado[ronda] = sum;
          // console.log('puntos', sum);
          // console.log('LISTA: ', node.game.perrosMensajes);
          node.set({Puntaje:[clasif, keys, sum]});
  };

        var crono = node.game.timer;
        var act = crono.hooks;
        act.push(revision);
        crono.update = 60000;

              // carga las imágenes de los cinco perros

        for(var i = 1; i < 6; i++){
          var foto = 'Perro' + i;
          var ubicacion = 'carpetaPerros/' + perros[i-1];
          node.game.perrosPantalla.push(ubicacion);
          W.getElementById(foto).src = ubicacion;
          if(raza == 'terrier'){
            W.getElementById('opB'+i).style.display = "none";
            W.getElementById('opD'+i).style.display = "none";
          }
          if(raza == 'hound'){
            W.getElementById('opA'+i).style.display = "none";
            W.getElementById('opC'+i).style.display = "none";
          }
        }

        node.on('Solicitud', function(msg){
          if(msg == 'terminar'){
            revision();
            node.done();
          }
          if(msg == 'seguir'){
            W.getElementById('confirmarRonda').style.display = "none";
          }
        });

        var continuar;
        continuar = W.getElementById('continuar');
        continuar.onclick = function() {
          W.getElementById('confirmarRonda').style.display = "block";
        };

      });
    }
});

stager.extendStep('puntaje', {
  frame: 'puntaje.htm',
  cb: function(){
    W.getElementById('select1').options[0].innerHTML = node.game.respuestasRonda[0];
    W.getElementById('select2').options[0].innerHTML = node.game.respuestasRonda[1];
    W.getElementById('select3').options[0].innerHTML = node.game.respuestasRonda[2];
    W.getElementById('select4').options[0].innerHTML = node.game.respuestasRonda[3];
    W.getElementById('select5').options[0].innerHTML = node.game.respuestasRonda[4];
    // W.getElementById('select1').options[0].innerHTML = "I'm a genius!";
    console.log('Respuestas en puntaje', node.game.respuestasRonda[i-1]);
    for(var i = 1; i < 6; i++){
      var foto = 'Perro' + i;
      var ubicacion = node.game.perrosPantalla[i-1];
      W.getElementById(foto).src = ubicacion;
    }
    for(var i = 1; i < 6; i++){
      if(node.game.check[i-1] == 1){
        console.log('right' + i);
        W.getElementById('right' + i).style.display = "block";
        W.setInnerHTML('resultado' + i, 'Acertó!');
      } else {
        console.log('wrong' + i);
        W.getElementById('wrong' + i).style.display = "block";
        W.setInnerHTML('resultado' + i, 'Falló!');
      }
    }
    var continuar = W.getElementById('continuar');
    continuar.onclick = function() {
      node.done();
    };
  }
});

stager.extendStep('end', {
    donebutton: false,
    frame: 'end.htm',
    cb: function() {
      node.on.data('Rondas', function(msg){
        var rand1 = msg.data[0];
        var rand2 = msg.data[1];
        var punt1 = node.game.puntajeAcumulado[rand1];
        var punt2 = node.game.puntajeAcumulado[rand2];

        W.setInnerHTML('randRonda1', rand1 - 20);
        W.setInnerHTML('r1', rand1 - 20);
        W.setInnerHTML('randRonda2', rand2 - 20);
        W.setInnerHTML('r2', rand2 - 20);

        W.setInnerHTML('correctPerros1', punt1);
        W.setInnerHTML('correctPerros2', punt2);

        var tot = 0;

        if (punt1 == 0){
            W.setInnerHTML('recompensa1', 0);
          }
          if (punt1 == 1){
            W.setInnerHTML('recompensa1', 1);
            tot += 1;
          }
          if (punt1 == 2){
            W.setInnerHTML('recompensa1', 2);
            tot += 2;
          }
          if (punt1 == 3){
            W.setInnerHTML('recompensa1', 4);
            tot += 4;
          }
          if (punt1 == 4){
            W.setInnerHTML('recompensa1', 7);
            tot += 7;
          }
          if (punt1 == 5){
            W.setInnerHTML('recompensa1', 10);
            tot += 10;
          }
          if (punt2 == 0){
              W.setInnerHTML('recompensa2', 0);
            }
          if (punt2 == 1){
            W.setInnerHTML('recompensa2', 1);
            tot += 1;
          }
          if (punt2 == 2){
            W.setInnerHTML('recompensa2', 2);
            tot += 2;
          }
          if (punt2 == 3){
            W.setInnerHTML('recompensa2', 4);
            tot += 4;
          }
          if (punt2 == 4){
            W.setInnerHTML('recompensa2', 7);
            tot += 7;
          }
          if (punt2 == 5){
            W.setInnerHTML('recompensa2', 10);
            tot += 10;
          }


            W.setInnerHTML('recompensaTotal', tot + 10);

            node.say('Recompensa', 'SERVER', tot + 10);

              node.game.visualTimer.setToZero();
        });
      }
});


    game = setup;
    game.plot = stager.getState();
    return game;
};
