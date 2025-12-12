import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Index from "./pages/Index";

const App: React.FC = () => (
  <BrowserRouter>
    <Index />
  </BrowserRouter>
);

export default App;
