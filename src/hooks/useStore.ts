import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../store'

const useStore = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => {
  return useSelector<RootState, TSelected>(selector, shallowEqual)
}

export default useStore
