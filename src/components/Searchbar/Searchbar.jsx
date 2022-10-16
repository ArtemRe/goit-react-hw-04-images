import { useState} from 'react';
import {
  Header,
  Form,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.module';



export  function Searchbar({onSearch}) {
  const [query, setQuery] = useState('');
 
const handleChange = e => {
    setQuery(e.target.value.toLowerCase() );
  };

  const handelSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };


  return (
      <Header>
        <Form onSubmit={handelSubmit}>
          <SearchFormButton type="submit">
            <span>Search</span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </Form>
      </Header>
    );
}

