import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import hasIn from 'lodash/hasIn'

function useOnClickOutside(ref, handler, targeOpened = false) {
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
      if (targeOpened) {
         addEventListener(eventListener)

         return () => {
            removeEventListener(eventListener)
         }
      }
   }, [ref, handler])
}

function usePortal(componentMarkup, containerElement) {
   console.log('containerElement', containerElement)

   function emptyComponentWrapper(element) {
      while (element.firstChild) {
         element.removeChild(element.firstChild)
      }
   }

   function renderPortal() {
      if (containerElement) {
         return <>{ReactDOM.createPortal(componentMarkup, containerElement)}</>
      } else {
         console.log('11111111111111')

         return <>{componentMarkup}</>
      }
   }

   useState(() => {
      if (containerElement) {
         containerElement.setAttribute('data-wps-is-ready', '1')
         emptyComponentWrapper(containerElement)
      }
   }, [])

   return renderPortal()
}

export { useOnClickOutside, usePortal }
