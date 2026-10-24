import React from 'react';

export default function DataState({ loading, error, empty, onRetry, children }) {
  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>⏳ Đang tải dữ liệu...</div>;
  if (error) return (
    <div style={{ padding: '20px', color: 'red', textAlign: 'center', border: '1px solid red' }}>
      <p>❌ {error}</p>
      {onRetry && <button onClick={onRetry} style={{ padding: '8px 16px', marginTop: '10px' }}>Thử lại</button>}
    </div>
  );
  if (empty) return <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Không có dữ liệu để hiển thị.</div>;
  return <>{children}</>;
}