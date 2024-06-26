

import { atom } from "jotai"




export type ImgViewerContentType = {
  name: string,
  previewUrl: string,
}


const _imgViewerContentState = atom<ImgViewerContentType | null>(null)

const imgViewerContentState = atom(
  get => get(_imgViewerContentState),
  (_, set, newState: ImgViewerContentType | null ) => set(_imgViewerContentState, newState)
)





export { imgViewerContentState }