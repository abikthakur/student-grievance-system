import React, { useState, useEffect, useContext } from 'react';
import { Search, Plus } from 'lucide-react';
import api from '../api/axios';
import GrievanceCard from '../components/GrievanceCard';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGrievance, setEditingGrievance] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Academic');
  const [status, setStatus] = useState('Pending');

  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchGrievances();
    // eslint-disable-next-line
  }, []);

  const fetchGrievances = async (query = '') => {
    try {
      const res = await api.get(`/grievances${query ? `?title=${query}` : ''}`);
      setGrievances(res.data);
    } catch (err) {
      console.error('Error fetching grievances', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGrievances(searchQuery);
  };

  const openModal = (grievance = null) => {
    if (grievance) {
      setEditingGrievance(grievance);
      setTitle(grievance.title);
      setDescription(grievance.description);
      setCategory(grievance.category);
      setStatus(grievance.status);
    } else {
      setEditingGrievance(null);
      setTitle('');
      setDescription('');
      setCategory('Academic');
      setStatus('Pending');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGrievance) {
        await api.put(`/grievances/${editingGrievance._id}`, { title, description, category, status });
      } else {
        await api.post('/grievances', { title, description, category });
      }
      fetchGrievances();
      closeModal();
    } catch (err) {
      console.error('Error saving grievance', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this grievance?')) {
      try {
        await api.delete(`/grievances/${id}`);
        fetchGrievances();
      } catch (err) {
        console.error('Error deleting grievance', err);
      }
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>My Grievances</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} /> New Grievance
        </button>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search grievances by title..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          <Search size={20} />
        </button>
      </form>

      {grievances.length === 0 ? (
        <div className="text-center mt-4 glass-panel" style={{ padding: '3rem' }}>
          <h3>No grievances found</h3>
          <p>You haven't submitted any grievances yet, or no matches were found.</p>
        </div>
      ) : (
        <div className="grievance-grid">
          {grievances.map((g) => (
            <GrievanceCard 
              key={g._id} 
              grievance={g} 
              onEdit={openModal} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <h3 className="mb-4">{editingGrievance ? 'Edit Grievance' : 'Submit New Grievance'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  className="form-control" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)' }}
                >
                  <option value="Academic">Academic</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Transport">Transport</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }}>
                {editingGrievance ? 'Update Grievance' : 'Submit Grievance'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
