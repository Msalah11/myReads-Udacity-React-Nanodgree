import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";

import Layout from '../components/layouts/Layout';
import BookList from '../components/pages/home/BooksList';
import BookSearch from '../components/pages/search/BookSearch';

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Route path='/' exact component={BookList} />
                    <Route path='/search' component={BookSearch} />
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
