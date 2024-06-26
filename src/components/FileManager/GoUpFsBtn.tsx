/// <reference types="vite-plugin-svgr/client" />



import { useAtom } from "jotai"


// modules
import { RenderModeType } from "./FileManager"
import { fsPathState } from "../../states/FsPathState"

// assets
import GoUpSvg from "../../assets/icons/go-up-fs-ico.svg?react"



const GoUpFsBtn = ({renderMode}: {renderMode: RenderModeType}) => {

  const [fsPath, setFsPath] = useAtom(fsPathState)


  function handleGoUp() {

    if (fsPath === "/") return

    const pathParts = fsPath.split("/")
    const newPath = pathParts.slice(0, -1).join("/")

    if (newPath) { setFsPath(newPath) }
    else { setFsPath("/") }
  }



  if (renderMode === "cards") {
    return (
      <div className="go-up-btn fs-entity flex flex-col rounded-[15px] cursor-pointer hover:bg-[rgba(0,0,0,_0.2)] transition-colors"
        onClick={handleGoUp}
        onContextMenu={ e => e.stopPropagation() }
      >
        
        <div className="aspect-square center-div">
          <GoUpSvg className="aspect-square w-[95%]"/>
        </div>
        <div className="text-ntw text-[length:var(--tz1)] text-center">
          RETURN
        </div>
      </div>
    )
  }
  if (renderMode === "tableLike") {
    return (
      <div className="go-up-btn grid grid-cols-[0_auto_auto_1fr] gap-[2%] py-[1vw] cursor-pointer hover:bg-[rgba(0,0,0,_0.2)] transition-colors"
        onClick={handleGoUp}
        onContextMenu={ e => e.stopPropagation() }
      >
        <GoUpSvg className="col-start-2 w-[calc(var(--fz2)_*2)] h-[calc(var(--fz2)_*2)] center-div"/>
        <div className="text-ntw center-div">RETURN</div>
      </div>
    )
  }

}


export default GoUpFsBtn