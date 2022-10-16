
import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import * as Api from '../components/API/Api';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Container } from './App.module';
import Loader from './Loader/Loader';




export  function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) {
      return ;
    }


    
    const loadImages = async (query, page) => {
      setIsLoading(true);
      

    try {
        const data = await Api.fetchImages(query, page);
        setItems(prevState => [...prevState, ...data.hits]);
        setTotalPages(data.totalHits);
    }
    catch (error) {
      setError(error);
    }
    finally {
        setIsLoading(false);
      }
    };

  loadImages(query, page);
  }, [query, page]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setItems([]);
    setPage(1);
    setTotalPages(0);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const onCloseModal = () => {
    setLargeImageURL('');
  };

  return (
    <Container>
      <Searchbar onSearch={handleSearchSubmit} />
      {error && <p>Sorry, there are no images matching   {query}. Please try again.</p>}

      {items.length > 0 && <ImageGallery items={items} onClick={onOpenModal} />}
      {isLoading && <Loader />}

      {page < Math.ceil(totalPages / 12) && <Button onLoadMore={onLoadMore} />}
      {largeImageURL && (
        <Modal onClose={onCloseModal} largeImageURL={largeImageURL} />
      )}
    </Container>
  );
}