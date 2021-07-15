 // Criação da tela
 var tela = document.querySelector('canvas');
 var pincel = tela.getContext('2d');

 pincel.fillStyle = 'lightgray';
 pincel.fillRect(0, 0, 600, 400);

 // Declaração de variáveis
 var raio = 10;
 var xAleatorio;
 var yAleatorio;
 var xAleatorio2;
 var yAleatorio2;
 var fase = false;
 var i = 0;
 var escolheuPausar = false;

 // Comandos para o botão do áudio
 var objAudio = document.getElementById('audio');
 objAudio.volume = 0.2;
 var objPlayPauseBTN = document.getElementById('playPauseBTN');

 var chave = false;

 objPlayPauseBTN.onclick = function () {
     if (chave == false) {
         chave = true;
         objAudio.play();
         objPlayPauseBTN.innerHTML = 'Parar música &#9208';
     } else {
         chave = false;
         objAudio.pause();
         audio.currentTime = 0;
         escolheuPausar = true;
         objPlayPauseBTN.innerHTML = 'Tocar música &#9658';
     }
 }

 // Comandos para a risada 
 var objRisada = document.getElementById('risada');
 var chaveRisada = false;

 // COMANDOS PARA O CRONÔMETRO
 var mm = 0;
 var ss = 0;
 var tempo = 1000; //Quantos milésimos valem 1 segundo?
 var cron;

 var chaveStarCrono = false;

 function startCrono() {
     if (chaveStarCrono == false) {
         cron = setInterval(() => {
             timer();
         }, tempo);
         chaveStarCrono = true;
     }
 }

 function pauseCrono() {
     clearInterval(cron);
 }

 function timer() {
     ss++; //Incrementa +1 na variável ss

     if (ss == 59) { //Verifica se deu 59 segundos
         ss = 0; //Volta os segundos para 0
         mm++; //Adiciona +1 na variável mm

         if (mm == 59) { //Verifica se deu 59 minutos
             mm = 0; //Volta os minutos para 0
         }
     }

     var format = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

     document.getElementById('counter').innerText = format;

     return format;
 }

 // Comandos para o marcador de fase 
 var objMarcadorFase = document.getElementById('marcadorFase');


 // Declarações de funções
 function desenhaCirculo(x, y, raio, cor) {

     pincel.fillStyle = cor;
     pincel.beginPath();
     pincel.arc(x, y, raio, 0, 2 * Math.PI);
     pincel.fill();

 }

 function limpaTela() {
     pincel.clearRect(0, 0, 600, 400);

 }

 function desenhaAlvo(x, y, cor) {
     desenhaCirculo(x, y, raio * 3, cor);
     desenhaCirculo(x, y, raio * 2, '#464646');
     desenhaCirculo(x, y, raio, cor);

 }

 function sorteiaPosicao(maximo) {
     return Math.floor(Math.random() * maximo);
 }

 function atualizaTela() {
     limpaTela();
     yAleatorio = sorteiaPosicao(400);
     xAleatorio = sorteiaPosicao(600);
     desenhaAlvo(xAleatorio, yAleatorio, '#e973f8');
     // cor antiga: #c531f6
 }

 function atualizaTela2() {
     yAleatorio2 = sorteiaPosicao(400);
     xAleatorio2 = sorteiaPosicao(600);
     desenhaAlvo(xAleatorio2, yAleatorio2, '#9120c2');
 }

 // NA HORA QUE CLICA NA TELA
 function dispara(evento) {
     var x = evento.pageX - tela.offsetLeft;
     var y = evento.pageY - tela.offsetTop;

     // Comando para o cronômetro começar ao clicar na tela
     startCrono();


     // Comandos para música de fundo 
     if (escolheuPausar == false) {
         chave = true;
         objAudio.play();
         objPlayPauseBTN.innerHTML = 'Parar música &#9208';
     }

     // Comandos para acertar o alvo 
     if ((x > xAleatorio - raio) &&
         (x < xAleatorio + raio) &&
         (y > yAleatorio - raio) &&
         (y < yAleatorio + raio)) {
         fase = true;

         objRisada.play();
         alert('*Boo');
         var jogo2 = setInterval(atualizaTela2, 100);

         if (fase = true) {
             if (i == 9) {
                 alert("ÚLTIMA FASE")
                 i++;
                 fase = false;
                 objMarcadorFase.innerHTML = 'Fase 10';
             } else {
                 if (i < 9) {
                     alert("FASE " + (i + 1));
                     i++;
                     fase = false;
                     objMarcadorFase.innerHTML = 'Fase ' + i;
                 } else {
                     i++;
                     fase = false;
                 }
             }


         }

         if (i == 11) {
             alert("Parabens!! Você terminou a última fase :)")
             raio = 0;
             limpaTela();
             clearInterval(jogo);
             clearInterval(jogo2);

             function desenhaTexto(texto, x, y) {
                 pincel.font = '44px Monaco';
                 pincel.fillStyle = 'black';
                 pincel.fillText(texto, x, y);
                 pincel.strokeStyle = 'violet';
                 pincel.strokeText(texto, x, y);
             }

             desenhaTexto("Muito brabo ;)", (canvas.width - 400), 200);
             pauseCrono();
             objMarcadorFase.innerHTML = 'Terminou em:';
         }
     }


 }

 tela.onclick = dispara;

 var jogo = setInterval(atualizaTela, 900);