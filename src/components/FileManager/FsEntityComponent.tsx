/// <reference types="vite-plugin-svgr/client" />


import clsx from "clsx"
import { useAtomValue, useSetAtom } from "jotai"
import { useState } from "react"
import download from "downloadjs"

// modules
import FsEntityModel from "../models/FsEntityModel"
import { RenderModeType } from "./FileManager"
import { fsPathState, fileFieldState } from "../../states/FsPathState"
import ContextMenu from "./ContextMenu"
import { imgViewerContentState, ImgViewerContentType } from "../../states/Viewers"
import { imgPreviewCacheState } from "../../states/ImgPreviewCacheState"

import makeDownloadReq from "./fsRequests/makeDownloadReq"
import makeRenameReq from "./fsRequests/makeRenameReq"
import makeDeleteReq from "./fsRequests/makeDeleteReq"


// assets
import UsualFolderSvg from "../../assets/icons/usual-folder.svg?react"
import UsualFileSvg from "../../assets/icons/usual-file.svg?react"
import SharedIco from "../../assets/icons/shared-ico.svg?react"





type FsEntityComponentProps = {renderMode: RenderModeType, forceRerender: Function} 
                              & FsEntityModel


const FsEntityComponent = ({renderMode, forceRerender, name, shared, abs_path: absPath, base_type: baseType, size_in_mb: sizeInMb, mime_type: mimeType}: FsEntityComponentProps) => {

  const imgPreviewCache = useAtomValue(imgPreviewCacheState)
  const setImgViewerContent = useSetAtom(imgViewerContentState)


  const [showContextMenu, setShowContextMenu] = useState(false)
  const [cords, setCords] = useState<[number, number]>([0, 0])

  
  const fileField = useAtomValue(fileFieldState)
  const setFsPath = useSetAtom(fsPathState)



  const handleClick = () => {
    if (baseType === "folder") {
      setFsPath(absPath)
    }

    if (baseType === 'file' && mimeType?.split('/')[0] === 'image') {

      const previewUrl = imgPreviewCache.find(img => img.fileField===fileField && img.absPath===absPath)!.url
      const imgViewerContent: ImgViewerContentType = {
        name: name,
        previewUrl: previewUrl,
      }

      setImgViewerContent(imgViewerContent)
    }
  }



  const menuOptions = [
    {'label': 'Download', 'handler': handleDownloadRequest},
    {'label': 'Rename', 'handler': handleRenameRequest},
    {'label': 'Delete', 'handler': handleDeleteRequest},
  ]

  if (shared) {
    menuOptions.unshift({'label': 'Unshare', 'handler': ()=>{}})
  }
  else {
    menuOptions.unshift({'label': 'Share', 'handler': ()=>{}})
  }


  if (baseType === "folder") {
    menuOptions.unshift({'label': 'Move', 'handler': () => setFsPath(absPath) })
  }






  if (renderMode === "cards") {
    return (
      
      <div className="fs-entity flex flex-col rounded-[15px] cursor-pointer hover:bg-[rgba(0,0,0,_0.2)] transition-colors"
        onClick={handleClick}
        onContextMenu={ e => { e.preventDefault(); e.stopPropagation(); setCords([e.pageX, e.pageY]); setShowContextMenu(true) }}
      >

        <div className="aspect-square center-div relative">
          <AppropriateIcon className="aspect-square w-[95%]"/>
          {shared &&
          <SharedIco className="absolute w-[50%] h-[50%] bottom-0 right-0"/>}
        </div>

        <div className="text-[length:var(--fz2)] text-ntw text-center text-nowrap text-ellipsis overflow-hidden">
          {name}
        </div>

        { sizeInMb &&
        <div className="text-[length:var(--fz2)] text-ntw opacity-25 text-center">
          {prettifySize(sizeInMb)}
        </div>
        }


        <ContextMenu cords={cords} isOpen={showContextMenu} setIsOpen={setShowContextMenu} menuOptions={menuOptions}/>
      </div>
    )
  }

  if (renderMode === "tableLike") {
    return (

      <div className="fs-entity grid grid-cols-[0_auto_auto_1fr] gap-[2%] py-[1vw] cursor-pointer hover:bg-[rgba(0,0,0,_0.2)] transition-colors"
        onClick={handleClick}
        onContextMenu={ e => { e.preventDefault(); e.stopPropagation(); setCords([e.pageX, e.pageY]); setShowContextMenu(true) }}
      >

        <div className="relative col-start-2 w-[calc(var(--fz2)_*2)] h-[calc(var(--fz2)_*2)]">
          <AppropriateIcon className="w-full h-full"/>
          {shared &&
          <SharedIco className="absolute w-[65%] h-[65%] bottom-[-10%] right-[-10%]"/>}
        </div>
        
        <div className="center-div text-[length:var(--fz2)] text-ntw text-ellipsis overflow-hidden">
          {name}
        </div>

        <div className="center-div text-[length:var(--fz2)] text-ntw opacity-25">
          { sizeInMb &&
          prettifySize(sizeInMb)
          }
        </div>

        <div/>

        <ContextMenu cords={cords} isOpen={showContextMenu} setIsOpen={setShowContextMenu} menuOptions={menuOptions}/>
      </div>
    )
  }





  function AppropriateIcon({className}: {className: string}) {

    return (
      baseType === "folder"
      // if folder
      ? <UsualFolderSvg className={className}/>

      // if file (img!)
      : ( mimeType!.split('/')[0] === "image" && sizeInMb! < 5)
      ? <ImagePreviewed className={className}/>

      // if file (other)
      : <UsualFileSvg className={className}/>
    )
  }




  function ImagePreviewed({className}: {className: string}) {
      
    const cachedImg = imgPreviewCache.find(img => img.fileField===fileField && img.absPath===absPath)
    const imgUrl = cachedImg?.url || ""
    


    return (
      <img className={clsx(className, "object-contain")} src={imgUrl} alt={name} />
    )
  }





  function prettifySize(sizeInMb: number): string {

    let size = sizeInMb
    let unit = "MB"

    if (sizeInMb < 1) {
      size = sizeInMb * 1024
      unit = "KB"
    }

    let prettifiedSize = size.toFixed(2).toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')
    return prettifiedSize + " " + unit
  }








  function handleRenameRequest() {

    const newName = prompt("Enter new name")

    if (!newName) {
      return
    }

    makeRenameReq(name, absPath, baseType, fileField, newName).then(()=> {
      forceRerender()
    })

  }



  function handleDeleteRequest() {

    if (!confirm("You shure you want to delete " + name + "?")) {
      return
    }

    makeDeleteReq(name, absPath, baseType, fileField).then(()=> {
      forceRerender()
    })
  }




  function handleDownloadRequest() {


    makeDownloadReq(name, absPath, baseType, fileField)
    .then(async (res) => {

      if (res.ok) {
        const resBlob = await res.blob()
        download(resBlob)

      } else {
        const resData = await res.json()
        alert(resData.error)
      }

    }).catch((err: Error) => {
      alert(err.message)
    })
  }



}






export default FsEntityComponent