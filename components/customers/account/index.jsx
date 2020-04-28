import { AccountWrapper } from './wrapper'
import { Addresses } from './addresses'
import { AddressFormEdit } from './details/address/address-form-edit'
import { AddressFormAdd } from './details/address/address-form-add'
import { OrderDetails } from './orders/details'
import { useRoutes } from 'hookrouter'

function CustomersAccount() {
  const routes = {
    ['/' + wpshopify.settings.general.accountPageAccount]: () => <AccountWrapper />,
    ['/' + wpshopify.settings.general.accountPageAccount + '/']: () => <AccountWrapper />,
    ['/' + wpshopify.settings.general.accountPageAccount + '/order']: () => <OrderDetails />,
    ['/' + wpshopify.settings.general.accountPageAccount + '/addresses']: () => <Addresses />,
    ['/' + wpshopify.settings.general.accountPageAccount + '/addresses/edit']: () => (
      <AddressFormEdit />
    ),
    ['/' + wpshopify.settings.general.accountPageAccount + '/addresses/add']: () => (
      <AddressFormAdd />
    ),
  }

  const routeResult = useRoutes(routes)

  return routeResult || ''
}

export { CustomersAccount }
