(function(){
  function start(){
    var tiles=[].slice.call(document.querySelectorAll('.tr-tile'));
    if(!tiles.length){ return setTimeout(start,150); }
    var DIM_B=0.52, MAX_B=1.12, SIGMA=180, PERIOD=5200;
    function frame(now){
      var vw=window.innerWidth;
      var span=vw+520;
      var t=(now%PERIOD)/PERIOD;
      var sweepX=(-260)+t*span;
      for(var i=0;i<tiles.length;i++){
        var r=tiles[i].getBoundingClientRect();
        if(r.right < -100 || r.left > vw+100){ continue; }
        var cx=r.left+r.width/2;
        var d=cx-sweepX;
        var g=Math.exp(-(d*d)/(2*SIGMA*SIGMA));
        var b=DIM_B+(MAX_B-DIM_B)*g;
        var sat=0.75+0.3*g, con=1.05+0.05*g;
        tiles[i].style.filter='brightness('+b.toFixed(3)+') saturate('+sat.toFixed(3)+') contrast('+con.toFixed(3)+')';
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if(document.readyState!=='loading'){ start(); } else { document.addEventListener('DOMContentLoaded',start); }
})();
