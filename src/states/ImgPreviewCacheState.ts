

import { atom } from "jotai"





export type cachedImgPreview = {
  fileField: string,
  absPath: string,
  url: string,
}




const _imgPreviewCacheState = atom<cachedImgPreview[]>([])

const imgPreviewCacheState = atom(
  get => get(_imgPreviewCacheState),
  (_, set, newState: cachedImgPreview[] ) => set(_imgPreviewCacheState, newState)
)


export { _imgPreviewCacheState, imgPreviewCacheState }