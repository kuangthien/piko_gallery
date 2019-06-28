import React, { useEffect, useState } from 'react'
import { API_URL } from './config'
import ModalImage from './ModalImage'
import GalleryItem from './GalleryItem'
import InfiniteScroll from 'react-infinite-scroller'

const log = console.log

const Gallery = () => {
  const tapHandler = url => {
    setShowImageFullUrl(url)
  }
  const [arrImages, setArrImages] = useState([])
  const [showImageFullUrl, setShowImageFullUrl] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const handleClose = () => {
    log('close')
    setShowImageFullUrl(null)
  }
  const cmdFetch = url => {
    const FETCH_URL = url || API_URL
    fetch(FETCH_URL)
      .then(rs => rs.text())
      .then(data => {
        log(JSON.parse(data))
        setArrImages([...arrImages, ...JSON.parse(data).data])
        setCurrentPage(currentPage + 1)
      })
  }
  useEffect(() => {
    //cmdFetch()
  }, [])
  const displayArr = arrImages || []
  return (
    <>
      <ModalImage urlShouldShow={showImageFullUrl} handleCloseCallback={handleClose} />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          log('loadmore')
          cmdFetch(API_URL + `&offset=${currentPage + 1}`)
        }}
        hasMore={true}
        loader={
          <div className="text-center" key={0}>
            Loading ...
          </div>
        }>
        <div className="container">
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
      </InfiniteScroll>
    </>
  )
}

export default Gallery
