
import React, { Component } from "react";
import Notiflix from 'notiflix';

import { fetchPhotosByKeyword } from "../services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal"

export class App extends Component {
  state = {
    isLoading: false,
    keyword: "",
    pictures: [],
    showMoreButton: false,
    pageNum: 1,
    largeImg: '',
  };

  async componentDidUpdate(_, prevState) {
    const { keyword, pageNum } = this.state;
    if (prevState.keyword !== keyword || prevState.pageNum !== pageNum) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchPhotosByKeyword(keyword, pageNum);
        const pictures = response.hits;
        const totalPictures = response.totalHits;
        const totalPages = Math.ceil(totalPictures / 12);
        if (pictures.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
          this.setState((prevState) => ({
            pictures: pageNum === 1 ? pictures : [...prevState.pictures, ...pictures],
            showMoreButton: totalPictures > 12 && totalPages > pageNum,
          }));
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSearch = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.elements.keyword.value.trim();

    if (keyword === '') {
      return;
    }

    this.setState({
      keyword,
      pageNum: 1,
      showMoreButton: false,
      pictures: [],
    });

    e.currentTarget.reset();
  };

  onLoadMore = () => {
    this.setState((prevState) => ({
      pageNum: prevState.pageNum + 1,
    }));
  };

  onImgClick = (e) => {
    const largeImg = e.currentTarget.getAttribute('data-large')
    this.setState({
      largeImg,
    });
  }

  onModalClose = () => {
    this.setState({
      largeImg: '',
    })
  }


  render() {
    const { showMoreButton, isLoading, pictures, largeImg } = this.state;


    return (
      <div>
        <Searchbar onSearch={this.onSearch} />
        <ImageGallery pictures={pictures} onImgClick={this.onImgClick} />
        {isLoading && <Loader />}
        {showMoreButton && <Button onLoadMore={this.onLoadMore} />}
        {largeImg && <Modal largeImg={largeImg} onModalClose={this.onModalClose} />}
        </div>
    );
  }
}


