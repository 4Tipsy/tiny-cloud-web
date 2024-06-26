
import { useState, useEffect } from "react"
import { useSetAtom } from "jotai"

// modules
import { showLoginRegisterState } from "../../states/ShowLoginRegisterState"



const RegisterBox = () => {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [userNameValidError, setUserNameValidError] = useState<string>('')
  const [emailValidError, setEmailValidError] = useState<string>('')
  const [passwordValidError, setPasswordValidError] = useState<string>('')
  const [password2ValidError, setPassword2ValidError] = useState<string>('')

  const [registerRequestResult, setRegisterRequestResult] = useState<any | null>(null)


  // 4 crutch
  const setShowLoginRegister = useSetAtom(showLoginRegisterState)




  useEffect(() => {
    
    return () => {
      setEmailValidError('')
      setPasswordValidError('')
      setRegisterRequestResult(null)
    }

  }, []);




  return (
    <div className="register-box w-[80vw] md:w-[45vh] flex flex-col items-center rounded-sm"
    onClick={e => e.stopPropagation()}>

      <div className="flex flex-col bg-mg2 text-ntw w-full h-min px-8 py-4">


        <div className="my-3">Enter user_name</div>
        <input type="text" placeholder="user_name" className="p-1 text-mg2"
          value={userName} onChange={ e => setUserName(e.target.value) }
        />
        <div className="text-erc mt-1">&nbsp;{userNameValidError}</div>


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


        <div className="my-3">Repeat password</div>
        <input type="password" className="p-1 text-mg2"
          value={password2} onChange={ e => setPassword2(e.target.value) }
        />
        <div className="text-erc mt-1">&nbsp;{password2ValidError}</div>



        <div className="bg-hlc text-mg2 rounded font-bold mt-4 center-div py-2 cursor-pointer hover:underline"
        onClick={ () => handleRegisterRequest() }
        >Register</div>
    
      </div>



      <div className="w-[90%] mt-3 text-end">
        {
          registerRequestResult === null
          ? <></>

          : registerRequestResult.result === 'error'
          ? <div className="text-erc">{registerRequestResult.error}</div>

          : <div className="text-hlc">{'Success <3'}</div>
        }
      </div>

      <div className="gap w-full flex-grow"
      onClick={ () => setShowLoginRegister('none') }/>

    </div>
  )









  function validateFormAndGetPermission(): boolean {

    let allowedToContinue = true


    // name field validation
    if (userName.length === 0) {
      allowedToContinue = false
      setUserNameValidError('*Fill all the inputs')

    } else {
      setUserNameValidError('')
    }


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


    // password2 field check
    if (password2.length === 0) {
      allowedToContinue = false
      setPassword2ValidError('*Fill all the inputs')

    } else if (password2!== password) {
      allowedToContinue = false
      setPassword2ValidError('*Passwords do not match')

    } else {
      setPassword2ValidError('')
    }




    return allowedToContinue
  }




  function handleRegisterRequest() {

    // validate form and get permission
    if (!validateFormAndGetPermission()) {
      return
    }


    const reqUrl = window.SERVER_RAW_URL + "/api/user-service/register"
  
    const reqBody = {
      user_email: email,
      password: password,
      user_name: userName,
    }

    const reqOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    }


    // make request
    fetch(reqUrl, reqOptions)
    .then(async (res) => {
      const resData = await res.json()
      setRegisterRequestResult(resData)

    })

    // if not server handled error
    .catch((err: Error) => {
      setRegisterRequestResult({'result': 'error', 'error': err.message})
    })

  }





}




export default RegisterBox