import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GamesList from './pages/Games/GamesList';
import GameForm from './pages/Games/GameForm';
import UsersList from './pages/Users/UsersList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div className="text-2xl font-bold">Welcome to L4G Dashboard</div>} />
          
          {/* Games Routes */}
          <Route path="games" element={<GamesList />} />
          <Route path="games/add" element={<GameForm />} />
          <Route path="games/edit/:id" element={<GameForm />} />
          
          {/* Users Routes */}
          <Route path="users" element={<UsersList />} />
          
          {/* Tournaments Placeholder */}
          <Route path="tournaments" element={<div>Tournaments Management coming soon...</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
