import React from 'react'
import ReactDOM from 'react-dom'
import { AccountWrapper } from './wrapper'
import { Addresses } from './addresses'
import { AddressFormEdit } from './details/address/address-form-edit'
import { AddressFormAdd } from './details/address/address-form-add'
import { OrderDetails } from './orders/details'
import { useRoutes } from 'hookrouter'

function CustomersAccount() {
   const routeResult = useRoutes({
      '/account/': () => <AccountWrapper />,
      '/account/order': () => <OrderDetails />,
      '/account/addresses': () => <Addresses />,
      '/account/addresses/edit': () => <AddressFormEdit />,
      '/account/addresses/add': () => <AddressFormAdd />
   })

   return routeResult || ''
}

export { CustomersAccount }
