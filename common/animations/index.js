import { useRef } from 'react'
import anime from 'animejs'

function pulse(element, cb = false, currentlyAnimating) {
   if (currentlyAnimating) {
      return
   }

   cb(true)

   anime({
      targets: element,
      scale: 1.09,
      duration: 300,
      elasticity: 0,
      complete: function() {
         anime({
            targets: element,
            scale: 1,
            duration: 500,
            elasticity: 800,
            complete: function() {
               if (cb && document.body.contains(element)) {
                  cb(false)
               }
            }
         })
      }
   })
}

function slideInRight(element, cb = false, currentlyAnimating) {
   if (currentlyAnimating) {
      return
   }

   cb(true)

   return anime({
      targets: element,
      translateX: ['100%', '0%'],
      duration: 210,
      easing: 'easeInOutQuad',
      complete: function() {
         if (cb && document.body.contains(element)) {
            cb(false)
         }
      }
   })
}

function slideOutRight(element, cb = false, currentlyAnimating) {
   if (currentlyAnimating) {
      return
   }

   cb(true)

   return anime({
      targets: element,
      translateX: ['0%', '110%'],
      duration: 210,
      easing: 'easeInOutQuad',
      complete: function() {
         if (cb && document.body.contains(element)) {
            cb(false)
         }
      }
   })
}

function animeStagger(elements, completeFn = false) {
   return anime({
      targets: elements,
      translateX: ['450px', '0px'],
      duration: 350,
      easing: 'easeOutQuart',
      delay: anime.stagger(100, { start: 150 }),
      complete: completeFn
   })
}

function animeStaggerFadeIn(elements, completeFn = false) {
   return anime({
      targets: elements,
      opacity: [0, 1],
      scale: [0.6, 1],
      duration: 350,
      easing: 'easeOutQuart',
      delay: anime.stagger(100, { start: 150 }),
      complete: completeFn
   })
}

function stagger(elements, cb = false, currentlyAnimating) {
   if (currentlyAnimating) {
      return
   }

   cb(true)

   animeStagger(elements, function() {
      if (cb && elements) {
         cb(false)
      }
   })

   // return anime({
   //    targets: elements,
   //    translateX: ['450px', '0px'],
   //    duration: 350,
   //    easing: 'easeOutQuart',
   //    delay: anime.stagger(100, { start: 150 }),
   //    complete: function() {
   //       if (cb && elements) {
   //          cb(false)
   //       }
   //    }
   // })
}

function fadeOutIn(elements, cb = false, currentlyAnimating) {
   if (currentlyAnimating) {
      return
   }

   cb(true)

   return anime({
      targets: elements,
      keyframes: [{ opacity: 1 }, { opacity: 0.4 }, { opacity: 1 }],
      duration: 250,
      complete: function() {
         if (cb && elements) {
            cb(false)
         }
      }
   })
}

function useAnime(animeFn, elementExists = true) {
   const currentlyAnimating = useRef(false)

   function updateCurrentlyAnimating(state) {
      currentlyAnimating.current = state
   }

   async function animate(element, params = false) {
      if (currentlyAnimating.current) {
         return
      }

      animeFn(element, updateCurrentlyAnimating, currentlyAnimating.current)
   }

   return animate
}

export { pulse, slideInRight, slideOutRight, stagger, useAnime, fadeOutIn, animeStagger, animeStaggerFadeIn }
