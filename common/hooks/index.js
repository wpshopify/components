import React, { useEffect, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import hasIn from 'lodash/hasIn'
import inView from 'in-view'
import { createHooks } from '@wordpress/hooks'

function useOnClickOutside(ref, handler, targetOpened = false) {
   function addEventListener(listener) {
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      document.addEventListener('keydown', listener, false)
   }

   function removeEventListener(listener) {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
      document.removeEventListener('keydown', listener, false)
   }

   function isKeyboardEvent(event) {
      return hasIn(event, 'keyCode')
   }

   function isEscKey(event) {
      return event.keyCode === 27
   }

   function clickedInside(ref, event) {
      return !ref.current || ref.current.contains(event.target)
   }

   function eventListener(event) {
      if (isKeyboardEvent(event)) {
         if (isEscKey(event)) {
            handler(event)
         }
      } else {
         // Do nothing if clicking ref's element or descendent elements
         if (clickedInside(ref, event)) {
            return
         }

         handler(event)
      }
   }

   useEffect(() => {
      if (targetOpened && targetOpened()) {
         addEventListener(eventListener)

         return () => {
            removeEventListener(eventListener)
         }
      }
   }, [ref, handler])
}

function useAction(hookName, defaultVal = false) {
   const [data, setData] = useState(defaultVal)

   useEffect(() => {
      if (!wp.hooks) {
         wp.hooks = createHooks()
      }

      if (!wp.hooks.hasAction(hookName)) {
         wp.hooks.addAction(hookName, 'wpshopify.' + hookName, function(newData) {
            setData(newData)
         })
      }
   }, [])

   return data
}

function usePortal(componentMarkup, containerElement = false, skipEmptyRender = false) {
   function renderPortal() {
      if (containerElement) {
         var placeholderElement = containerElement.querySelector('.wps-loading-placeholder, .wps-server-component')

         if (placeholderElement) {
            containerElement.removeChild(placeholderElement)
         }

         return ReactDOM.createPortal(componentMarkup, containerElement)
      } else {
         if (!skipEmptyRender) return componentMarkup
      }
   }

   return renderPortal()
}

function useInView(selector, itemsState) {
   const [inViewState, setInViewState] = useState(false)

   useEffect(() => {
      if (itemsState.componentOptions.infiniteScroll) {
         inView.offset(itemsState.componentOptions.infiniteScrollOffset)

         inView(selector)
            .on('enter', el => {
               setInViewState(true)
            })
            .on('exit', el => {
               setInViewState(false)
            })
      }
   }, [])

   return [inViewState]
}

export { useOnClickOutside, usePortal, useInView, useAction }
