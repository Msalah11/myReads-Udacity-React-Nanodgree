import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';

import BookList from '../components/pages/home/BooksList';
import BookSearch from '../components/pages/search/BookSearch';
import Layout from "../components/layouts/Layout";

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Route path='/' exact component={BookList} />
                    <Route path='/search' component={BookSearch}/>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
