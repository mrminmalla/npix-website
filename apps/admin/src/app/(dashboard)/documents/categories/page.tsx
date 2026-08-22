import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';
import { ICON_OPTIONS } from '@/components/resource/types';

export default function DocumentCategoriesPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Documentation Categories',
        endpoint: '/admin/document-categories',
        reorderable: true,
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'slug', label: 'Slug', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'iconName', label: 'Icon', type: 'icon', required: true, options: ICON_OPTIONS },
        ],
      }}
    />
  );
}
