
import clsx from "clsx"

import { useAtom } from "jotai"

// modules
import { showLoginRegisterState } from "../../states/ShowLoginRegisterState"
import RegisterBox from "./RegisterBox"
import LoginBox from "./LoginBox"

// assets
import nekoImg from "../../assets/2403_NEKO.webp"



const LoginRegisterModal = () => {

  const [showLoginRegister, setShowLoginRegister] = useAtom(showLoginRegisterState)


  return (

    <div
      className={clsx("login-register-shading-container absolute top-0 left-0 w-full h-full bg-shd z-20 center-div",
      showLoginRegister==='none' && "!hidden")}
      onClick={ () => setShowLoginRegister('none') }
    >


      <div className="flex">
        {
        showLoginRegister == 'register'
        ? <RegisterBox/>
        : <LoginBox/>
        }
        <img className="w-[48vh] lg:w-[60vh] xl:w-[70vh] h-fit hidden md:block" src={nekoImg}/>
      </div>

    </div>

  )
}




export default LoginRegisterModal