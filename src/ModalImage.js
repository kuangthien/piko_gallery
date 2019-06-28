import React, { useState } from 'react'

const ModalImage = props => {
  const { urlShouldShow } = props
  const [loadSuccess, setLoadSuccess] = useState(false)
  const { handleCloseCallback: handleClose } = props
  return (
    urlShouldShow && (
      <>
        <style>{`
            html,body{
                overflow:hidden
            }
        `}</style>
        <p
          onClick={handleClose}
          style={{
            margin: 0,
            position: 'fixed',
            background: '#000',
            opacity: 0.7,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          }}
        />
        <b
          onClick={handleClose}
          style={{
            backgroundImage: `url(${urlShouldShow})`,
            backgroundSize: 'contain',
            backgroundPosition: '50%',
            backgroundRepeat: 'no-repeat',
            display: 'block',
            position: 'fixed',
            zIndex: 11,
            top: 0,
            left: 0,
            right: 0,
            height: '100vh',
          }}
        />
        <b
          className="text-light position-fixed d-block text-center"
          style={{
            zIndex: 10,
            width: '100%',
            top: '50%',
            left: 0,
            right: 0,
          }}>
          Loading...
        </b>
      </>
    )
  )
}

export default ModalImage
