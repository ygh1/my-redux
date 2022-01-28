export default (actionCreators, dispatch) => {
  const boundActionCreators = {}
  for (const key in actionCreators) {
    boundActionCreators[key] = () => {
      dispatch(actionCreators[key]())
    }
  }
  return boundActionCreators
}