import React, { useEffect, useState } from 'react'
import { API_URL } from './config'
import ModalImage from './ModalImage'
const log = console.log

const GalleryItem = props => {
  const { tapHandlerCallback: tapHandler } = props
  return (
    <div className="galItem">
      <div className="d-block mb-4 h-100">
        <b
          onClick={() => tapHandler(props.images.original.url)}
          className="img"
          style={{
            backgroundImage: `url(${props.images.fixed_width.url})`,
          }}
        />
        {props.user && (
          <b className="u d-block text-left mt-2">
            <b
              className="u-avat mr-1"
              style={{
                borderRadius: '50%',
                border: '2px solid #fff',
                backgroundPosition: '50%',
                backgroundSize: 'cover',
                height: 24,
                width: 24,
                display: 'inline-block',
                verticalAlign: 'middle',
                backgroundImage: `url(${props.user.avatar_url})`,
              }}
            />
            <b className="small">{props.user.display_name}</b>
          </b>
        )}
      </div>
    </div>
  )
}
const Gallery = () => {
  const tapHandler = url => {
    setShowImageFullUrl(url)
  }
  const [arrImages, setArrImages] = useState([])
  const [showImageFullUrl, setShowImageFullUrl] = useState(null)
  const handleClose = () => {
    log('close')
    setShowImageFullUrl(null)
  }
  useEffect(() => {
    fetch(API_URL)
      .then(rs => rs.text())
      .then(data => {
        log(JSON.parse(data))
        setArrImages(JSON.parse(data).data)
      })
  }, [])
  const displayArr = arrImages || []
  return (
    <div className="container">
      <ModalImage urlShouldShow={showImageFullUrl} handleCloseCallback={handleClose} />

      <style>
        {`
            html,body{
                background: #eee;
                min-height:100%;
             }
          .galItem .img{
              height: 200px;
              width:100%;
              background-size:cover;
              background-position: 50%;
              display:block;
              border: 8px solid #fff;
              border-radius: 2px;
              box-shadow: 0 0 2px #ccc
          }
          
        `}
      </style>
      <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>

      <hr className="mt-2 mb-5" />

      <div className="row text-center text-lg-left">
        {displayArr &&
          displayArr.map((v, i) => {
            return (
              <div key={i} className="col-lg-3 col-md-4 col-6">
                <GalleryItem {...v} tapHandlerCallback={tapHandler} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Gallery
