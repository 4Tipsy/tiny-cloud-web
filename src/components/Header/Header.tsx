

import clsx from "clsx"
import { useAtomValue, useSetAtom } from "jotai"

// modules
import showAsideState from "../../states/ShowAsideState"
import { userState } from "../../states/UserState"
import { showLoginRegisterState } from "../../states/ShowLoginRegisterState"
import { showUserModalState } from "../../states/ShowUserModalState"

// assets
import SettingsIco from "../../assets/icons/settings_2.svg?react"
import SearchIco from "../../assets/icons/search.svg?react"
import UserIco from "../../assets/icons/user-ico.svg?react"




const Header = () => {



  const setShowAside = useSetAtom(showAsideState)


  return (
    <header className="w-full bg-mg1 border-b-2 border-glc h-[var(--header-height)] min-h-[var(--header-height)] grid grid-cols-[0.7fr_3fr_0.5fr] md:grid-cols-[1.4fr_1fr] lg:grid-cols-[3fr_1.4fr]">


      <div className="show-aside text-hlc border-r-2 border-glc center-div cursor-pointer hover:underline md:hidden" onClick={() => setShowAside(true)}>
        <div className="text-center">{'Menu'}</div>
      </div>


      <div className="search-section center-div">
        <div className="search-wrapper w-11/12 h-[50%] relative">
          <input type="text" placeholder="Search..." className="w-full h-full text-[length:var(--fz2)] text-ntw bg-mg2 border-2 border-glc rounded-[10px] px-4"/>

          <div className="absolute h-full top-0 -right-0 mr-4 flex items-center">
            <SettingsIco className="w-[var(--fz1)] h-[var(--fz1)] mr-2"/>
            <SearchIco className="w-[var(--fz1)] h-[var(--fz1)]"/>
          </div>
        </div>
      </div>


      <UserSection/>

    </header>
  )
}








const UserSection = () => {


  const user = useAtomValue(userState)
  const setShowLoginRegister = useSetAtom(showLoginRegisterState)
  const setShowUserModal = useSetAtom(showUserModalState)


  return (
    <div className="user-section center-div text-ntw h-full text-[length:var(--fz1)]">
      <div className={clsx("user-wrapper flex flex-col md:flex-row items-center h-[60%]", user && "cursor-pointer hover:underline")}
      
      onClick={ () => user && setShowUserModal(true) }
      >
        

        { user ?
          <>
            <div><UserIco className="h-[var(--fz1)] w-[var(--fz1)] hidden md:block"/></div>
            <div className="ml-[0.5vw] hidden md:block">{user.user_name}</div>
            <div className="ml-[0.5vw] mr-[1vw] hidden md:block">
              {
                user.verified
                ? <span className="text-hlc">[verified]</span>
                : <span className="text-erc">[unverified]</span>
              }
            </div>
            <UserAvatar/>
          </>


          /* if no user */:
          <>
            <div><UserIco className="h-[var(--fz1)] w-[var(--fz1)] hidden md:block"/></div>
            <div className="ml-[0.5vw] hover:underline cursor-pointer" onClick={() => setShowLoginRegister('register')}>Register</div>
            <pre className="text-[length:var(--fz1)] hidden md:block"> / </pre>
            <div className="ml-[0.5vw] mr-[1vw] hover:underline cursor-pointer" onClick={() => setShowLoginRegister('login')}>Sign-in</div>
          </>
        }

      </div>
    </div>
  )
}






const UserAvatar = () => {

  return (
    <img src={window.SERVER_RAW_URL+'/api/user-service/get-user-img'} alt="" 
    className="w-[60px] aspect-square rounded-[50%] mr-5 border-2 border-ntw"/>
  )
}






export default Header