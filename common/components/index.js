import isEmpty from 'lodash/isEmpty'

const isShowingComponent = (state, type) => {
  if (!state.payloadSettings.excludes || isEmpty(state.payloadSettings.excludes)) {
    return true
  }

  return !state.payloadSettings.excludes.includes(type)
}

export { isShowingComponent }
