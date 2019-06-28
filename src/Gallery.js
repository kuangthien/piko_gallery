import React, { useEffect, useState } from 'react'
import { API_URL } from './config'
const log = console.log
const GalleryItem = props => {
  return (
    <div>
      <a href="#" className="d-block mb-4 h-100">
        <img className="img-fluid img-thumbnail" src={props.images.preview_webp.url} alt="" />
      </a>
    </div>
  )
}
const Gallery = () => {
  const [arrImages, setArrImages] = useState([])
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
      <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>

      <hr className="mt-2 mb-5" />

      <div className="row text-center text-lg-left">
        {displayArr &&
          displayArr.map((v, i) => {
            return (
              <div key={i} className="col-lg-3 col-md-4 col-6">
                <GalleryItem {...v} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Gallery
