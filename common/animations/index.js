import { useState, useRef } from 'react'
import anime from 'animejs'

function pulse(element, cb = false, params = false) {
   anime({
      targets: element,
      scale: 1.09,
      duration: 300,
      elasticity: 0,
      complete: function() {
         if (cb && document.body.contains(element)) {
            cb()
         }

         anime({
            targets: element,
            scale: 1,
            duration: 800,
            elasticity: 800
         })
      }
   })
}

function slideInRight(element, cb = false, params = false) {
   console.log('slideInRight ...')

   return anime({
      targets: element,
      translateX: ['100%', '0%'],
      duration: 210,
      easing: 'easeInOutQuad',
      complete: function() {
         if (cb && document.body.contains(element)) {
            console.log('slideInRight complete')
            cb()
         }
      }
   })
}

function slideOutRight(element, cb = false, params = false) {
   console.log('slideOutRight ...')
   return anime({
      targets: element,
      translateX: ['0%', '110%'],
      duration: 210,
      easing: 'easeInOutQuad',
      complete: function() {
         if (cb && document.body.contains(element)) {
            cb()
         }
      }
   })
}

function stagger(elements, cb = false) {
   // return anime({
   //    targets: elements,
   //    translateY: ['-20px', '0px'],
   //    delay: anime.stagger(100),
   //    complete: function() {
   //       if (cb && elements) {
   //          cb()
   //       }
   //    }
   // })

   return anime({
      targets: elements,
      translateX: ['450px', '0px'],
      duration: 350,
      easing: 'easeOutQuart',
      delay: anime.stagger(100, { easing: 'linear' }),
      complete: function() {
         if (cb && elements) {
            cb()
         }
      }
   })
}

function useAnime(animeFn, elementExists = true) {
   const [currentlyAnimating, setCurrentlyAnimating] = useState(false)

   async function animate(element, params = false) {
      console.log('animating called ')

      if (currentlyAnimating) {
         console.log('currentlyAnimating')
         return
      }
      console.log('NOT currentlyAnimating')
      setCurrentlyAnimating(true)

      animeFn(element, () => setCurrentlyAnimating(false), params)
   }

   return animate
}

export { pulse, slideInRight, slideOutRight, stagger, useAnime }
