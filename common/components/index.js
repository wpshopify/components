const isShowingComponent = (state, type) => {
   if (!state.componentOptions.excludes) {
      return true
   }

   return !state.componentOptions.excludes.includes(type)
}

export { isShowingComponent }
