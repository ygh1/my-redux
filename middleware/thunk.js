export default store => next => action => {
  console.log('thunk')
  next(action)
}