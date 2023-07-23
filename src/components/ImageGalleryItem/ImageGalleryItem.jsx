import css from "./ImageGalleryItem.module.css"

export const ImageGalleryItem = ({ pictures, onImgClick }) => {
    return (
      pictures.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <li className={css.galleryItem} key={id}>
            <img src={webformatURL} alt="img" className={css.galleryItemImage} data-large={largeImageURL} onClick={onImgClick}/>
          </li>
        )
      })
    )

}
