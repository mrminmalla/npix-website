import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';
import { ICON_OPTIONS } from '@/components/resource/types';

export default function CoreValuesPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Core Values',
        description: 'Shown on the About page as a grid of value cards.',
        endpoint: '/admin/core-values',
        reorderable: true,
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'iconName', label: 'Icon', type: 'icon', required: true, options: ICON_OPTIONS },
        ],
      }}
    />
  );
}
