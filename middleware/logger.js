export default store => next => action => {
  console.log('logger')
  next(action)
}