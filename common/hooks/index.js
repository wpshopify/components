import hasIn from 'lodash/hasIn'
import { CartContext } from '../../components/cart/_state/context'
const { useEffect, useState, useContext } = wp.element

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
    if (targetOpened) {
      addEventListener(eventListener)

      return () => removeEventListener(eventListener)
    }
  }, [ref, handler])
}

function useAction(hookName, defaultVal = false) {
  const [data, setData] = useState(() => defaultVal)

  useEffect(() => {
    if (!wp.hooks.hasAction(hookName)) {
      wp.hooks.addAction(hookName, 'wpshopify.' + hookName, function (newData) {
        setData(newData)
      })
    }

    return () => wp.hooks.removeAction(hookName, 'wpshopify.' + hookName)
  }, [])

  return data
}

function usePortal(componentMarkup, containerElement = false) {
  function renderPortal() {
    if (containerElement) {
      containerElement.classList.add('wpshopify-has-rendered')

      return wp.element.createPortal(componentMarkup, containerElement)
    }

    return componentMarkup
  }

  return renderPortal()
}

function getClosest(elem, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      }
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem
  }
  return null
}

function useCartToggle(cartElement) {
  const { useEffect } = wp.element
  const [cartState] = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(cartState.isCartOpen)
  const cartToggleAction = useAction('cart.toggle', false)

  const escEvent = (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      wp.hooks.doAction('on.cart.toggle', false)
      setIsOpen(false)
    }
  }

  const clickEvent = (event) => {
    var classList = event.target.classList
    var iconClicked = getClosest(event.target, '.wps-btn-cart')

    if (classList.contains('wps-modal-close-trigger')) {
      setIsOpen(false)
      wp.hooks.doAction('on.cart.toggle', false)
      return
    }

    if (iconClicked) {
      setIsOpen(true)
      wp.hooks.doAction('on.cart.toggle', true)
      return
    }
    if (cartElement.current.contains(event.target)) {
      setIsOpen(true)
      wp.hooks.doAction('on.cart.toggle', true)
      return
    }
    setIsOpen(false)
    wp.hooks.doAction('on.cart.toggle', false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickEvent)
    document.addEventListener('touchstart', clickEvent)
    document.addEventListener('keydown', escEvent)

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mousedown', clickEvent)
      document.removeEventListener('touchstart', clickEvent)
      document.removeEventListener('keydown', escEvent)
    }
  }, [])

  useEffect(() => {
    if (!cartToggleAction) {
      return
    }

    if (cartToggleAction === 'open') {
      setIsOpen(true)
    }

    if (cartToggleAction === 'close') {
      setIsOpen(false)
    }

    return () => {
      wp.hooks.removeAction('cart.toggle', 'wpshopify')
    }
  }, [cartToggleAction])

  return isOpen
}

export { useOnClickOutside, usePortal, useAction, useCartToggle }
