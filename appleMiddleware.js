export default function appleMiddleware (...mideleware) {
  return createStore => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)
    const middlewareAPI = {
      getState: store.getState,
      dispatch: store.dispatch
    }
    const chain = mideleware.map(middleware => middleware(middlewareAPI))
    const dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

function compose () {
  const fns = [...arguments]
  return dispatch => {
    return fns.reverse().reduce((acc, fn) => {
      return fn(acc)
    }, dispatch)
  }
}