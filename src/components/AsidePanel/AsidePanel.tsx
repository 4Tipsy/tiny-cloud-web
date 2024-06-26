/// <reference types="vite-plugin-svgr/client" />


import clsx from "clsx"
import { useAtom, useAtomValue } from "jotai"


// modules
import AsideBtn from "./AsideBtn"
import showAsideState from "../../states/ShowAsideState"
import { userState } from "../../states/UserState"
import { FileFieldValues } from "../../states/FsPathState"

// assets
import LogoIco from "../../assets/icons/logo_pink.svg?react"

import MereIco from "../../assets/icons/mere-ico.svg?react"
import SpecialIco from "../../assets/icons/special-ico.svg?react"
import TemporaryIco from "../../assets/icons/temporary-ico.svg?react"
import SharedIco from "../../assets/icons/shared-ico.svg?react"
import TrashBoxIco from "../../assets/icons/trash-box-ico.svg?react"

import SettingsIco from "../../assets/icons/settings_1.svg?react"
import GithubIco from "../../assets/icons/github.svg?react"
import RocketIco from "../../assets/icons/rocket-ico.svg?react"

import StorageIco from "../../assets/icons/storage-ico.svg?react"





const AsidePanel = () => {


  const [showAside, setShowAside] = useAtom(showAsideState)


  return (
    <>
      {/* aside's shading */}
      <div className={clsx("shading cursor-pointer bg-[#000] opacity-60 absolute z-10 right-0 w-[40vw] h-screen md:!hidden text-ntw center-div", !showAside && "!hidden")}
        onClick={() => setShowAside(false)}
      >
        <div className="rotate-90 whitespace-nowrap opacity-30 text-[length:8vw]">Tap here to close</div>
      </div>



      {/* aside */}
      <div className={clsx("aside-panel absolute z-10 md:static md:flex md:w-[max(28vh,_19vw)] md:min-w-[max(28vh,_19vw)] w-[60vw] h-screen bg-mg1 border-r-2 border-glc flex flex-col", !showAside && "hidden")}>


        <div className="logo flex-shrink h-[var(--header-height)] border-b-2 border-glc center-div">
          <LogoIco/>
        </div>


        <div className="inner-content flex-grow grid grid-rows-[1.5fr_1px_1fr_1px_2.2fr] justify-items-center">



          <div className="file-fields flex flex-col justify-evenly w-10/12 h-full">
            <div className="text-ntw text-[length:var(--fz1)] mt-2">File Fields</div>
            <div className="h-[66%] flex flex-col justify-around">

              <AsideBtn text="Mere" representedFileField={FileFieldValues.mere}><MereIco/></AsideBtn>

              <AsideBtn text="Special" representedFileField={FileFieldValues.special}><SpecialIco/></AsideBtn>

              <AsideBtn text="Temporary" representedFileField={FileFieldValues.temporary}><TemporaryIco/></AsideBtn>

            </div>
          </div>


          {/* line */} <div className="w-full h-[2px] bg-glc" /> {/* line */}


          <div className="additional-fields flex flex-col justify-evenly w-10/12 h-full">
            <div className="h-[66%] flex flex-col justify-around">

              <AsideBtn text="Shared" representedFileField={FileFieldValues.shared}><SharedIco/></AsideBtn>

              <AsideBtn text="Trash box" representedFileField={FileFieldValues.trashBox}><TrashBoxIco/></AsideBtn>

            </div>
          </div>


          {/* line */} <div className="w-full h-[2px] bg-glc" /> {/* line */}


          <GeneralSegment/>




        </div>
      </div>
    </>
  )
}




const GeneralSegment = () => {

  const user = useAtomValue(userState)


  return (
    <div className="general flex flex-col justify-evenly w-10/12 h-full">

      <div className="text-ntw text-[length:var(--fz1)]">General</div>


      <div className="text-[length:var(--fz2)] flex flex-col justify-between h-[27%]">
        <div className="flex flex-row items-center text-ntw cursor-pointer hover:underline">
          <SettingsIco/>
          <div className="ml-1">Settings</div>
        </div>

        <div className="flex flex-row items-center text-ntw">
          <GithubIco/>
          <a href={window.LINK_TO_REPO} className="ml-1 cursor-pointer hover:underline">GitHub</a>
          <pre style={{fontFamily: "initial"}}> / </pre>
          <a href={window.LINK_TO_GH_ACC} className="cursor-pointer hover:underline">@4Tipsy</a>
        </div>

        <div className="flex flex-row items-center text-hlc cursor-pointer hover:underline">
          <RocketIco/>
          <div className="ml-1">Preview mode</div>
        </div>
      </div>




      <div className="storage-usage center-div w-full h-1/3 bg-mg2">
        <div className="w-[90%] grid gap-[0.5vw] grid-cols-[auto_1fr] grid-rows-2">


          <div className="text-[length:var(--fz2)] text-ntw col-span-2">Storage usage</div>

          <div className="row-span-2 aspect-square">
            <StorageIco className="aspect-square"/>
          </div>

          <div className="relative">
            <div className="absolute h-full w-full bg-ntw"/>
            <div className="absolute h-full bg-hlc" style={{width: _getSpaceUsedInPercents()+"%"}}/>
          </div>

          <div className="text-[calc(length:var(--fz2)_/1.2)] text-ntw">
            {user?.used_space?.toFixed(2)||0}/{user?.available_space||1} MB ({_getSpaceUsedInPercents()}%)
          </div>


        </div>
      </div>

    </div>
  )

  function _getSpaceUsedInPercents() {
    let percents = (user?.used_space||0) / (user?.available_space||1) * 100
    return percents.toFixed(2)
  }
}





export default AsidePanel