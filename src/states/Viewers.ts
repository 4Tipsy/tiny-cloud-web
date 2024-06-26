

import { atom } from "jotai"

import FsEntityModel from "../components/models/FsEntityModel"







const _imgViewerContentState = atom<FsEntityModel | null>(null)

const imgViewerContentState = atom(
  get => get(_imgViewerContentState),
  (_, set, newState: FsEntityModel | null ) => set(_imgViewerContentState, newState)
)





export { imgViewerContentState }