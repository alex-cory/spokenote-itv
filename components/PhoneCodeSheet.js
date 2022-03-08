import { useRef } from 'react'
import styled from '@emotion/styled'
import { isAndroid } from 'react-device-detect'
import ReactCodeInput from 'react-code-input'

import Sheet from 'components/Sheet'
import { useRouter } from 'next/router'

const isAddedToHomescreen = (() => {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return false
  if (isAndroid) return window.matchMedia('(display-mode: fullscreen)').matches
  return window.navigator.standalone
})()


export default function PhoneCodeSheet({
  close,
  onVerifyComplete,
  isOpen,
}) {
  const { push } = useRouter()
  const r = useRef()
  if (r?.current) {
    r?.current?.textInput?.[0]?.setAttribute('autocomplete', 'one-time-code')
  }

  return <>
    <TheSheet
      isOpen={isOpen}
      snapPoints={[isAddedToHomescreen ? 224 : 200, 0]}
      onClose={() => close()}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content >
          <Title>Verify Phone Number</Title>
          <SubTitle>Type in the code that was just texted to you</SubTitle>
          <ReactCodeInput
            ref={r}
            type='number'
            fields={6}
            onChange={async code => {
              if (code?.length === 6) {
                console.log('CODE 🔥🔥🔥', code)
                const result = await window.confirmationResult.confirm(code).catch(error => {
                  // User couldn't sign in (bad verification code?)
                })
                const user = result.user
                console.log('RESULT 🔥🔥🔥', result)
                if (result) {
                  onVerifyComplete && onVerifyComplete(user)
                  close && close()
                  push('/', '/', { shallow: true })
                }
              }
            }}
            // autoFocus
            autoComplete='one-time-code'
            inputMode='numeric'
            inputStyle={{
              textAlign: 'center',
              border: '1px solid #8C8FA4',
              backgroundColor: '#8C8FA4',
              fontSize: 50,
              color: 'white',
              height: 72,
              width: '10vw',
              maxWidth: 56,
              borderRadius: 12,
              margin: '0 8px'
            }}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onClick={() => close && close()} />
    </TheSheet>
  </>
}

const Title = styled.div`
  color: white;
`

const SubTitle = styled.div`
  color: white;
  margin: 1em 0 2em 0;
`

const TheSheet = styled(Sheet)`
  .react-modal-sheet-container {
    padding: 0px 20px 8px 20px;
  }
`
