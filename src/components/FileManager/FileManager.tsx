

import clsx from "clsx"
//import { Scrollbars } from 'react-custom-scrollbars-2'
import { useState, useEffect, useRef } from "react"
import { useAtomValue, useSetAtom, useAtom } from "jotai"

// modules
import RenderModeDropdown from "./RenderModeDropdown"
import SortByDropdown from "./SortByDropdown"
import { fileFieldState, FileFieldValues, fsPathState } from "../../states/FsPathState"
import { userState, ifUserLoadingState } from "../../states/UserState"
import FsEntityModel from "../models/FsEntityModel"
import FsEntityComponent from "./FsEntityComponent"
import GoUpFsBtn from "./GoUpFsBtn"
import sortFsLayer from "./sortFsLayer"
import ContextMenu from "./ContextMenu"

import { filesToUploadState, showFileUploaderBoxState } from "../../states/FileUploaderState"
import { imgPreviewCacheState, cachedImgPreview } from "../../states/ImgPreviewCacheState"

import makeCreateFolderReq from "./fsRequests/makeCreateFolderReq"
import makeDownloadReq from "./fsRequests/makeDownloadReq"

// assets
import CheckboxIco from "../../assets/icons/checkbox-ico.svg?react"
import PlusIco from "../../assets/icons/plus-ico.svg?react"
import loadingGif from "../../assets/NEKO_GIF.gif"
import erroredImg from "../../assets/ON_ERROR_NEKO.webp"




export type RenderModeType = "cards" | "tableLike"
export type SortByType = "type" | "name" | "smaller" | "bigger"
export enum ReqStatusValues {
  loading = "loading",
  error = "error",
  success = "success",
}

