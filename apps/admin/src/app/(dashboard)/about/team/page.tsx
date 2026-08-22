import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function TeamPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Leadership Team',
        endpoint: '/admin/team-members',
        reorderable: true,
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'role', label: 'Role', type: 'text', required: true },
          { key: 'bio', label: 'Bio', type: 'textarea', required: true },
          { key: 'photoAssetId', label: 'Photo', type: 'asset', showInTable: false },
          { key: 'isActive', label: 'Active', type: 'boolean' },
        ],
      }}
    />
  );
}
