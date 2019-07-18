/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

function Gallery() {
  const images = [
    {
      original:
        "https://pvpanthers.com/common/controls/image_handler.aspx?thumb_id=0&image_path=/images/2017/2/7/Soccer_Field_1.jpeg"
    },
    {
      original:
        "https://apelotear.com/media/canchas/8ECE298C-60A2-4E92-8A3A-C4C82EF948AF.jpeg"
    }
  ];

  return (
    <div
      css={{
        img: {
          objectFit: "cover",
          maxHeight: "45vw",
          "@media screen and (min-width: 530px)": {
            maxHeight: "300px"
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
