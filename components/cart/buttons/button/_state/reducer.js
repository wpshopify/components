function CartButtonReducer(state, action) {
   switch (action.type) {
      default: {
         throw new Error(`Unhandled action type: ${action.type} in CartButtonReducer`)
      }
   }
}

export { CartButtonReducer }
