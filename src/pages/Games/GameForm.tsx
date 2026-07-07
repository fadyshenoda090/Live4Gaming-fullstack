import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gameService } from '../../services/api';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const GameForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    genre: 'FPS',
    rating: 0,
    developer: '',
    description: '',
    releaseDate: new Date().toISOString().split('T')[0],
    image: '',
  });

  useEffect(() => {
    if (isEdit) {
      gameService.getById(Number(id)).then((game) => {
        setFormData({
          title: game.title,
          genre: game.genre,
          rating: game.rating,
          developer: game.developer,
          description: game.description || '',
          releaseDate: game.releaseDate ? game.releaseDate.split('T')[0] : '',
          image: game.image || '',
        });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await gameService.update(Number(id), formData);
      } else {
        await gameService.create(formData);
      }
      navigate('/games');
    } catch (error) {
      console.error('Failed to save game:', error);
      alert('Error saving game. Check console.');
    }
  };

  const genres = [
    'FPS', 'MOBA', 'RPG', 'MMORPG', 'Sports', 'Shooter', 
    'Battle Royale', 'Fighting', 'Racing', 'Strategy', 
    'Card Game', 'Action Adventure'
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/games')} className="mr-4 text-gray-600 hover:text-gray-900">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit Game' : 'Add New Game'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            >
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Developer</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.developer}
            onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Release Date</label>
          <input
            type="date"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.releaseDate}
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <FaSave className="mr-2" /> {isEdit ? 'Update Game' : 'Create Game'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameForm;
