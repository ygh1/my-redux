export default function createStore (reducer, preloadedState) {
  if (typeof reducer !== 'function') {
    throw new Error('reducer must be a function.')
  }

  // 保存store
  let currentState = preloadedState

  // 存放订阅者函数
  let currentListeners = []

  // 获取state，闭包保存状态
  function getState () {
    return currentState
  }

  function dispatch (action) {
    currentState = reducer(currentState, action)

    // 循环数组，调用订阅者
    for (let i = 0;i < currentListeners.length;i++) {
      const listener = currentListeners[i]
      listener()
    }
  }

  function subscribe (listener) {
    currentListeners.push(listener)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}
