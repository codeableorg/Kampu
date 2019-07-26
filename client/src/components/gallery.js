/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

function Gallery({ club }) {
  const [images, setImages] = React.useState([]);

  function getImagesReady(originalArray) {
    if (originalArray === null) return [];
    return originalArray.map(element => {
      return {
        original: element
      };
    });
  }
  console.log(club);

  React.useEffect(() => {
    setImages(getImagesReady(club ? club.image : []));
  }, [club]);

  return (
    <div
      css={{
        img: {
          objectFit: "cover",
          maxHeight: "45vw",
          "@media screen and (min-width: 530px)": {
            height: "300px"
          }
        }
      }}
    >
      <ImageGallery
        items={images}
        showBullets={true}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
      />
    </div>
  );
}

export default Gallery;
