import anime from 'animejs/lib/anime.es.js';

function pulse(element, cb = false) {

   anime({
      targets: element,
      scale: 1.09,
      duration: 300,
      elasticity: 0,
      complete: function () {

         if (cb) {
            cb();
         }

         anime({
            targets: element,
            scale: 1,
            duration: 800,
            elasticity: 800
         });

      }
   });

}

function slideInRight(element) {

   return anime({
      targets: element,
      translateX: ['100%', '0%'],
      duration: 210,
      easing: 'easeInOutQuad'
   });

}

function slideOutRight(element) {

   return anime({
      targets: element,
      translateX: ['0%', '110%'],
      duration: 210,
      easing: 'easeInOutQuad'
   });
}

export {
   pulse,
   slideInRight,
   slideOutRight
}