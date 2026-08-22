import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function TrafficPanelsPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Traffic Panels',
        description:
          'Grafana panel embeds for the live traffic graphs. The first active panel (by order) is also the one shown on the Home page.',
        endpoint: '/admin/traffic-panels',
        reorderable: true,
        fields: [
          { key: 'label', label: 'Label', type: 'text', required: true, placeholder: 'Daily' },
          { key: 'sublabel', label: 'Sublabel', type: 'text', required: true, placeholder: 'Last 24 hours' },
          { key: 'embedUrl', label: 'Grafana embed URL', type: 'url', required: true },
          { key: 'isActive', label: 'Active', type: 'boolean' },
        ],
      }}
    />
  );
}
