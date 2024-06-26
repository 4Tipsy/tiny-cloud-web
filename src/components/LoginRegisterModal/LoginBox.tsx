

import { useState, useEffect } from "react"
import { useSetAtom } from "jotai"

// modules
import { showLoginRegisterState } from "../../states/ShowLoginRegisterState"



const LoginBox = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailValidError, setEmailValidError] = useState<string>('')
  const [passwordValidError, setPasswordValidError] = useState<string>('')

  const [loginRequestResult, setLoginRequestResult] = useState<any | null>(null)


  // 4 crutch
  const setShowLoginRegister = useSetAtom(showLoginRegisterState)



  useEffect(() => {
    
    return () => {
      setEmailValidError('')
      setPasswordValidError('')
      setLoginRequestResult(null)
    }

  }, []);




  return (
    <div className="login-box w-[80vw] md:w-[45vh] flex flex-col items-center rounded-sm"
    onClick={e => e.stopPropagation()}>

      <div className="flex flex-col bg-mg2 text-ntw w-full h-min px-8 py-4">


        <div className="my-3">Enter your email</div>
        <input type="text" placeholder="example@mail.com" className="p-1 text-mg2"
          value={email} onChange={ e => setEmail(e.target.value) }
        />
        <div className="text-erc mt-1">&nbsp;{emailValidError}</div>


        <div className="my-3">Enter password</div>
        <input type="password" className="p-1 text-mg2"
          value={password} onChange={ e => setPassword(e.target.value) }
        />
        <div className="text-erc mt-1">&nbsp;{passwordValidError}</div>


        <div className="bg-hlc text-mg2 rounded font-bold mt-4 center-div py-2 cursor-pointer hover:underline"
        onClick={ () => handleLoginRequest() }
        >Sign in</div>
    
      </div>



      <div className="w-[90%] mt-3 text-end">
        {
          loginRequestResult === null
          ? <></>

          : loginRequestResult.result === 'error'
          ? <div className="text-erc">{loginRequestResult.error}</div>

          : <div className="text-hlc">{'Success <3'}</div>
        }
      </div>

      <div className="gap w-full flex-grow"
      onClick={ () => setShowLoginRegister('none') }/>

    </div>
  )





  function validateFormAndGetPermission(): boolean {

    let allowedToContinue = true


    // email field check
    if (email.length === 0) {
      allowedToContinue = false
      setEmailValidError('*Fill all the inputs')

    } else if (!email.match(/^[^@\s]+@[^@\s]+\.[a-zA-Z0-9]+$/)) {
      allowedToContinue = false
      setEmailValidError('*Invalid email')

    } else {
      setEmailValidError('')
    }


    // password field check
    if (password.length === 0) {
      allowedToContinue = false
      setPasswordValidError('*Fill all the inputs')

    } else {
      setPasswordValidError('')
    }


    return allowedToContinue
  }





  function handleLoginRequest() {

    // validate form and get permission
    if (!validateFormAndGetPermission()) {
      return
    }


    const reqUrl = window.SERVER_RAW_URL + "/api/user-service/login"
  
    const reqBody = {
      user_email: email,
      password: password,
    }

    const reqOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(reqBody),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }


    // make request
    fetch(reqUrl, reqOptions)
    .then(async (res) => {
      const resData = await res.json()
      setLoginRequestResult(resData)


      if (res.ok) {document.location.reload()}
    })

    // if not server handled error
    .catch((err: Error) => {
      setLoginRequestResult({'result': 'error', 'error': err.message})
    })

  }






}





export default LoginBox