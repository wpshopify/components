import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
/** @jsx jsx */
import { jsx } from '@emotion/core'

function Addresses() {
   const styles = {
      flex: 1
   }

   return (
      <div css={styles}>
         <h2>Your Addresses</h2>
      </div>
   )
}

export { Addresses }
