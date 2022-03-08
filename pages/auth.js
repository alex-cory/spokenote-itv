import { useEffect, useState, useRef } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import useSSR from 'use-ssr'
import styled from '@emotion/styled'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import PhoneCodeSheet from 'components/PhoneCodeSheet'
import PhoneInput from 'react-phone-input-2'
import { phone as phoneValidator } from 'phone'
import 'react-phone-input-2/lib/style.css'

const auth = getAuth()


const AuthPage = () => {
  const [phone, setPhone] = useState('')
  // const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isPhoneCodeSheetOpen, setIsPhoneCodeSheetOpen] = useState(false)
  const isValid = useRef(false)
  const { isBrowser } = useSSR()
  useEffect(() => {
    if (isBrowser) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // console.log('SUBMITTED', response)
          }
        }, auth)
      } catch(err) {
        console.log('Recaptcha Error', err)
      }
    }
  }, [])

  // phone code login / signup
  const signInOrUp = async () => {
    console.log({ phone })
    if (!isValid.current) {
      return setError('Invalid Phone Number')
    }
    const confirmationResult = await signInWithPhoneNumber(auth, `+${phone}`, window.recaptchaVerifier).catch(error => {
      console.log('ERROR 🤯🤯🤯', { error, msg: error.message })
      // Error SMS not sent
      setError(error.message)
    })
    if (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult
      console.log('CODE SENT!', { confirmationResult })
      setIsPhoneCodeSheetOpen(true)
    }
  }

  return (
    <Page>
      <Col>
        <Title>Login or Signup</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {/* <Input
          label='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        /> */}
        <PhoneInput
          style={{ marginBottom: 16 }}
          country={'us'}
          value={phone}
          onChange={phone => {
            isValid.current = phoneValidator(phone).isValid
            console.log('IS VALID', isValid.current)
            setPhone(phone)
          }}
        />
        <Button
          id='sign-in-button'
          variant='contained'
          onClick={signInOrUp}
        >
          Send Code
        </Button>
        <PhoneCodeSheet 
          isOpen={isPhoneCodeSheetOpen}
          close={() => setIsPhoneCodeSheetOpen(false)}
        />
        <div id='g-signin2' style={{ display: 'none' }} />
      </Col>
    </Page>
  )
}

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  margin: auto;
  margin-bottom: 36px;
`

const Title = styled.h1`
  margin: auto;
  margin-bottom: 32px;
`

const Input = styled(TextField)`
  margin-bottom: 16px;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export default AuthPage