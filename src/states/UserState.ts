

import { atom } from "jotai"
import { UserModel } from "../components/models/UserModel"




const _userState = atom<UserModel|null>(null)

export const userState = atom(
  get => get(_userState),
  (_, set, newState: UserModel|null) => set(_userState, newState)
)





const _ifUserLoadingState = atom(true)

export const ifUserLoadingState = atom(
  get => get(_ifUserLoadingState),
  (_, set, newState: boolean) => set(_ifUserLoadingState, newState)
)


