import { useDispatch } from 'react-redux'

const useDispatcher = (Dispatcher) => {
  const dispatch = useDispatch()
  return new Dispatcher(dispatch)
}

export default useDispatcher
