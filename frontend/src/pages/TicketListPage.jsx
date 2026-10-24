import React, { useState, useEffect } from 'react';
import { TicketAPI } from '../api/ticket.api';
import DataState from '../components/DataState';

export default function TicketListPage() {
  const [tickets, setTickets] = useState([]);
  const [state, setState] = useState({ loading: true, error: null });
  const [filterStar, setFilterStar] = useState(0);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    setState({ loading: true, error: null });
    try {
      const res = await TicketAPI.getAllSurveys();
      setTickets(res);
      setState({ loading: false, error: null });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTickets = filterStar === 0 ? tickets : tickets.filter(t => t.csat_score === filterStar);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleFilterChange = (star) => {
    setFilterStar(star);
    setCurrentPage(1);
  };

  const getMaskedPhone = (ticketCode) => {
    if (!ticketCode) return '090xxxx123';
    const num = ticketCode.replace(/\D/g, '') || '123';
    return `090xxxx${num.slice(-3)}`;
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          
          <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>
            M3: DANH SÁCH & LỌC PHẢN HỒI (Quản lý)
          </div>

          <div style={{ padding: '20px' }}>
            
            {/* Thanh Lọc Sao */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontWeight: 'bold', color: '#374151' }}>Lọc sao:</span>
              
              <button 
                onClick={() => handleFilterChange(0)} 
                style={{ 
                  padding: '6px 15px', borderRadius: '6px', 
                  border: '1px solid #d1d5db', 
                  cursor: 'pointer', 
                  backgroundColor: filterStar === 0 ? '#1e293b' : 'white', 
                  color: filterStar === 0 ? 'white' : '#374151',
                  fontWeight: filterStar === 0 ? 'bold' : 'normal'
                }}
              >
                Tất cả
              </button>
              
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star} 
                  onClick={() => handleFilterChange(star)} 
                  style={{ 
                    padding: '6px 12px', borderRadius: '6px', 
                    border: filterStar === star ? '1px solid #fbbf24' : '1px solid #d1d5db', 
                    cursor: 'pointer', 
                    backgroundColor: filterStar === star ? '#fef3c7' : 'white', 
                    color: filterStar === star ? '#d97706' : '#6b7280', 
                    fontWeight: 'bold'
                  }}
                >
                  {star} ★
                </button>
              ))}
              
              {/* Nút Tải lại đã được sửa màu */}
              <button 
                onClick={fetchData} 
                style={{ 
                  marginLeft: 'auto', 
                  padding: '6px 15px', 
                  cursor: 'pointer', 
                  border: '1px solid #1e293b', 
                  backgroundColor: '#1e293b', 
                  color: 'white', 
                  borderRadius: '6px',
                  fontWeight: 'bold'
                }}
              >
                Tải lại
              </button>
            </div>

            {/* Bảng dữ liệu */}
            <DataState loading={state.loading} error={state.error} empty={tickets.length === 0} emptyMessage="Chưa có khảo sát nào." onRetry={fetchData}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e293b', color: 'white' }}>
                    <th style={{ padding: '12px 10px', textAlign: 'left' }}>Mã phiếu | SĐT Khách</th>
                    <th style={{ padding: '12px 10px', textAlign: 'center' }}>Điểm</th>
                    <th style={{ padding: '12px 10px', textAlign: 'left' }}>Ý kiến nhận xét</th>
                    <th style={{ padding: '12px 10px', textAlign: 'center' }}>Ngày gửi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTickets.map((t, index) => (
                    <tr key={t.survey_id} style={{ backgroundColor: t.csat_score <= 2 ? '#fee2e2' : (index % 2 === 0 ? 'white' : '#f9fafb'), borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 10px', color: '#3b82f6', fontWeight: 'bold' }}>
                        {t.ticket_code} | {getMaskedPhone(t.ticket_code)}
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'center', color: '#f59e0b', fontWeight: 'bold' }}>{t.csat_score} ★</td>
                      <td style={{ padding: '12px 10px', color: t.csat_score <= 2 ? '#b91c1c' : '#4b5563', fontWeight: t.csat_score <= 2 ? 'bold' : 'normal' }}>{t.comment || '(Không có nhận xét)'}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'center', color: '#6b7280' }}>{new Date(t.created_at).toLocaleDateString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataState>

            {/* Cảnh báo bảo mật */}
            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#047857', fontSize: '14px', textAlign: 'center', fontWeight: '500' }}>
              🔒 Đã mã hóa số điện thoại khách hàng (NFRS Security)
            </div>

            {/* Thanh phân trang */}
            {filteredTickets.length > 0 && (
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', border: 'none', background: 'none', color: currentPage === 1 ? '#9ca3af' : '#3b82f6', fontWeight: '500' }}
                >
                  &lt; Trang trước
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    style={{ 
                      padding: '6px 12px', 
                      border: currentPage === i + 1 ? 'none' : '1px solid #d1d5db', 
                      backgroundColor: currentPage === i + 1 ? '#3b82f6' : 'white',
                      color: currentPage === i + 1 ? 'white' : '#374151',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      fontWeight: currentPage === i + 1 ? 'bold' : 'normal'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', border: 'none', background: 'none', color: currentPage === totalPages ? '#9ca3af' : '#3b82f6', fontWeight: '500' }}
                >
                  Trang sau &gt;
                </button>
                
                <span style={{ color: '#9ca3af', marginLeft: '10px', fontSize: '13px' }}>({itemsPerPage} dòng / trang)</span>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}