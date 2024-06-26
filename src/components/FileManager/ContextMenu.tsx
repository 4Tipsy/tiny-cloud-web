

import { useEffect, useRef } from "react"




type menuOption = {
  label: string,
  handler: Function,
}

type contextMenuType = {
  cords: [number, number]
  isOpen: boolean,
  setIsOpen: Function,
  menuOptions: menuOption[],
}


const ContextMenu = ({cords, isOpen, setIsOpen, menuOptions}: contextMenuType) => {

  /* onClickOutside */
  const ref = useRef<HTMLDivElement>(null) // ref to this component as Node
  useEffect(() => {

    // will be performed on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // mount/unmount event
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [])
  /* /onClickOutside */






  return (
    <>{
      isOpen &&
      <div className="absolute z-10 text-ntw bg-mg1 border-glc border-[1px] overflow-hidden rounded" ref={ref}
      style={{left: cords[0]+'px', top: cords[1]+'px'}}>
        

        {
          menuOptions.map( ({label, handler}) => { return (
            <div className="hover:bg-mg2 px-6 py-2 cursor-pointer" key={label}
            onClick={ e => { e.stopPropagation(); handler() }}
            >{label}</div>
          )})
        }
        
      </div>
    }</>
  )
}


export default ContextMenu