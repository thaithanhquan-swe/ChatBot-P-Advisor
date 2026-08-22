import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const UserTable = () => {
  // Chuyển dữ liệu tĩnh thành state để có thể tương tác Xóa/Sửa
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nva@student.ptit.edu.vn',
      role: 'USER',
      status: 'ACTIVE',
      createdAt: '22/08/2026',
      updatedAt: '22/08/2026',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'ttb@ptit.edu.vn',
      role: 'ADVISOR',
      status: 'ACTIVE',
      createdAt: '20/08/2026',
      updatedAt: '21/08/2026',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'lvc@admin.ptit.edu.vn',
      role: 'ADMIN',
      status: 'INACTIVE',
      createdAt: '15/08/2026',
      updatedAt: '18/08/2026',
    },
  ]);

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'ADVISOR':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  // Logic xử lý Xóa
  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn vô hiệu hóa/xóa tài khoản của "${name}" không?`)) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  // Logic xử lý Chỉnh sửa (Hiện tại đang gọi Alert để demo, sau này có thể mở Modal tại đây)
  const handleEdit = (user) => {
    alert(`Mở bảng chỉnh sửa cho tài khoản: ${user.name} (${user.email})`);
    // Logic set state cho form/modal chỉnh sửa sẽ nằm ở đây
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-left text-sm text-gray-500'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
          <tr>
            <th className='px-4 py-3'>Họ và tên</th>
            <th className='px-4 py-3'>Email</th>
            <th className='px-4 py-3'>Vai trò</th>
            <th className='px-4 py-3'>Trạng thái</th>
            <th className='px-4 py-3'>Ngày tạo</th>
            <th className='px-4 py-3'>Cập nhật</th>
            <th className='px-4 py-3 text-center'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className='border-b hover:bg-gray-50'>
                <td className='cursor-pointer px-4 py-3 font-medium text-gray-900 hover:text-red-600'>
                  {user.name}
                </td>
                <td className='px-4 py-3'>{user.email}</td>
                <td className='px-4 py-3'>
                  <span
                    className={`rounded px-2.5 py-0.5 text-xs font-medium ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className='px-4 py-3'>
                  <span
                    className={`rounded px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className='px-4 py-3'>{user.createdAt}</td>
                <td className='px-4 py-3'>{user.updatedAt}</td>
                <td className='px-4 py-3'>
                  <div className='flex items-center justify-center space-x-3'>
                    {/* Nút Chỉnh sửa */}
                    <button
                      onClick={() => handleEdit(user)}
                      className='text-gray-500 hover:text-orange-500'
                      title='Chỉnh sửa'
                    >
                      <Edit className='h-4 w-4' />
                    </button>
                    {/* Nút Xóa */}
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className='text-gray-500 hover:text-red-600'
                      title='Xóa'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='7' className='px-4 py-8 text-center text-gray-500'>
                Không có dữ liệu người dùng.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;