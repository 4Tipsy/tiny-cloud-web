

import { atom } from "jotai"




const _showLoginRegisterState = atom('none')

const showLoginRegisterState = atom(
  get => get(_showLoginRegisterState),
  (_, set, newState: 'register' | 'login' | 'none' ) => set(_showLoginRegisterState, newState)
)



export { showLoginRegisterState }