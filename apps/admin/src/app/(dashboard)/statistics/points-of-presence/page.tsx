import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function PointsOfPresencePage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Points of Presence',
        description: 'Physical exchange facilities shown on the Statistics page.',
        endpoint: '/admin/points-of-presence',
        reorderable: true,
        fields: [
          { key: 'name', label: 'Facility name', type: 'text', required: true },
          { key: 'city', label: 'City', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'isActive', label: 'Active', type: 'boolean' },
        ],
      }}
    />
  );
}
