import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function TimelinePage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Timeline',
        description: 'The "NPIX Timeline" milestones shown on the About page.',
        endpoint: '/admin/timeline-entries',
        reorderable: true,
        fields: [
          { key: 'year', label: 'Year', type: 'text', required: true },
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
        ],
      }}
    />
  );
}
