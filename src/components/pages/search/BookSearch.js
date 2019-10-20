import React from 'react';
import BookDetails from "../BookDetails";
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../../services/BooksAPI';

class BookSearch extends React.Component {
    state = {
        books: [],
        query: '',
        allBooks: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ allBooks: books })
        })
    }

    handleUpdateQuery(query) {
        if (query) {
            BooksAPI.search(query).then(books => {
                let queryBooks; let exists;
                if(books.error) {
                    return this.setState({ books: [] });
                }
                // eslint-disable-next-line no-unused-expressions
                queryBooks = books ? books : [];
                // eslint-disable-next-line array-callback-return
                queryBooks.map((book) => {
                    exists = this.state.allBooks.find((ab) => ab.id === book.id);
                    book.shelf = 'none';

                    if (exists) {
                        book.shelf = exists.shelf
                    }
                });
                this.setState({ books: queryBooks })
            });
        }
        this.setState({ query });
    }

    handleBookShelf(book, shelf) {
        BooksAPI.update(book, shelf)
            .then(() => shelf !== 'none' ? alert(`${book.title} has been added to your shelf!`) : null)
            .catch(() => alert('Something went wrong! Please try again!'));
    }

    renderSearchResults() {
        const { books, query } = this.state;

        if (query) {
            return this.state.books.error ?
                <div>No results found</div>
                : books.map((book, index) => {
                    return (
                        <BookDetails
                            key={index}
                            book={book}
                            handleBookShelf={this.handleBookShelf.bind(this)}
                        />
                    );
                });
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={e => this.handleUpdateQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.renderSearchResults()}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookSearch;