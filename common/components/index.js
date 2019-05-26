import isEmpty from 'lodash/isEmpty'

const isShowingComponent = (state, type) => {
   if (!state.componentOptions.excludes || isEmpty(state.componentOptions.excludes)) {
      return true
   }

   return !state.componentOptions.excludes.includes(type)
}

const onSinglePage = state => state.componentOptions.isSingular

export { isShowingComponent, onSinglePage }
