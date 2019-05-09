angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope) {
//variables globales para el juego
  var iTiempoTranscurrido=iPuntosObtenidos=0, iTiempoLimite=70, objPrimero;
  var blnJuegoFinalizado=false;

  $(document).ready(function(){
    //establecer la cantidad de figuras distintas que tenemos
    //y cuantas veces debemos iterar para dibujar la cuadricula correctamente
    var strCuadros=[1,2,3,4,5,6], iRepeticiones=4;
    
    //evento al hacer clic en los items de la lista
    $('ul li').live('click',function(){
      if(!blnJuegoFinalizado && $(this).css('opacity')!=0){
        var strImagen='img/frutas/'+$(this).attr('rel')+'.png';
        if(objPrimero==undefined){
          objPrimero=$(this);
          objPrimero.stop(true,true).animate({opacity:.9}).css('background-image','url('+strImagen+')');
        }else{
          var objSegundo=$(this);
          objSegundo.stop(true,true).animate({opacity:.9}).css('background-image','url('+strImagen+')');
        
          //nos aseguramos que no se este clickeando sobre el mismo elemento
          if(objPrimero.index()!=objSegundo.index()){
            //el usuario encontro una pareja (los dos elementos coinciden)
            if(objPrimero.attr('rel')==objSegundo.attr('rel')){
              //aumentamos los puntos en 1
              iPuntosObtenidos++;
              //ocultamos la pareja para que no aparezca mas
              $(objPrimero).stop(true,true).animate({opacity: 1}).delay(700).animate({opacity: 0});
              $(objSegundo).stop(true,true).animate({opacity: 1}).delay(700).animate({opacity: 0});
              
              //finalizamos el juego porque ya encontro todas las parejas
              if(iPuntosObtenidos==$('ul li').length/2) $.fntFinalizarJuego();
            }else{
              //el usuario no encontro una pareja, no coinciden los elementos
              //borramos el contenido de los elementos seleccionados por el usuario
              $(objPrimero).stop(true,true).animate({opacity: 1},1000,function(){$(this).css('background-image','none');});
              $(objSegundo).stop(true,true).animate({opacity: 1},1000,function(){$(this).css('background-image','none');});
            }
          }else{
            //se esta clickeando sobre el mismo elemento, entonces le devolvemos su opacidad original
            $(this).stop(true,true).animate({opacity: 1},1000,function(){$(this).html('&nbsp;');});
          }
          //limpiamos la variable que contiene al primer elemento
          objPrimero=undefined;
        }
      }else{
        //el juego finalizo o el elemento clickeado ya fue descubierto
      }
    });
    
    //funcion para contar el tiempo
    $.fntTiempo=function(){
      if(!blnJuegoFinalizado){
        if(iTiempoTranscurrido>=iTiempoLimite){
          //finalizar el juego por tiempo
          $.fntFinalizarJuego();
        }else{
          //volvemos a llamar a esta funcion un segundo despues
          setTimeout('$.fntTiempo()',1000);
          //mostrar el estado del juego
          $('#divContador').find('p').html('<strong>Puntos obtenidos: </strong>'+iPuntosObtenidos+
          ' &bull; <strong>Tiempo restante: </strong>'+(iTiempoLimite-iTiempoTranscurrido)+' segundos');
          //aumentamos el contador de tiempo transcurido
          iTiempoTranscurrido++;
        }
      }
    };
    
    //funcion para finalizar el juego
    $.fntFinalizarJuego=function(){
      $('#divContenedor ul').html('');
      //finalizar el juego
      blnJuegoFinalizado=true;
      //mostrar el estado final
      $('#divContador').find('p').html('<strong>Puntos obtenidos: </strong>'+iPuntosObtenidos+
      ' &bull; <strong>Tiempo empleado: </strong>'+iTiempoTranscurrido+' segundos');
      //mostramos la capa inicial
      $('#divInicio').stop(true,true).fadeIn(1500,function(){
        $('ul li').stop(true,true).css('opacity',1).html('&nbsp;');
      });
    };
    
    //funcion para iniciar el juego
    $.fntIniciarJuego=function(){
      //mostramos el estado del juego
      $('#divContador').find('p').html('Cargando...');
      
      //creamos la cuadricula
      for(var iCont=0;iCont<iRepeticiones;iCont++){
        //desordenamos el array
        strCuadros=strCuadros.sort(function(){
          return Math.random() - 0.5
        });
        
        //agregamos los items a la lista (inicialmente vacios)
        for(var iCuadros=0;iCuadros<strCuadros.length;iCuadros++){
          $('#divContenedor ul').append('<li rel="'+strCuadros[iCuadros]+'">&nbsp;</li>');
        }
      }
      
      //reseteamos todas las variables globales
      iTiempoTranscurrido=iPuntosObtenidos=0, objPrimero=undefined;
      //ocultamos la capa inicial
      $('#divInicio').stop(true,true).fadeOut(1500,function(){
        //iniciamos el conteo de tiempo
        blnJuegoFinalizado=false;
        $.fntTiempo();
      });
    };
    
    //clic en el boton jugar
    $('#btnJugar').on('click',function(){
      //iniciamos el juego
      $.fntIniciarJuego();
    });
    
    $('#btnCreditos').on('click',function(){
      var objCapa=$('#divCreditos');
      
      if(objCapa.is(':visible')){
        objCapa.fadeOut();
      }else{
        objCapa.fadeIn();
      }
    });
  });


})



