import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Items } from '../items'
import { LoadingContext } from '../../common/state/context'

function DropZone({ dropZone, items }) {
   const { from } = useContext(LoadingContext)

   const dropZoneElement = document.querySelector(dropZone)
   console.log('DropZone')

   return <>{!dropZone ? <Items items={items} from={from} /> : ReactDOM.createPortal(<Items items={items} from={from} />, dropZoneElement)}</>
}

export { DropZone }
