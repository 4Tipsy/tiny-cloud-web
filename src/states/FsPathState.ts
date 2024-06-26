

import { atom } from "jotai"

import { _imgPreviewCacheState } from "./ImgPreviewCacheState"


// possible values of fileField
export enum FileFieldValues {
  mere = "Mere",
  special = "Special",
  temporary = "Temporary",
  shared = "Shared",
  trashBox = "Trash box",
}



// raw values states
const fileFieldValue = atom(FileFieldValues.mere)

const fsPathInMereValue = atom("/")
const fsPathInSpecialValue = atom("/")
const fsPathInTemporaryValue = atom("/")




// fsPath getter
const _fsPathState = atom(get => {

  switch (get(fileFieldValue)) {
    case FileFieldValues.mere:
      return get(fsPathInMereValue)
    case FileFieldValues.special:
      return get(fsPathInSpecialValue)
    case FileFieldValues.temporary:
      return get(fsPathInTemporaryValue)
    case FileFieldValues.shared:
      return get(fsPathInSpecialValue)
    case FileFieldValues.trashBox:
      return get(fsPathInSpecialValue)
    default:
      return get(fsPathInMereValue)
  }
})


// fsPath state that auto switches according to fileFieldState
export const fsPathState = atom(

  get => get(_fsPathState),

  (get, set, newState: string) => {

    set(_imgPreviewCacheState, [])

    switch (get(fileFieldValue)) {
      case FileFieldValues.mere:
        set(fsPathInMereValue, newState)
        break
      case FileFieldValues.special:
        set(fsPathInSpecialValue, newState)
        break
      case FileFieldValues.temporary:
        set(fsPathInTemporaryValue, newState)
        break
      case FileFieldValues.shared:
        set(fsPathInSpecialValue, newState)
        break
      case FileFieldValues.trashBox:
        set(fsPathInSpecialValue, newState)
        break
      default:
        set(fsPathInMereValue, newState)
        break
    }
  }
)

// fileField state
export const fileFieldState = atom(
  get => get(fileFieldValue),
  (_, set, newState: FileFieldValues) => { set(fileFieldValue, newState); set(_imgPreviewCacheState, []) }
)