const FileManager = () => {

  const [imgPreviewCache, setImgPreviewCache] = useAtom(imgPreviewCacheState)

  const [renderMode, setRenderMode] = useState<RenderModeType>("cards")

  const fileField = useAtomValue(fileFieldState)
  const fsPath = useAtomValue(fsPathState)

  const user = useAtomValue(userState)
  const ifUserLoading = useAtomValue(ifUserLoadingState)


  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuCords, setContextMenuCords] = useState<[number, number]>([0, 0])


  // fs layer related states
  const [reqStatus, setRequestStatus] = useState(ReqStatusValues.loading)
  const [fsLayer, setFsLayer] = useState<FsEntityModel[]>([])
  const [reqError, setRequestError] = useState<string>("")

  // sorter related states
  const [foldersFirst, setFoldersFirst] = useState(true)
  const [sortBy, setSortBy] = useState<SortByType>("type")

  // file upload related
  const [showFileUploaderBox, setShowFileUploaderBox] = useAtom(showFileUploaderBoxState)
  const setFilesToUpload = useSetAtom(filesToUploadState)
  const fileUploadTrigger = useRef<HTMLInputElement>(null)


  const [rerenderTrigger, setRerenderTrigger] = useState(false)
  const forceRerender = () => setRerenderTrigger(!rerenderTrigger)


  useEffect(() => {
    
    loadFsLayer()

  }, [fileField, fsPath, ifUserLoading, showFileUploaderBox, rerenderTrigger])





  const contextMenuOptions = [
    {'label': 'New folder', 'handler': handleCreateFolderRequest},
    {'label': 'New file', 'handler': () => { fileUploadTrigger.current?.click() }},
  ]




  return (
    <div className="file-manager-wrapper bg-mg2 flex-grow flex flex-col items-center">
      <FileInput />



      <div className="info-and-settings w-[95%] flex content-center mt-[0.8vw] pb-3 lg:flex-row sm:flex-col-reverse flex-row">


        <div className="flex-grow text-ntw text-[length:var(--fz1)]">
          <span className="text-hlc mr-[0.5vw]">[{fileField}]</span>
          {fsPath}
        </div>



        <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-2 text-ntw gap-x-[1.8vw] gap-y-[1.3vw] max-w-[70%] md:self-end">


          <div className="flex items-center justify-end">Sort by</div>


          <SortByDropdown sortBy={sortBy} setSortBy={setSortBy}/>


          <div className="flex items-center justify-between whitespace-nowrap">
            Folders first
            <div className="radio-box aspect-square h-full border-2 border-glc rounded-[10px] center-div cursor-pointer ml-2" onClick={() => setFoldersFirst(!foldersFirst) }>
              <div className={clsx("w-[75%] h-[75%] bg-hlc rounded-[5px] center-div", !foldersFirst && "invisible")}>
                <CheckboxIco className="w-[90%] h-[90%]"/>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">Render mode</div>


          <RenderModeDropdown renderMode={renderMode} setRenderMode={setRenderMode}/>


          <div className={clsx("new-btn center-div bg-hlc rounded-[10px] py-[0.65vw] cursor-pointer hover:underline relative", !user && "cursor-not-allowed")}
            onClick={ () => fileUploadTrigger.current?.click() }
          >
            <PlusIco/>
            <div className="ml-[0.25vw] mr-[0.2vw]">NEW</div>
          </div>


        </div>


      </div>






      <div className="fs-manager-inner w-full flex-grow flex justify-center"
      onContextMenu={ e => {
        // if fs-layer loaded
        if (reqStatus !== ReqStatusValues.success) {return}

        e.preventDefault()
        setContextMenuCords([e.pageX, e.pageY])
        setShowContextMenu(true)
      }}>
        {
          reqStatus === ReqStatusValues.loading
          ? <LoadingFsEntitiesComponent/>

          : reqStatus === ReqStatusValues.error
          ? <ErroredFsEntitiesComponent error={reqError}/>

          : reqStatus === ReqStatusValues.success
          && <FsEntitiesComponent fsLayer={fsLayer}/>


        }
      </div>





    </div>
  )






  function FsEntitiesComponent({fsLayer}: {fsLayer: FsEntityModel[]}) {
    return (
      <div
        className={clsx({
          /* renderMode styling */
          "w-[95%] h-min": true,
          "grid grid-cols-[repeat(auto-fill,_max(110px,_4vw))] md:grid-cols-[repeat(auto-fill,_min(150px,_12vw))] justify-between gap-x-1": renderMode === "cards",
          "": renderMode === "tableLike",
        })}
      >
        {/* FS COMPONENTS RENDERING */}
        {
          // GO UP BTN
          fsPath !== "/" && <GoUpFsBtn renderMode={renderMode}/>
        }
        {
          sortFsLayer(foldersFirst, sortBy, fsLayer).map((fsEntity: FsEntityModel) => {
            return (
              <FsEntityComponent renderMode={renderMode} forceRerender={forceRerender} {...fsEntity} key={fsEntity.abs_path}/>
            )
          })
        }
        {
          <ContextMenu cords={contextMenuCords} isOpen={showContextMenu} setIsOpen={setShowContextMenu} menuOptions={contextMenuOptions} />
        }
      </div>
    )
  }

  /* dumb placeholders for ERROR or LOADING states of fsLayer */
  function ErroredFsEntitiesComponent({error}: {error: string}) {
    return (
      <div>
        <img className="w-[70%] max-w-[70vh] h-auto md:mr-[var(--fz1)]" src={erroredImg}/>
        <div className="w-[70%] max-w-[70vh] text-[length:var(--fz2)] flex justify-center">
          <div className="text-erc">Error: <span className="text-ntw">{error}</span> </div>
        </div>
      </div>
    )
  }
  function LoadingFsEntitiesComponent() {
    return (
      <img className="w-[70%] max-w-[70vh] h-auto md:mr-[5vw]" src={loadingGif} />
    )
  }






  //
  // FILE INPUT!
  //
  function FileInput() {

    // disable if no user
    if (!user) {return}

    return (
      <input type="file" multiple={true} ref={fileUploadTrigger} className="hidden" 
        onChange={ e => {

          const fileList = e.currentTarget.files

          if (fileList) {
            setFilesToUpload(fileList)
            setShowFileUploaderBox(true)

            e.currentTarget.files = null

            // im sorry, im too dumb UwU
            setShowContextMenu(false)
          }

        }}
      />
    )
  }




  // request function
  function loadFsLayer() {

    const reqUrl = window.SERVER_RAW_URL + "/api/fs-watching-service/get-fs-layer"

    const reqBody = {
      abs_path_to_layer: fsPath,
      file_field: fileField.toLocaleLowerCase(),
    }

    const reqOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(reqBody),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }


    // if user still loading
    if (ifUserLoading) {
      return
    }


    // if no auth token
    const aTokenCookie = document.cookie.split("; ").find(c => c.startsWith('a-token'))
    if (!aTokenCookie) {
      setRequestStatus(ReqStatusValues.error)
      setRequestError("User is not logged in")
      return
    }


    // if not fsLayer is requested
    if (fileField === FileFieldValues.trashBox || fileField === FileFieldValues.shared) {
      setRequestStatus(ReqStatusValues.error)
      setRequestError("In new versions")
      return
    }



    // make request
    fetch(reqUrl, reqOptions)
    .then(async (res) => {
      const resData = await res.json()


      if (res.ok) {
        // if ok
        preloadImagesPreviews(resData.fs_layer)
        setRequestStatus(ReqStatusValues.success)
        setFsLayer(resData.fs_layer)

      } else {
        // if server handled error
        setRequestStatus(ReqStatusValues.error)
        setRequestError(resData.error)
      }
    })
    // if not server handled error
    .catch((err: Error) => {
      setRequestStatus(ReqStatusValues.error)
      setRequestError(err.message)
    })

  }





  function preloadImagesPreviews(fsLayer_: FsEntityModel[]) {


    if (imgPreviewCache.length > 0) {return}

    

    let newImgPreviewCache: cachedImgPreview[] = []
    setImgPreviewCache([{fileField: '', absPath: '', url: ''}])
    fsLayer_.forEach( en => {
      

      if (en.base_type === 'file') {
        if (en.mime_type!.split('/')[0] === 'image') {

          // download img and set src
          makeDownloadReq(en.name, en.abs_path, 'file', fileField).then( async (res) => {
            
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            

            // add to cache
            const newCachedImg = {
              fileField: fileField,
              absPath: en.abs_path,
              url: url,
            }
            newImgPreviewCache.push(newCachedImg)
          })
        }
      }

      setImgPreviewCache(newImgPreviewCache)
      forceRerender()

    })
  }








  function handleCreateFolderRequest() {

    const newFolderName = prompt("Enter new folder name")

    if (!newFolderName) {
      return
    }

    makeCreateFolderReq(newFolderName, fsPath, fileField).then((_) => {
      forceRerender()
      setShowContextMenu(false)
    })

  }





}





export default FileManager