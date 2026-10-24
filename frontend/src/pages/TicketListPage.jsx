import React from 'react';

export default function TicketListPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Danh sách phiếu bảo hành</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ border: '1px solid #e5e7eb', padding: '10px', textAlign: 'left' }}>Mã phiếu</th>
            <th style={{ border: '1px solid #e5e7eb', padding: '10px', textAlign: 'left' }}>Thiết bị</th>
            <th style={{ border: '1px solid #e5e7eb', padding: '10px', textAlign: 'left' }}>Kỹ thuật viên</th>
            <th style={{ border: '1px solid #e5e7eb', padding: '10px', textAlign: 'left' }}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e5e7eb', padding: '10px' }}>PB-2-00001</td>
            <td style={{ border: '1px solid #e5e7eb', padding: '10px' }}>iPhone 13 Pro Max</td>
            <td style={{ border: '1px solid #e5e7eb', padding: '10px' }}>Nguyen Van A</td>
            <td style={{ border: '1px solid #e5e7eb', padding: '10px', color: 'green' }}>DA_DONG</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e5e7eb', padding: '10px' }}>PB-2-00002</td>
            <td style={{ border: '1px solid #e5e7eb', padding: '10px' }}>Samsung S23</td>
            <td style={{ border: '1px solid #e5e7eb', padding: '10px' }}>Tran Van B</td>
            <td style={{ border: '1px solid #e5e7eb', padding: '10px', color: 'orange' }}>DANG_XU_LY</td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: '#6b7280', fontStyle: 'italic', marginTop: '10px' }}>* Đây là dữ liệu demo giao diện Màn hình 2.</p>
    </div>
  );
}