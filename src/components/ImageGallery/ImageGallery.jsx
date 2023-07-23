
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"
import css from "./ImageGallery.module.css"

export const ImageGallery = ({pictures, onImgClick}) => {

    return (
      <ul className={css.gallery}>
        <ImageGalleryItem pictures={pictures} onImgClick={onImgClick} />
      </ul>
    )
}


