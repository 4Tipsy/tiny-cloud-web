

import { useState, useEffect, useRef } from "react"
import clsx from "clsx"

// modules
import { SortByType } from "./FileManager"

// assets
import ArrowDownIco from "../../assets/icons/arrow-down-bold.svg?react"





const SortByDropdown = ({sortBy, setSortBy}: {sortBy: SortByType, setSortBy: Function}) => {


  /* onClickOutside */
  const ref = useRef<HTMLDivElement>(null) // ref to this component as Node
  useEffect(() => {

    // will be performed on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    };

    // mount/unmount event
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);
  /* /onClickOutside */




  const [isOpen, setIsOpen] = useState(false)




  return (
    <div className="relative" ref={ref}>

      <div className="h-full w-full flex items-center justify-between px-2 border-2 border-glc rounded-[10px] cursor-pointer"
        onClick={ () => setIsOpen(!isOpen) }
      >
        {
          sortBy === "type"
          ? "Type"

          : sortBy === "name"
          ? "Name"

          : sortBy === "smaller"
          ? "Smaller"

          : sortBy === "bigger"
          ? "Bigger"

          : "..."
        }
        <ArrowDownIco className={clsx("ml-[0.5vw]", isOpen && "rotate-180")}/>
      </div>


      { isOpen &&

        <div className="options absolute w-full z-10 rounded-[10px] overflow-hidden">


          <div className={clsx("bg-glc py-[0.2vw] pl-[0.4vw] hover:bg-hlc cursor-pointer", sortBy==="type" && "underline")}
          onClick={ () => { setSortBy("type"); setIsOpen(false) }}
          >Type</div>


          <div className={clsx("bg-glc py-[0.2vw] pl-[0.4vw] hover:bg-hlc cursor-pointer", sortBy==="name" && "underline")}
          onClick={ () => { setSortBy("name"); setIsOpen(false) }}
          >Name</div>


          <div className={clsx("bg-glc py-[0.2vw] pl-[0.4vw] hover:bg-hlc cursor-pointer", sortBy==="smaller" && "underline")}
          onClick={ () => { setSortBy("smaller"); setIsOpen(false) }}
          >Smaller</div>


          <div className={clsx("bg-glc py-[0.2vw] pl-[0.4vw] hover:bg-hlc cursor-pointer", sortBy==="bigger" && "underline")}
          onClick={ () => { setSortBy("bigger"); setIsOpen(false) }}
          >Bigger</div>


        </div>

      }


    </div>
  )
}




export default SortByDropdown