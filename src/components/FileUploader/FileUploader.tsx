/// <reference types="vite-plugin-svgr/client" />



import clsx from "clsx"
import { useAtom, useAtomValue } from "jotai"


// modules
import { showFileUploaderBoxState } from "../../states/FileUploaderState"
import { filesToUploadState } from "../../states/FileUploaderState"
import { fileFieldState, fsPathState } from "../../states/FsPathState"
import makeUploadFileReq from "../FileManager/fsRequests/makeUploadFileReq"

// assets
import UploadIco from "../../assets/icons/upload-ico.svg?react"
import CancelIco from "../../assets/icons/cancel-ico.svg?react"





const FileUploader = () => {

  const [showFileUploaderBox, setShowFileUploaderBox] = useAtom(showFileUploaderBoxState)

  const [filesToUpload, setFilesToUpload] = useAtom(filesToUploadState)
  const fileField = useAtomValue(fileFieldState)
  const fsPath = useAtomValue(fsPathState)


  return (
    <div className={clsx("bg-shd absolute z-40 top-0 left-o w-full h-full center-div transition-colors", !showFileUploaderBox && "!hidden")}
    onClick={ () => setShowFileUploaderBox(false) }>

      <div className="uploader-box bg-mg1 text-ntw w-[80vw] md:w-[70vw] 2xl:w-[45vw] flex flex-col items-center rounded"
      onClick={ e => e.stopPropagation() }>


        <div className="border-b-2 border-glc text-[27px] md:text-[40px] w-full center-div pt-1">Files to upload ({filesToUpload?.length})</div>

        <div className="files-container flex flex-col items-center w-full py-4 border-b-2 border-glc max-h-[70vh] overflow-y-auto">
          { filesToUpload &&
            Array.from(filesToUpload).map(file => {
              return (
                <FileUploadComp file={file} key={file.name+file.size}/>
              )
            })
          }
        </div>

        <div className="bg-hlc text-mg2 rounded-lg w-[90%] py-2 center-div my-4 cursor-pointer hover:underline"
          onClick={fireFileUpload}
        >
          <strong>Upload to <span className="text-ntw">[{fileField}]: {fsPath}</span></strong>
        </div>
        <div className="ml-1 opacity-60 w-[90%] mb-4">
          [?] Tap outside to cancel file(s) upload
        </div>

      </div>


    </div>
  )




  function fireFileUpload() {

    let noErrorsMet = true

    Array.from(filesToUpload!).forEach( file => {

      let absPath: string
      if (fsPath === "/") {
        absPath = "/" + file.name
      } else {
        absPath = fsPath + "/" + file.name
      }

      makeUploadFileReq(file.name, absPath, fileField, file).then( res => {
        if (!res.ok) {
          noErrorsMet = false
        }
      })

    })

    noErrorsMet && setShowFileUploaderBox(false)
  }



  function FileUploadComp({file}: {file: File}) {

    //const [fileName, setFileName] = useState(file.name)


    return (
      <div className="w-[90%] rounded bg-glc flex items-center gap-3 p-3 my-2" key={file.name}>


        <div className="aspect-square w-[5%]">
          <UploadIco className="w-full h-full" />
        </div>

        {/*<input type="text" className="text-mg1 rounded w-[70%] pl-3 py-[3px]" value={fileName} onChange={ e => setFileName(e.currentTarget.value) } />*/}
        {/* */}<div className="w-[70%]">{file.name}</div>

        <div className="text-ntw flex-grow">{prettifySize(file.size)}</div>

        <div className="aspect-square w-[5%] cursor-pointer hover:opacity-25"
          onClick={ () => {

            const dt = new DataTransfer()
            for (let i = 0; i < filesToUpload!.length; i++) {
              if (filesToUpload![i] !== file) {
                dt.items.add(filesToUpload![i])
              }
            }

            if (dt.items.length === 0) {
              setShowFileUploaderBox(false)
            }

            setFilesToUpload(dt.files)
          }}
        >
          <CancelIco className="w-full h-full"/>
        </div>


      </div>
    )
  }





}






function prettifySize(sizeInB: number): string {

  let sizeInMb = sizeInB / 1024 / 1024
  let size = sizeInMb
  let unit = "MB"

  if (sizeInMb < 1) {
    size = sizeInMb * 1024
    unit = "KB"
  }

  let prettifiedSize = size.toFixed(2).toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')
  return prettifiedSize + " " + unit
}




export default FileUploader