import { ChevronLeft, ChevronRight, Edit, Eye, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nva@student.ptit.edu.vn', role: 'USER', status: 'ACTIVE', createdAt: '22/08/2026', updatedAt: '22/08/2026' },
  { id: 2, name: 'Trần Thị B', email: 'ttb@ptit.edu.vn', role: 'ADVISOR', status: 'ACTIVE', createdAt: '20/08/2026', updatedAt: '21/08/2026' },
  { id: 3, name: 'Lê Văn C', email: 'lvc@admin.ptit.edu.vn', role: 'ADMIN', status: 'INACTIVE', createdAt: '15/08/2026', updatedAt: '18/08/2026' },
];

const roleStyles = {
  ADMIN: 'bg-red-50 text-[#D71920]',
  ADVISOR: 'bg-orange-50 text-orange-600',
  USER: 'bg-blue-50 text-blue-600',
};

function UserTable() {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn vô hiệu hóa/xóa tài khoản của "${name}" không?`)) {
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (user) => {
    window.alert(`Mở bảng chỉnh sửa cho tài khoản: ${user.name} (${user.email})`);
  };

  return (
    <div className='overflow-hidden rounded-lg border border-slate-200'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[900px] text-left'>
          <thead className='bg-slate-50/70 text-[10px] font-semibold text-slate-600'>
            <tr>
              <th className='px-4 py-3'>Người dùng</th><th className='px-4 py-3'>Email</th>
              <th className='px-4 py-3'>Vai trò</th><th className='px-4 py-3'>Trạng thái</th>
              <th className='px-4 py-3'>Ngày tạo</th><th className='px-4 py-3'>Cập nhật</th>
              <th className='px-4 py-3 text-right'>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? users.map((user) => (
              <tr key={user.id} className='border-b border-slate-100 text-[10px] hover:bg-slate-50/70'>
                <td className='px-4 py-3'><p className='font-semibold text-slate-800'>{user.name}</p><p className='mt-1 text-[9px] text-slate-400'>UID-{String(user.id).padStart(4, '0')}</p></td>
                <td className='px-4 py-3 text-slate-600'>{user.email}</td>
                <td className='px-4 py-3'><Badge className={roleStyles[user.role]}>{user.role}</Badge></td>
                <td className='px-4 py-3'><Badge className={user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'} dot>{user.status === 'ACTIVE' ? 'Hoạt động' : 'Vô hiệu hóa'}</Badge></td>
                <td className='px-4 py-3 text-slate-600'>{user.createdAt}</td>
                <td className='px-4 py-3 text-slate-600'>{user.updatedAt}</td>
                <td className='px-4 py-3'><div className='flex justify-end gap-1'>
                  <ActionButton title='Xem chi tiết'><Eye size={14} /></ActionButton>
                  <ActionButton title='Chỉnh sửa' onClick={() => handleEdit(user)}><Edit size={14} /></ActionButton>
                  <ActionButton title='Vô hiệu hóa' onClick={() => handleDelete(user.id, user.name)}><Trash2 size={14} /></ActionButton>
                  <ActionButton title='Thêm thao tác'><MoreVertical size={14} /></ActionButton>
                </div></td>
              </tr>
            )) : <tr><td colSpan='7' className='px-4 py-8 text-center text-[11px] text-slate-500'>Không có dữ liệu người dùng.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-[10px] text-slate-500 sm:flex-row'>
        <span>Hiển thị 1 - {users.length} trong tổng số 1,248 người dùng</span>
        <div className='flex items-center gap-1'>
          <PageButton><ChevronLeft size={14} /></PageButton><PageButton active>1</PageButton><PageButton>2</PageButton><PageButton>3</PageButton><PageButton><ChevronRight size={14} /></PageButton>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className, dot = false }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px] font-medium ${className}`}>{dot && <span className='h-1.5 w-1.5 rounded-full bg-current' />}{children}</span>;
}

function ActionButton({ children, title, onClick }) {
  return <button type='button' title={title} onClick={onClick} className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-200 hover:text-[#D71920]'>{children}</button>;
}

function PageButton({ children, active = false }) {
  return <button type='button' className={`flex h-8 w-8 items-center justify-center rounded-md ${active ? 'bg-[#D71920] font-semibold text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{children}</button>;
}

export default UserTable;
