

import * as React from 'react'
import clsx from "clsx"
import { useAtom, useAtomValue } from 'jotai'




// modules
import { fileFieldState, FileFieldValues } from '../../states/FsPathState'
import { userState } from '../../states/UserState'



type AsideBtnProps = {
  children: React.ReactNode;
  text: string;
  representedFileField: FileFieldValues;
}

const AsideBtn = ({children, text, representedFileField}: AsideBtnProps) => {


  const [fileField, setFileField] = useAtom(fileFieldState)
  const user = useAtomValue(userState)




  return (
    <div className={clsx("text-[length:var(--fz2)] flex flex-row text-ntw w-full cursor-pointer hover:underline", 
    !user && "cursor-not-allowed",
    representedFileField===fileField && "!text-hlc")}
      onClick={() => user && setFileField(representedFileField)}
    >


      <div className="ico-container bg-mg2 h-12 aspect-square center-div rounded-l-[10px]">
        {children}
      </div>

      <div className="text-container bg-mg2 h-12 flex-grow flex items-center ml-1 pl-4 rounded-r-[10px]">{text}</div>


    </div>
  )
}



export default AsideBtn