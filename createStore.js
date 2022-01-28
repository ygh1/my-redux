export default function createStore (reducer, preloadedState, enhancer) {
  // 对reducer 判断
  if (typeof reducer !== 'function') {
    throw new Error('reducer must be a function.')
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') throw new Error('enhancer must be a function.')
    return enhancer(createStore)(reducer, preloadedState)
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
    // 判断 action 是否是对象
    if (!isPlainObject(action)) throw new Error('action must be a plain object.')
    if (action.type === 'undefined') throw new Error('action must be have type attribete.')
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

// 判断 obj 是否是对象
function isPlainObject (obj) {
  if (typeof obj !== 'object' || obj === null) return false
  // 原型对象对比
  let proto = obj
  while (Object.getPrototypeOf(proto) != null) {
    proto = Object.getPrototypeOf(proto)
    console.log(proto)
  }
  return Object.getPrototypeOf(obj) === proto
}
