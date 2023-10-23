import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FeedsPage } from './pages/FeedsPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FeedDetailsPage } from './pages/FeedDetailsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/feeds' element={<FeedsPage />} />
      <Route path="/feeds/:id" element={<FeedDetailsPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
