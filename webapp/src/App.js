import React, {Component} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
