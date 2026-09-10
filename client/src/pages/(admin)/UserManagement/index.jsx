import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { getApiErrorMessage } from '@/lib/http';

import { getUserById, getUsers, getUserStatistics, updateUser } from '@/services/user-service';

import UserEditDialog from './components/UserEditDialog/UserEditDialog';
import UserFilter from './components/UserFilter/UserFilter';
import UserHeader from './components/UserHeader/UserHeader';
import UserStatistics from './components/UserStatistics/UserStatistics';
import UserTable from './components/UserTable/UserTable';
import UserToolbar from './components/UserToolbar/UserToolbar';

const defaultFilters = {
  role: 'ALL',
  emailVerified: 'ALL',
  createdFrom: '',
  createdTo: '',
  sortBy: 'createdAt',
  sortDirection: 'DESC',
};

const defaultEditForm = {
  username: '',
  phone: '',
  role: 'USER',
};

function UserManagement() {
  const [filters, setFilters] = useState(defaultFilters);

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const [pageNumber, setPageNumber] = useState(0);
  const [page, setPage] = useState(null);

  const [statistics, setStatistics] = useState(null);

  const [loading, setLoading] = useState(true);
  const [statisticsLoading, setStatisticsLoading] = useState(true);

  const [error, setError] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [editUser, setEditUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editSaving, setEditSaving] = useState(false);

  const [editForm, setEditForm] = useState(defaultEditForm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPageNumber(0);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [keyword]);

  useEffect(() => {
    let active = true;

    const fetchUsers = async () => {
      if (filters.createdFrom && filters.createdTo && filters.createdFrom > filters.createdTo) {
        if (active) {
          setError('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
          setLoading(false);
        }

        return;
      }

      setLoading(true);
      setError('');

      try {
        const result = await getUsers({
          ...filters,
          keyword: debouncedKeyword,
          page: pageNumber,
          size: 20,
        });

        if (active) {
          setPage(result);
        }
      } catch (requestError) {
        if (active) {
          setError(getApiErrorMessage(requestError, 'Không thể tải danh sách người dùng.'));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchUsers();

    return () => {
      active = false;
    };
  }, [filters, debouncedKeyword, pageNumber]);

  useEffect(() => {
    let active = true;

    const fetchStatistics = async () => {
      setStatisticsLoading(true);

      try {
        const result = await getUserStatistics();

        if (active) {
          setStatistics(result);
        }
      } catch (requestError) {
        if (active) {
          setError(getApiErrorMessage(requestError, 'Không thể tải thống kê người dùng.'));
        }
      } finally {
        if (active) {
          setStatisticsLoading(false);
        }
      }
    };

    void fetchStatistics();

    return () => {
      active = false;
    };
  }, []);

  const refreshUsers = async () => {
    const result = await getUsers({
      ...filters,
      keyword: debouncedKeyword,
      page: pageNumber,
      size: 20,
    });

    setPage(result);
  };

  const refreshStatistics = async () => {
    const result = await getUserStatistics();

    setStatistics(result);
  };

  const handleFilterChange = (key, value) => {
    setPageNumber(0);

    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setKeyword('');
    setDebouncedKeyword('');
    setPageNumber(0);
    setError('');
  };

  const viewUser = async (id) => {
    setSelectedUser(null);
    setDetailLoading(true);
    setDetailOpen(true);
    setError('');

    try {
      const result = await getUserById(id);

      setSelectedUser(result);
    } catch (requestError) {
      setDetailOpen(false);

      setError(getApiErrorMessage(requestError, 'Không thể tải chi tiết người dùng.'));
    } finally {
      setDetailLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);

    setEditForm({
      username: user.username ?? '',
      phone: user.phone ?? '',
      role: user.roles?.[0] ?? 'USER',
    });

    setEditOpen(true);
    setError('');
  };

  const handleEditOpenChange = (open) => {
    setEditOpen(open);

    if (!open) {
      setEditUser(null);
      setEditForm(defaultEditForm);
    }
  };

  const handleUpdateUser = async () => {
    if (!editUser) {
      return;
    }

    try {
      setEditSaving(true);
      setError('');

      await updateUser(editUser.id, {
        username: editForm.username.trim(),
        phone: editForm.phone.trim(),
        roles: [editForm.role],
      });

      setEditOpen(false);
      setEditUser(null);
      setEditForm(defaultEditForm);

      await Promise.all([refreshUsers(), refreshStatistics()]);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Không thể cập nhật người dùng.'));
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <div className='mx-auto max-w-[1600px]'>
      <UserHeader />

      <UserStatistics data={statistics} loading={statisticsLoading} />

      <UserFilter
        filters={filters}
        statistics={statistics}
        loading={loading}
        onChange={handleFilterChange}
        onReset={resetFilters}
      />

      <div className='mt-5 min-w-0 rounded-xl border bg-background p-5'>
        <UserToolbar value={keyword} onChange={setKeyword} />

        {error && (
          <div
            role='alert'
            className='mb-4 rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive'
          >
            {error}
          </div>
        )}

        <UserTable
          page={page}
          loading={loading}
          onPageChange={(nextPage) => {
            setError('');
            setPageNumber(nextPage);
          }}
          onView={viewUser}
          onEdit={handleEditUser}
        />
      </div>

      <UserDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        user={selectedUser}
        loading={detailLoading}
      />

      <UserEditDialog
        open={editOpen}
        onOpenChange={handleEditOpenChange}
        form={editForm}
        setForm={setEditForm}
        saving={editSaving}
        onSubmit={handleUpdateUser}
      />
    </div>
  );
}

function UserDetailDialog({ open, onOpenChange, user, loading }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Chi tiết người dùng</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className='flex h-40 items-center justify-center'>
            <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
          </div>
        ) : user ? (
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            <Detail label='Tên đăng nhập' value={user.username} />

            <Detail label='Email' value={user.email} />

            <Detail label='Số điện thoại' value={user.phone || 'Chưa cập nhật'} />

            <Detail
              label='Xác thực email'
              value={user.emailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
            />

            <Detail label='Vai trò' value={user.roles?.join(', ') || 'Chưa có'} />

            <Detail label='Số phiên chat' value={user.chatSessionCount ?? 0} />

            <Detail label='Ngày tạo' value={formatDate(user.createdAt)} />

            <Detail label='Cập nhật gần nhất' value={formatDate(user.updatedAt)} />

            <div className='sm:col-span-2'>
              <Detail label='ID' value={user.id} />
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className='text-xs font-medium text-muted-foreground'>{label}</p>

      <p className='mt-1 break-all text-sm font-medium'>{value ?? '—'}</p>
    </div>
  );
}

const formatDate = (value) => {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleString('vi-VN');
};

export default UserManagement;