.controller('AccountCtrl', function($scope) {
  //cuando inicié el documento detecte el alto
  $(document).ready(function() {
    var alto = $( window ).height();
    //ajustar fondo
    $( ".fondoblanco" ).css({
      height: alto
    })
  });
})


.controller('infoCtrl',function($scope){
  //controlador 
  const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const { width, height } = canvas;
const xCenter = width / 2; // centre de l'écran en x
const yStart = 50; // positionde la première hélice en y
const xMax = 80; // largeur des helices
const yMax = 50; // espace entre les helices
let angle = 0;
const speed = 0.02; // vitesse de rotation
const tAnglePI = [
  0,
  Math.PI / 6,
  Math.PI / 3,
  Math.PI / 2,
  2 * Math.PI / 3,
  5 * Math.PI / 6,
  Math.PI,
  7 * Math.PI / 6,
  4 * Math.PI / 3,
  -Math.PI / 2,
  5 * Math.PI / 3,
  11 * Math.PI / 6,
];
const tPI = [...tAnglePI, ...tAnglePI];
function render() {
  ctx.clearRect(0, 0, width, height);
  const tPositions = [];
  for (let i = 0; i < tPI.length; i++) {
    const positions = adn(tPI[i], (i * yMax));
    tPositions.push(positions);
  }
  angle += speed;
  requestAnimationFrame(render);
}
/**
 *
 * @param {*} startPhase phase de début en x
 * @param {*} yPos position de l'helice en y
 */
function adn(startPhase, yPos, colorLink = '#FFFFFF') {
  const angleSin = Math.sin(angle + startPhase);
  const angleCos = Math.cos(angle + startPhase);
  const xPos1 = angleSin * xMax;
  const xPos2 = -angleSin * xMax;
  const yPos1 = angleCos * 10 + yPos;
  const yPos2 = -angleCos * 10 + yPos;
  // Création des liens entre les cercles
  ctx.beginPath();
  ctx.strokeStyle = colorLink;
  ctx.lineWidth = 3;
  ctx.moveTo(xPos1 + xCenter, yPos1 + yStart);
  ctx.lineTo(xPos2 + xCenter, yPos2 + yStart);
  ctx.stroke();
  // On fait passer le cercle le plus loin derrière
  if (angleCos < 0) {
    drawADN(xPos1, yPos1, angleCos, 11342935);
    drawADN(xPos2, yPos2, -angleCos, 1668818);
  } else {
    drawADN(xPos2, yPos2, -angleCos, 1668818);
    drawADN(xPos1, yPos1, angleCos, 11342935);
  }
  return {
    xPos1, yPos1, xPos2, yPos2,
  };
}
/**
 * @param {*} xAngle position en x du cercle
 * @param {*} yAngle position en y du cercle
 * @param {*} radius largeur du cercle
 * @param {*} color couleur du cercle
 */
function drawADN(xPos, yPos, radius, color) {
  ctx.fillStyle = `#${(color).toString(16)}`;
  ctx.beginPath();
  ctx.arc(
    xPos + xCenter,
    yPos + yStart,
    10 + (radius * 3),
    0,
    2 * Math.PI,
  );
  ctx.closePath();
  ctx.fill();
}

render();







});
