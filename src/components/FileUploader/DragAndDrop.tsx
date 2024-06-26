/// <reference types="vite-plugin-svgr/client" />



import clsx from "clsx"
import { useSetAtom } from "jotai"

// modules
import { filesToUploadState } from "../../states/FileUploaderState"
import { showFileUploaderBoxState } from "../../states/FileUploaderState"

// assets
import UploadIco from "../../assets/icons/upload-ico.svg?react"



const DragAndDrop = ({showSelf, setShowSelf}: {showSelf: boolean, setShowSelf: Function}) => {


  const setFilesToUpload = useSetAtom(filesToUploadState)
  const setShowFileUploaderBox = useSetAtom(showFileUploaderBoxState)


  return (
    <div className={clsx("bg-shd absolute z-40 top-0 left-o w-full h-full center-div transition-colors", !showSelf && "!hidden")}
      onDrop={ e => { 
        e.preventDefault()
        setShowSelf(false) // close dragAndDrop after drop

        setFilesToUpload(e.dataTransfer.files)
        setShowFileUploaderBox(true)
      }}
    >

      <div className="w-[90%] h-[90%] text-ntw border-2 border-ntw border-dashed rounded-xl center-div flex-col">
        <UploadIco className="w-[110px] h-[110px]"/>
        <div className="text-[50px] text-center">Drop files here</div>
      </div>

    </div>
  )
}



export default DragAndDrop