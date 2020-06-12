import { v4 as uuidv4 } from 'uuid'

function PaginationItemsMap({ children, payload, payloadSettings }) {
  return payload.map((item) => {
    return wp.element.cloneElement(children, {
      key: uuidv4(),
      payload: item,
      payloadSettings: payloadSettings,
    })
  })
}

export default wp.element.memo(PaginationItemsMap)
