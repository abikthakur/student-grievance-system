import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const GrievanceCard = ({ grievance, onEdit, onDelete }) => {
  return (
    <div className="grievance-card glass-panel">
      <div className="grievance-card-header">
        <h3 className="grievance-card-title">{grievance.title}</h3>
        <span className={`badge ${grievance.status === 'Resolved' ? 'badge-resolved' : 'badge-pending'}`}>
          {grievance.status}
        </span>
      </div>
      <div className="grievance-card-date">
        {new Date(grievance.createdAt).toLocaleDateString()} &bull; {grievance.category}
      </div>
      <p className="grievance-card-desc mt-2">{grievance.description}</p>
      
      <div className="grievance-card-footer">
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>ID: {grievance._id.slice(-6)}</span>
        <div className="action-buttons">
          <button className="btn-icon" onClick={() => onEdit(grievance)} title="Edit">
            <Edit size={18} />
          </button>
          <button className="btn-icon danger" onClick={() => onDelete(grievance._id)} title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrievanceCard;
