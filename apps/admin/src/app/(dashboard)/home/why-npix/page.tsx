import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';
import { ICON_OPTIONS } from '@/components/resource/types';

export default function WhyNpixPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Why NPIX Matters',
        description: 'The 4 benefit cards on the Home page.',
        endpoint: '/admin/why-npix-items',
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
