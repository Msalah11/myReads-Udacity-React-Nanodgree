import React from 'react';

class BookDetails extends React.Component{
    render() {
        console.log('props', this.props);
        let book = this.props.book;
        const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/128.png';

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={e => this.props.handleBookShelf(book, e.target.value)} value={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        );
    }
}

export default BookDetails