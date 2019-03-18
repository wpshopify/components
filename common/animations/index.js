import { useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

function pulse(element, cb = false, params = false) {

   anime({
      targets: element,
      scale: 1.09,
      duration: 300,
      elasticity: 0,
      complete: function () {

         if (cb && document.body.contains(element)) {
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

function slideInRight(element, cb = false, params = false) {

   return anime({
      targets: element,
      translateX: ['100%', '0%'],
      duration: 210,
      easing: 'easeInOutQuad',
      complete: function () {

         if (cb && document.body.contains(element)) {
            cb();
         }

      }
   });

}

function slideOutRight(element, cb = false, params = false) {

   return anime({
      targets: element,
      translateX: ['0%', '110%'],
      duration: 210,
      easing: 'easeInOutQuad',
      complete: function () {

         if (cb && document.body.contains(element)) {
            cb();
         }

      }
   });
}


function stagger(element, cb, { index }) {

   return anime({
      targets: element,
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: (index * 50),
      complete: function () {

         if (cb && document.body.contains(element)) {
            cb();
         }

      }
   });

}




function useAnime(animeType, elementExists = true) {

   const [currentlyAnimating, setCurrentlyAnimating] = useState(false);

   function animate(element, params = false) {

      if (currentlyAnimating) {
         return;
      }

      setCurrentlyAnimating(true);
      animeType(element, () => setCurrentlyAnimating(false), params);

   }

   return animate;

}







export {
   pulse,
   slideInRight,
   slideOutRight,
   stagger,
   useAnime
}