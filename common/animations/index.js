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



function stagger(element, index) {

   console.log('element .......', element);
   console.log('index', index);
   console.log('index * 50', index * 450);

   return anime({
      targets: element,
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: (index * 50) // increase delay by 100ms for each element.
   });

}


export {
   pulse,
   slideInRight,
   slideOutRight,
   stagger
}