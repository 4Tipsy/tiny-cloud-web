

import clsx from "clsx"
import { useAtom, useAtomValue } from "jotai"


// modules
import { showUserModalState } from "../../states/ShowUserModalState"
import { userState } from "../../states/UserState"


const UserModal = () => {


  const [showUserModal, setShowUserModal] = useAtom(showUserModalState)
  const user = useAtomValue(userState)



  return (
    <div
    className={clsx("absolute top-0 left-0 w-full h-full bg-shd z-20 center-div text-ntw",
    !showUserModal && "!hidden")}
    onClick={ () => setShowUserModal(false) }
    >

      <div className="user-modal bg-mg2 px-6 py-4 center-div flex-col rounded-sm" onClick={ e => e.stopPropagation() }>

        <div className="flex items-center">


          <div className="w-[12vh] h-[12vh] rounded-[50%] border-4 border-ntw mr-5 relative cursor-pointer">
            <img className="rounded-[50%] w-full h-full" src={window.SERVER_RAW_URL+'/user-service/get-user-img'} alt="" />

            <div className="absolute z-10 w-full h-full top-0 left-0 center-div bg-shd rounded-[50%] opacity-0 hover:opacity-100">Change</div>
          </div>

          
          <div>
            <div className="text-[40px]">{user?.user_name}
            &nbsp;{/* <-- ' ' */}
            {user?.verified
            ? <span className="text-hlc">[verified]</span>
            : <span className="text-erc">[unverified]</span>
            }
            </div>
          </div>
        </div>





        <div className="flex justify-between flex-col md:flex-row">

            <div className="bg-glc text-nowrap rounded mx-3 mt-5 px-5 py-3 center-div cursor-pointer hover:underline"
              onClick={ () => {document.cookie = "a-token=; max-age=0"; document.location.reload()} }
            >Log out</div>
            <div className="bg-glc text-nowrap rounded mx-3 mt-5 px-5 py-3 center-div cursor-pointer hover:underline">Change user_name</div>
            <div className="bg-glc text-nowrap rounded mx-3 mt-5 px-5 py-3 center-div cursor-pointer hover:underline">Change email</div>

        </div>

        
      </div>


    </div> 
  )
}




export default UserModal