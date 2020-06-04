import { v4 as uuidv4 } from 'uuid'

function PaginationItemsMap({ children, payload, payloadSettings }) {
  console.log('::::: PaginationItemsMap 1 :::::')
  return payload.map((item) => {
    console.log('::::: PaginationItemsMap Iteration :::::')
    return wp.element.cloneElement(children, {
      key: uuidv4(),
      payload: item,
      payloadSettings: payloadSettings,
    })
  })
}

export default wp.element.memo(PaginationItemsMap)
