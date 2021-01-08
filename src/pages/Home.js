import React, { useEffect, useState } from 'react';
import { getBooks } from '../actions/booksAction';
import BookItem from '../components/BookItem';
import { Grid } from '@material-ui/core';
import Page from '../components/Page';

const Home = () => {

  const [books, setBooks] = useState([]);

  async function initBooks() {
    getBooks()
      .then((books) => setBooks(books));
  }

  useEffect(() => {
    initBooks();
  }, []);

  return (
    <Page>
      <Grid
        container
        justify="center"
      >
          <div style={{ marginTop: 20, padding: 30 }}>
            <Grid container spacing={10} justify="center">
              {books && books.length > 0 && (
                books.map(book => (
                <BookItem book={book} key={book.id} initBooks={initBooks}/>
                ))
              )}
            </Grid>
          </div>
      </Grid>
    </Page>
  );
}

export default Home;
