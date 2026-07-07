import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gameService } from '../../services/api';
import type { Game } from '../../types';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const GamesList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const data = await gameService.getAll();
      setGames(data);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await gameService.delete(id);
        setGames(games.filter(g => g.id !== id));
      } catch (error) {
        console.error('Failed to delete game:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Games Management</h1>
        <Link to="/games/add" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add New Game
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Developer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {games.map((game) => (
              <tr key={game.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={game.image || 'https://via.placeholder.com/50'} alt={game.title} className="h-10 w-10 object-cover rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{game.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.genre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.developer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/games/edit/${game.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <FaEdit className="inline" />
                  </Link>
                  <button onClick={() => handleDelete(game.id)} className="text-red-600 hover:text-red-900">
                    <FaTrash className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GamesList;
