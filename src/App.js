import './App.scss';
import { Routes, Route} from "react-router-dom"
import Blog from './pages/Blog';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/blog" element={<Blog></Blog>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>} />
      </Routes>
    </div>
  );
}

export default App;
