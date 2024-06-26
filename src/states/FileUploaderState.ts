
import { atom } from "jotai"


const _showFileUploaderBoxState = atom(false)

const showFileUploaderBoxState = atom(
  get => get(_showFileUploaderBoxState),
  (_, set, newState: boolean ) => set(_showFileUploaderBoxState, newState)
)


const _filesToUploadState = atom<FileList | null>(null)

const filesToUploadState = atom(
  get => get(_filesToUploadState),
  (_, set, newState: FileList ) => set(_filesToUploadState, newState)
)




export { showFileUploaderBoxState, filesToUploadState }