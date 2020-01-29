import React, { useContext } from 'react'
import { AccountWrapper } from './wrapper'
import { Addresses } from './addresses'
import { AddressFormEdit } from './details/address/address-form-edit'
import { AddressFormAdd } from './details/address/address-form-add'
import { OrderDetails } from './orders/details'
import { ShopContext } from '../../shop/_state/context'
import { useRoutes } from 'hookrouter'

function CustomersAccount() {
   const [shopState] = useContext(ShopContext)

   const routes = {
      ['/' + shopState.settings.general.accountPageAccount]: () => <AccountWrapper />,
      ['/' + shopState.settings.general.accountPageAccount + '/']: () => <AccountWrapper />,
      ['/' + shopState.settings.general.accountPageAccount + '/order']: () => <OrderDetails />,
      ['/' + shopState.settings.general.accountPageAccount + '/addresses']: () => <Addresses />,
      ['/' + shopState.settings.general.accountPageAccount + '/addresses/edit']: () => <AddressFormEdit />,
      ['/' + shopState.settings.general.accountPageAccount + '/addresses/add']: () => <AddressFormAdd />
   }

   const routeResult = useRoutes(routes)

   return routeResult || ''
}

export { CustomersAccount }
