import React from 'react';

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

export default GalleryItem;