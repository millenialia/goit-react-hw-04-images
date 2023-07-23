
import { useEffect, useState } from "react";
import Notiflix from 'notiflix';

import { fetchPhotosByKeyword } from "../services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal"

export const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [pictures, setPictures] = useState([])
  const [showMoreButton, setShowMoreButton] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [largeImg, setLargeImg] = useState("")




  // async componentDidUpdate(_, prevState) {
  //   const { keyword, pageNum } = this.state;
  //   if (prevState.keyword !== keyword || prevState.pageNum !== pageNum) {
  //     this.setState({ isLoading: true });
  //     try {
  //       const response = await fetchPhotosByKeyword(keyword, pageNum);
  //       const pictures = response.hits;
  //       const totalPictures = response.totalHits;
  //       const totalPages = Math.ceil(totalPictures / 12);
  //       if (pictures.length === 0) {
  //         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  //       } else {
  //         this.setState((prevState) => ({
  //           pictures: pageNum === 1 ? pictures : [...prevState.pictures, ...pictures],
  //           showMoreButton: totalPictures > 12 && totalPages > pageNum,
  //         }));
  //       }
  //     } catch (error) {
  //       setError({ error })
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  // }

  useEffect(() => {

    const fetchPhotos = async () => {
      setIsLoading(true);
       try {

        const response = await fetchPhotosByKeyword(keyword, pageNum);
        const pictures = response.hits;
        const totalPictures = response.totalHits;
        const totalPages = Math.ceil(totalPictures / 12);
        if (pictures.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
          setShowMoreButton(totalPictures > 12 && totalPages > pageNum)
          setPictures(prevState => pageNum === 1 ? pictures : [...prevState, ...pictures])
        }
       } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }

    if (keyword === '') {
      return;
    } else {
      fetchPhotos()
    }

  }, [keyword, pageNum])

  const onSearch = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.elements.keyword.value.trim();

    setKeyword(keyword);
    setPageNum(1);
    setShowMoreButton(false);
    setPictures([])

    e.currentTarget.reset();
  };

  const onLoadMore = () => {
    setPageNum(pageNum + 1)
  };

  const onImgClick = (e) => {
    const largeImg = e.currentTarget.getAttribute('data-large')
    setLargeImg(largeImg)
  }



  const onModalClose = () => {
    setLargeImg("")
  }


    return (
      <div>
        <Searchbar onSearch={onSearch} />
        <ImageGallery pictures={pictures} onImgClick={onImgClick} />
        {isLoading && <Loader />}
        {showMoreButton && <Button onLoadMore={onLoadMore} />}
        {largeImg && <Modal largeImg={largeImg} onModalClose={onModalClose} />}
        </div>
    );

}


