import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { authStorage } from '@/lib/auth-storage';
import { getCurrentUser } from '@/services/auth-service';

const ADMIN_ROLES = new Set(['ADMIN', 'ADVISOR']);

function AdminRoute() {
  const location = useLocation();
  const [status, setStatus] = useState(authStorage.getToken() ? 'loading' : 'unauthenticated');

  useEffect(() => {
    if (!authStorage.getToken()) return;

    let active = true;

    getCurrentUser()
      .then((user) => {
        if (!active) return;

        const canAccessAdmin = user?.roles?.some((role) => ADMIN_ROLES.has(role.name));
        setStatus(canAccessAdmin ? 'authorized' : 'forbidden');
      })
      .catch(() => {
        if (active) setStatus('unauthenticated');
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#FAFAFA] text-sm text-slate-500'>
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (status === 'forbidden') {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
