import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateSnippet from './components/CreateSnippet';
import ViewSnippet from './components/ViewSnippet';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 w-full">
        <main className="w-full">
          <Routes>
            <Route path="/" element={<CreateSnippet />} />
            <Route path="/snippet/:id" element={<ViewSnippet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
