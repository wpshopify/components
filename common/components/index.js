import isEmpty from 'lodash/isEmpty'

const isShowingComponent = (state, type) => {
   if (!state.componentOptions.excludes || isEmpty(state.componentOptions.excludes)) {
      return true
   }

   return !state.componentOptions.excludes.includes(type)
}

export { isShowingComponent }
