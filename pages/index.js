import { auth } from 'libs'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import PhoneInput from 'react-phone-input-2'
import Button from '@mui/material/Button'
import { Page } from 'components/Page'
import 'react-phone-input-2/lib/style.css'

export default function Home() {
  const { push } = useRouter()

  const [user, loading] = useAuthState(auth)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    if (!loading && !user) {
      push('/auth', '/auth', { shallow: true })
    } else {
      setEmail(user?.email ?? '')
      setPhone(user?.phoneNumber ?? '')
    }
  }, [loading, user])

  if (loading || !user) return null

  return (
    <Page>
      <Col>
        <Title>Profile</Title>
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
          disabled
          value={phone}
          onChange={phone => setPhone(phone)}
        />
        {/* <Button
          variant='contained'
          // onClick={updateUser}
        >
          Save
        </Button> */}
      </Col>
    </Page>

  )
}

const Title = styled.h1`
  margin: auto;
  margin-bottom: 32px;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
`
const Input = styled(TextField)`
  margin-bottom: 16px;
`
