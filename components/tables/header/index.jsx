import React from 'react'

function TableHeader({ children }) {
   return (
      <thead className='wpshopify-table-header'>
         <tr>{children}</tr>
      </thead>
   )
}

export { TableHeader }
