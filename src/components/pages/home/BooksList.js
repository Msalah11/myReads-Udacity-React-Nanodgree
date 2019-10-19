import React from 'react';
import BookDetails from "../BookDetails";
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from '../../../services/BooksAPI'

class BooksList extends React.Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
    };

    loadBooks() {
        BooksAPI.getAll().then(resp => {
            const regExpCR = new RegExp(escapeRegExp('currentlyReading'));
            let currentlyReading = resp ? resp.filter(book => regExpCR.test(book.shelf)) : null;

            const regExpWTR = new RegExp(escapeRegExp('wantToRead'));
            let wantToRead = resp ? resp.filter(book => regExpWTR.test(book.shelf)) : null;

            const regExpR = new RegExp(escapeRegExp('read'));
            let read = resp ? resp.filter(book => regExpR.test(book.shelf)) : null;

            this.setState({currentlyReading, wantToRead, read});
        }, err => {
            console.error(err);
        });
    }
    componentDidMount() {
        this.loadBooks();
    }

    displayShelf(books, blockTitle) {
        return (
            <div className='list-books-content'>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{blockTitle}</h2>
                    {
                        books.length ?
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.map((book, index) =>
                                        <BookDetails key={index} book={book} handleBookShelf={this.handleBookShelf.bind(this)}></BookDetails>
                                    )}
                                </ol>
                            </div> : 'Loading'
                    }
                </div>
            </div>
        );
    }

    handleBookShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.loadBooks());
    }

    render() {
        return (
            <div>
                {this.displayShelf(this.state.currentlyReading, 'Currently Reading')}
                {this.displayShelf(this.state.wantToRead, 'Want To Read')}
                {this.displayShelf(this.state.read, 'Read')}

                <div className="open-search">
                    <Link
                        to='/search'
                    >
                        Add a book
                    </Link>
                </div>
            </div>
        );
    }
}

export default BooksList;