import React, { useState } from 'react';

export default function TicketListPage() {
  // Dữ liệu mẫu giống bản vẽ
  const mockTickets = [
    { id: 'WT-1052', phone: '090xxxx123', stars: 5, comment: 'KTV nhiệt tình, sửa nhanh', date: '04/10/2026', highlight: false },
    { id: 'WT-1049', phone: '098xxxx456', stars: 4, comment: 'Sửa nhanh, máy chạy êm', date: '04/10/2026', highlight: false },
    { id: 'WT-1033', phone: '091xxxx789', stars: 2, comment: 'Chờ nhận máy hơi lâu...', date: '03/10/2026', highlight: true },
    { id: 'WT-1020', phone: '093xxxx111', stars: 5, comment: 'Rất hài lòng dịch vụ', date: '02/10/2026', highlight: false },
    { id: 'WT-1011', phone: '097xxxx222', stars: 3, comment: 'Giá linh kiện hơi cao', date: '01/10/2026', highlight: false },
  ];

  const [filterStar, setFilterStar] = useState(0); // 0 là tất cả

  // Logic lọc
  const filteredTickets = filterStar === 0 
    ? mockTickets 
    : mockTickets.filter(t => t.stars === filterStar);

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>
          M3: DANH SÁCH & LỌC PHẢN HỒI (Quản lý)
        </div>

        <div style={{ padding: '20px' }}>
          {/* Bộ lọc */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold', color: '#374151' }}>Lọc sao:</span>
            <button onClick={() => setFilterStar(0)} style={{ padding: '5px 15px', borderRadius: '4px', border: '1px solid #d1d5db', cursor: 'pointer', backgroundColor: filterStar === 0 ? '#1e293b' : 'white', color: filterStar === 0 ? 'white' : 'black' }}>Tất cả</button>
            {[1, 2, 3, 4, 5].map(star => (
              <button 
                key={star} 
                onClick={() => setFilterStar(star)}
                style={{ 
                  padding: '5px 10px', 
                  borderRadius: '4px', 
                  border: '1px solid #d1d5db', 
                  cursor: 'pointer',
                  backgroundColor: filterStar === star ? '#fbbf24' : 'white',
                  color: filterStar === star ? 'white' : '#fbbf24',
                  fontWeight: 'bold'
                }}
              >
                {star} ★
              </button>
            ))}
          </div>

          {/* Bảng danh sách */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#1e293b', color: 'white' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Mã phiếu | SĐT Khách</th>
                <th style={{ padding: '10px' }}>Điểm</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Ý kiến nhận xét</th>
                <th style={{ padding: '10px' }}>Ngày gửi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((t, index) => (
                  <tr key={t.id} style={{ backgroundColor: t.highlight ? '#fee2e2' : (index % 2 === 0 ? 'white' : '#f9fafb'), borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '10px', color: '#3b82f6', fontWeight: 'bold' }}>{t.id} | {t.phone}</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#f59e0b', fontWeight: 'bold' }}>{t.stars} <span style={{color:'#d97706'}}>★</span></td>
                    <td style={{ padding: '10px', color: t.highlight ? '#b91c1c' : '#4b5563', fontWeight: t.highlight ? 'bold' : 'normal' }}>{t.comment}</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#6b7280' }}>{t.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                    Không có phản hồi nào cho mức {filterStar} sao.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Dòng chú thích bảo mật */}
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', color: '#047857', fontSize: '13px', textAlign: 'center' }}>
            🔒 Đã mã hóa số điện thoại khách hàng (NFRS Security)
          </div>
        </div>
      </div>
    </div>
  );
}