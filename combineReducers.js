export default reducers => {
  // 检查 reducer类型
  const reducersKeys = Object.keys(reducers)

  for (let i=0;i<reducersKeys.length;i++) {
    const key = reducersKeys[i]
    if (typeof reducers[key] !== 'function') throw new Error('reducer must be a function.')
  }
  // 调用reducer
  return (state, action) => {
    const nextState = {}

    for (let i=0;i<reducersKeys.length;i++) {
      const key = reducers[i]
      const reducer = reducers[key]

      const previousStateForKey = state[key]
      nextState[key] = reducer(previousStateForKey, action)
    }

    return nextState
  }
}