import React from 'react';
import { Link } from 'react-router-dom';

export default function TicketDetailPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Chi tiết phiếu</h2>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '15px' }}>
        <p><b>Mã phiếu:</b> PB-2-00001</p>
        <p><b>Khách hàng:</b> Nguyễn Văn A</p>
        <p><b>Thiết bị:</b> iPhone 13 Pro Max</p>
        <p><b>Kỹ thuật viên:</b> Nguyen Van A</p>
        <p><b>Trạng thái:</b> <span style={{ color: 'green', fontWeight: 'bold' }}>Đã đóng (DA_DONG)</span></p>
        
        <Link to="/" style={{ display: 'inline-block', marginTop: '15px', color: '#1e3a8a', textDecoration: 'underline' }}>
          ← Quay lại trang khảo sát
        </Link>
      </div>
      <p style={{ color: '#6b7280', fontStyle: 'italic', marginTop: '10px' }}>* Đây là dữ liệu demo giao diện Màn hình 3.</p>
    </div>
  );
}