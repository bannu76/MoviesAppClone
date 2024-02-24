import {useState} from 'react'
import {Redirect} from "react-router-dom"
import Cookies from 'js-cookie'
import {
  LoginContainer,
  Heading,
  Form,
  InputLabel,
  Input,
  LoginButton,
  WebSiteLogo,
  FormContainer,
  ErrorMsg,
} from './StyledComponent'
import Header from '../Header'

const Login = props => {
  console.log('login')

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  console.log(name)
  const userInput = event => {
    setName(event.target.value)
  }
  const passwordInput = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  console.log('login')

  const submitLoginForm = async event => {
    event.preventDefault()
    if (name === '' || password === '') {
      setErrorMsg('Username or Password is Invalid')
    } else {
      const url = 'https://apis.ccbp.in/login'
      const userDetails = {username: name, password}

      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(url, options)
      const reponseData = await response.json()
      if (response.ok) {
        const jwtToken = reponseData.jwt_token
        onSubmitSuccess(jwtToken)
      } else {
        setErrorMsg('Username or Password is Invalid')
      }
    }
  }

   const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

  return (
    <LoginContainer>
      <WebSiteLogo
        src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708155229/Group_7399_wdd87l.png"
        alt="login website logo"
      />
      <FormContainer onSubmit={submitLoginForm}>
        <Form>
          <Heading>Login</Heading>
          <InputLabel htmlFor="username">USERNAME</InputLabel>
          <Input onChange={userInput} value={name} id="username" type="text" />
          <InputLabel htmlFor="password">PASSWORD</InputLabel>
          <Input
            onChange={passwordInput}
            value={password}
            id="password"
            type="password"
          />
          <LoginButton>Sign in</LoginButton>
          <ErrorMsg>{errorMsg}</ErrorMsg>
        </Form>
      </FormContainer>
    </LoginContainer>
  )
}

export default Login
