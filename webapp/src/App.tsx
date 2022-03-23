import { FC } from 'react';
import { Helmet } from 'react-helmet';
// TODO: User BrowserRouter for server base app
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/scss/custome.scss';

import DApp from './views/Dapp';

const App: FC = () => (
  <>
    <Helmet>
      <title>FELT - Federated Learning Token</title>
      <meta
        name="description"
        content="Tool for running federated learning on blockchain."
      />
      <meta
        name="keywords"
        content="Federated Learning, Blockchain, Token, Solidity, Machine Learning"
      />
      <meta name="author" content="Břetislav Hájek" />
    </Helmet>
    <Router>
      <Routes>
        <Route path="/*" element={<DApp />} />
      </Routes>
    </Router>
  </>
);

export default App;
