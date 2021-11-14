import React, {Component} from "react";
// TODO: User BrowserRouter for server base app
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import './assets/scss/custome.scss';

import Index from "./views/Index";


class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Index />} />

                    {/* Default route go to index */}
                    <Route element={<Index />} />
                </Routes>
            </Router>
       )
    }
}

export default App
