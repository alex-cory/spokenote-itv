import React, { forwardRef } from 'react'
import ModalSheet from 'react-modal-sheet'
import styled from '@emotion/styled'

const Sheet = forwardRef(({ id, isOpen, springConfig = {}, ...props }, ref) => {
  return (
    <StyledSheet
      ref={ref}
      springConfig={{
        type: 'spring',
        mass: 1,
        damping: 20,
        ...springConfig
      }}
      isOpen={isOpen}
      {...props}
    />
  )
})
Sheet.displayName = 'Sheet'
const StyledSheet = styled(ModalSheet)`
  .react-modal-sheet-backdrop {
    /* custom styles */
    background-color: transparent !important;
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }
  .react-modal-sheet-container {
    /* custom styles */
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #252f3f !important;
    border-top-right-radius: 28px !important;
    border-top-left-radius: 28px !important;
    box-shadow: none !important;
  }
  .react-modal-sheet-header {
    /* custom styles */
    height: 25px !important;
  }
  .react-modal-sheet-drag-indicator {
    /* custom styles */
    width: 24px !important;
    height: 2px !important;
  }
  .react-modal-sheet-content {
    /* custom styles */
  }
`
Sheet.Container = ModalSheet.Container
Sheet.Header = ModalSheet.Header
Sheet.Content = ModalSheet.Content
Sheet.Backdrop = ModalSheet.Backdrop

export default Sheet
