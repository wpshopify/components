import { CustomersProvider } from './_state/provider'
import { CustomersForms } from './account/forms'
import { CustomersAccount } from './account'

function Customers({ options }) {
  return (
    <CustomersProvider options={options}>
      <CustomersForms />
      <CustomersAccount />
    </CustomersProvider>
  )
}

export { Customers }
