import React, { useContext, useRef, useState } from 'react'
import { BuilderContext } from '../_state/context'
import { ClipboardButton, Button } from '@wordpress/components'
import { withState } from '@wordpress/compose'
import { Loader } from '../../loader'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function Shortcode() {
   const [builderState, builderDispatch] = useContext(BuilderContext)
   const inputRef = useRef()
   const [hasCopied, setHasCopied] = useState(false)

   var shortcodeCSS = css`
      width: 100%;
      position: fixed;
      bottom: 0;
      display: flex;
      z-index: 999;
      background: bisque;
   `

   var inputCSS = css`
      padding: 1em 1.4em;
      font-size: 1.7em;
      flex: 1;
      border-top: 1px solid #e2e4e7;
      font-family: monospace;
      border-right: none;
      border-left: none;
      outline: none;
   `

   var labelCSS = css`
      display: none;
      border: none;
      position: absolute;
      top: -37px;
      left: 0;
      width: auto;
      font-size: 1em;
      background: #ececec;
      padding: 0.4em 1.4em 0.4em 1.4em;
   `

   var buttonCSS = css`
      && {
         padding: 1em 1.4em 1em 2.4em;
         font-size: 1.4em;
         width: 400px;
         text-align: center;
         display: flex;
         justify-content: center;
         height: auto;
         line-height: auto;
         background-color: rgb(82, 167, 166);
         color: white;
         position: relative;
         border: none;

         &:hover {
            cursor: pointer;
            background-color: rgb(73, 155, 154);
         }

         svg {
            position: relative;
            top: 2px;
            left: -20px;
         }

         .components-button {
         }
      }
   `

   var newButtonCSS = css`
      && {
         font-size: 1.6em;
         padding: 1.3em 2em;
         text-align: center;
         line-height: 0px;
         width: 300px;
         display: flex;
         justify-content: center;
         height: 100%;
      }
   `

   var resetButtonCSS = css`
      position: absolute;
      top: -50px;
      left: 20px;
   `

   function copyToClipboard() {
      inputRef.current.select()
   }

   function onFocus(event) {
      event.target.select()
   }

   function onCopy() {
      setHasCopied(true)
      copyToClipboard()
   }

   function onFinishCopy() {
      setHasCopied(false)
   }

   function hasSelectedOptions() {
      if (builderState.hasCustomConnection) {
         return true
      }

      return builderState.defaultShortcode !== builderState.shortcode
   }

   function onReset() {
      if (hasSelectedOptions()) {
         builderDispatch({ type: 'RESET_SETTINGS' })

         localStorage.removeItem('wps-cached-settings')
      }
   }

   return (
      <div css={shortcodeCSS}>
         {hasSelectedOptions() && (
            <Button isDefault={true} isDefault={true} onClick={onReset} css={resetButtonCSS}>
               Reset Settings
            </Button>
         )}

         <label htmlFor='shortcode' css={labelCSS}>
            Shortcode created:
         </label>
         <input readOnly type='text' id='shortcode' ref={inputRef} value={builderState.shortcode} css={inputCSS} onFocus={onFocus} />
         {builderState.isLoading ? (
            <Loader />
         ) : (
            <ClipboardButton css={newButtonCSS} isPrimary text={builderState.shortcode} onCopy={onCopy} onFinishCopy={onFinishCopy}>
               {hasCopied ? 'Copied!' : 'Copy Shortcode'}
            </ClipboardButton>
         )}
      </div>
   )
}

export { Shortcode }
