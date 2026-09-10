import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import {
  createFaqCategory,
  deleteFaqCategory,
  updateFaqCategory,
} from '@/services/faq-category-service';

import { getApiErrorMessage } from '@/lib/http';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import CategoryFormDialog from './components/CategoryFormDialog/CategoryFormDialog';
import CategoryTable from './components/CategoryTable/CategoryTable';

const EMPTY_CATEGORY = {
  name: '',
  description: '',
  status: 'ACTIVE',
};

function CategoryManagementDialog({ open, categories, onOpenChange, onChanged }) {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState(EMPTY_CATEGORY);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setSelectedCategory(null);
    setForm(EMPTY_CATEGORY);
  };

  const openCreate = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (category) => {
    setSelectedCategory(category);

    setForm({
      name: category.name ?? '',
      description: category.description ?? '',
      status: category.status ?? 'ACTIVE',
    });

    setFormOpen(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error('Vui lòng nhập tên danh mục.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status,
    };

    try {
      setSaving(true);

      if (selectedCategory) {
        await updateFaqCategory(selectedCategory.id, payload);
        toast.success('Đã cập nhật danh mục.');
      } else {
        await createFaqCategory(payload);
        toast.success('Đã thêm danh mục.');
      }

      setFormOpen(false);
      resetForm();

      await onChanged();
    } catch (error) {
      console.error('Failed to save FAQ category:', error);

      toast.error(getApiErrorMessage(error, 'Không thể lưu danh mục FAQ.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFaqCategory(id);

      toast.success('Đã xóa danh mục.');

      await onChanged();
    } catch (error) {
      console.error('Failed to delete FAQ category:', error);

      toast.error(getApiErrorMessage(error, 'Không thể xóa danh mục đang được sử dụng.'));
    }
  };

  const handleOpenChange = (nextOpen) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setFormOpen(false);
      resetForm();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className='max-h-[85vh] overflow-hidden sm:max-w-4xl'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Quản lý danh mục FAQ</DialogTitle>

            <DialogDescription>Tạo và quản lý các danh mục được sử dụng cho FAQ.</DialogDescription>
          </DialogHeader>

          <div className='flex justify-end py-2'>
            <Button onClick={openCreate}>
              <Plus className='size-4' />
              Thêm danh mục
            </Button>
          </div>

          <CategoryTable categories={categories} onEdit={openEdit} onDelete={handleDelete} />
        </DialogContent>
      </Dialog>

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        form={form}
        setForm={setForm}
        selectedCategory={selectedCategory}
        saving={saving}
        onSubmit={handleSave}
      />
    </>
  );
}

export default CategoryManagementDialog;
