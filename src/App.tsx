

import { useEffect, useState } from "react"
import { useSetAtom } from "jotai"


// modules
import Header from "./components/Header/Header"
import AsidePanel from "./components/AsidePanel/AsidePanel"
import FileManager from "./components/FileManager/FileManager"
import LoginRegisterModal from "./components/LoginRegisterModal/LoginRegisterModal"
import UserModal from "./components/UserModal/UserModal"
import FileUploader from "./components/FileUploader/FileUploader"
import ImgViewer from "./components/Viewers/ImgViewer"
import DragAndDrop from "./components/FileUploader/DragAndDrop"

import { userState, ifUserLoadingState } from "./states/UserState"
import { imgPreviewCacheState } from "./states/ImgPreviewCacheState"



const App = () => {


  const [showDragAndDrop, setShowDragAndDrop] = useState(false)

  const setImgPreviewCache = useSetAtom(imgPreviewCacheState)

  const setUser = useSetAtom(userState)
  const setIfUserLoading = useSetAtom(ifUserLoadingState)
  
  useEffect(() => {
    loadCurrentUser()

    return () => {
      setImgPreviewCache([])
    }

  }, [])



  return (
    <div className="APP w-screen h-screen flex flex-row font-sans overflow-hidden"
      onDragOver={ e => {e.preventDefault(); setShowDragAndDrop(true)} }
      onDragLeave={ e => {e.preventDefault(); setShowDragAndDrop(false)} }
    > {/* <-- APP'S BODY */}

      <LoginRegisterModal />
      <UserModal />
      <FileUploader />
      

      <AsidePanel />
      <div className="h-screen flex-grow flex flex-col">
        <Header />
        <FileManager />
      </div>

      <ImgViewer />
      <DragAndDrop showSelf={showDragAndDrop} setShowSelf={setShowDragAndDrop} />

    </div>
  )







  function loadCurrentUser() {

    const reqUrl = window.SERVER_RAW_URL + "/api/user-service/get-current-user"
  
    const reqOptions: RequestInit = {
      method: "GET",
      credentials: "include",
    }

    // make request
    fetch(reqUrl, reqOptions)
    .then(async (res) => {
      const resData = await res.json()


      if (res.ok) {
        // if ok
        setUser(resData.user)
        setIfUserLoading(false)

      } else {
        // if server handled error
        setIfUserLoading(false)
      }
    })
    // if not server handled error
    .catch((_: Error) => {
      setIfUserLoading(false)
    })
  
  }





}









export default App