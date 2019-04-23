import React, { useContext } from 'react'
import { PaginationItemsContext } from './_state/context'

function PaginationItems({ children }) {
   console.log('<PaginationItems>')

   return <section className={'wps-items wps-items-list'}>{children}</section>
}

export { PaginationItems }
