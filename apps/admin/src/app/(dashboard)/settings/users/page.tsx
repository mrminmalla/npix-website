'use client';

import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function UsersPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Users & Roles',
        description: 'Super-admin only. New users must be given a password of at least 8 characters.',
        endpoint: '/admin/users',
        confirmDeleteByTyping: true,
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          {
            key: 'username',
            label: 'Username',
            type: 'text',
            required: true,
            placeholder: 'npixadmin',
          },
          { key: 'email', label: 'Email', type: 'text', required: true },
          {
            key: 'role',
            label: 'Role',
            type: 'select',
            required: true,
            options: [
              { value: 'SUPER_ADMIN', label: 'Super Admin' },
              { value: 'EDITOR', label: 'Editor' },
              { value: 'VIEWER', label: 'Viewer' },
            ],
          },
          {
            key: 'password',
            label: 'Password (leave blank to keep current)',
            type: 'text',
            showInTable: false,
            omitIfEmpty: true,
          },
          { key: 'isActive', label: 'Active', type: 'boolean' },
        ],
        isRowDeleteBlocked: (row, allRows) => {
          if (row.role !== 'SUPER_ADMIN' || !row.isActive) return null;
          const activeSuperAdmins = allRows.filter((r) => r.role === 'SUPER_ADMIN' && r.isActive);
          return activeSuperAdmins.length <= 1
            ? 'This account cannot be deleted because it is the last active Super Admin. Create another Super Admin before deleting this account.'
            : null;
        },
      }}
    />
  );
}
