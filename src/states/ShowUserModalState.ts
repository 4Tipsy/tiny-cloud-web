

import { atom } from "jotai"




const _showUserModalState = atom(false)

const showUserModalState = atom(
  get => get(_showUserModalState),
  (_, set, newState: boolean ) => set(_showUserModalState, newState)
)



export { showUserModalState }