

import { atom } from "jotai"




const _showAsideState = atom(false)

const showAsideState = atom(
  get => get(_showAsideState),
  (_, set, newState: boolean) => set(_showAsideState, newState)
)



export default showAsideState