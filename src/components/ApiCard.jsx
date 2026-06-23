import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ApiCard({ title, description, to, icon: Icon, color }) {
  return (
    <div className="glass-card">
      <div style={{ padding: '1.5rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ 
            backgroundColor: `${color}20`, 
            color: color,
            padding: '0.5rem', 
            borderRadius: '8px',
            display: 'flex'
          }}>
            <Icon size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {description}
        </p>
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--glass-border)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <Link to={to} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'space-between' }}>
          Explorar API
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
