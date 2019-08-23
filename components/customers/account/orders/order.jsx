import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'

function Order({ order }) {
   console.log('order.node', order.node)

   return <div>{order.node.name}</div>
}

export { Order }
