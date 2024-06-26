

import clsx from "clsx"
import { useAtom, useAtomValue } from "jotai"
import { useState, useEffect} from "react"

// modules
import { imgViewerContentState } from "../../states/Viewers"
import { fileFieldState } from "../../states/FsPathState"




const ImgViewer = () => {

  const fileField = useAtomValue(fileFieldState)
  const [imgViewerContent, setImgViewerContent] = useAtom(imgViewerContentState)

  const [showZoom, setShowZoom] = useState(false)
  const [cursorCords, setCursorCords] = useState<[number, number]>([0, 0])
  const [zoomOnImgCords, setZoomOnImgCords] = useState<[number, number]>([0, 0])
  const [imgSize, setImgSize] = useState<[number, number]>([0, 0])

  const [_justOpened, _setJustOpened] = useState(true)


  useEffect(() => {
    if (imgViewerContent) {
      _setJustOpened(true)
    }
  }, [imgViewerContent])



  let urlToImg: string
  if (imgViewerContent) {

    urlToImg = window.SERVER_RAW_URL+`/api/utils-service/download-img-via-get-route?abs_path=${imgViewerContent?.abs_path}&file_field=${fileField.toLowerCase()}`
  } else {
    urlToImg = ''
  }


  return (
    <div
      className={clsx("absolute top-0 left-0 w-full h-full bg-shd z-20 center-div flex-col text-ntw",
      !imgViewerContent && "!hidden")}
      onClick={ () => setImgViewerContent(null) }
    >


      <div className="max-w-[80%] max-h-[80%] object-contain center-div">
        <img alt={imgViewerContent?.name} className="max-h-full max-w-full"
          src={urlToImg}

          onMouseEnter={ e => {
            setShowZoom(true)
            const {width, height} = e.currentTarget.getBoundingClientRect()
            setImgSize([width, height])            
          }}

          onMouseMove={ e => {
            const {top, left} = e.currentTarget.getBoundingClientRect()
            const x = e.pageX - left - window.pageXOffset
            const y = e.pageY - top - window.pageYOffset
            setZoomOnImgCords([x, y])
        
            setCursorCords([e.pageX, e.pageY])
            _setJustOpened(false)
          }}

          onMouseLeave={ () => setShowZoom(false) }
        />
      </div>

      <div className="mt-3 text-[22px] text-center">{imgViewerContent?.name}</div>



      <Zoom />

    </div>
  )



  function Zoom() {

    const zoomLevel = 3
    const zoomCssSize = "min(30vw,400px)"

    
    return (

      <div className={clsx("zoom absolute pointer-events-none bg-no-repeat border-hlc border-2 aspect-square rounded-sm",
      !showZoom && "!hidden", _justOpened && "!hidden")}

      style={{
        height: zoomCssSize,

        left: `calc(${cursorCords[0]}px - ${zoomCssSize}  / 2)`,
        top: `calc(${cursorCords[1]}px - ${zoomCssSize} / 2)`,


        backgroundPositionX: `calc(${-zoomOnImgCords[0] * zoomLevel}px + ${zoomCssSize} / 2)`,
        backgroundPositionY: `calc(${-zoomOnImgCords[1] * zoomLevel}px + ${zoomCssSize} / 2)`,

        backgroundImage: `url(${urlToImg})`,
        backgroundSize: `${imgSize[0] * zoomLevel}px ${imgSize[1] * zoomLevel}px`,
      }}/>

    )
  }





}



export default ImgViewer