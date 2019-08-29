import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'

function Input({label, name, isRequired, type, value, onChange, placeholder}) {

   return (
      <div className='wpshopify-input-wrapper'>

         {label && <label htmlFor='wpshopify-input-${name}'>{label}</label>}
         
         <input
            required={isRequired}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className='wpshopify-input wpshopify-input-${name}'
            id='wpshopify-input-${name}'
         />

      </div>
   )


}

export { Input }