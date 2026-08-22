import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';
import { ICON_OPTIONS } from '@/components/resource/types';

const STAT_FIELDS = [
  { key: 'label', label: 'Label', type: 'text' as const, required: true },
  { key: 'value', label: 'Value', type: 'number' as const, required: true },
  { key: 'prefix', label: 'Prefix', type: 'text' as const },
  { key: 'suffix', label: 'Suffix', type: 'text' as const },
  { key: 'decimals', label: 'Decimal places', type: 'number' as const },
  { key: 'iconName', label: 'Icon', type: 'icon' as const, required: true, options: ICON_OPTIONS },
  { key: 'description', label: 'Description', type: 'textarea' as const },
];

export default function StatisticsStatsPage() {
  return (
    <div className="space-y-10">
      <ResourceCrudPage
        config={{
          title: 'Traffic Insights Stats',
          description: 'Current / average / peak / 95th percentile cards on the Statistics page.',
          endpoint: '/admin/stat-cards',
          listQuery: '?section=traffic_insights',
          fixedValues: { section: 'traffic_insights' },
          reorderable: true,
          fields: STAT_FIELDS,
        }}
      />
      <ResourceCrudPage
        config={{
          title: 'Exchange Infrastructure Stats',
          description: 'PoP count / port capacity / uptime cards on the Statistics page.',
          endpoint: '/admin/stat-cards',
          listQuery: '?section=infrastructure',
          fixedValues: { section: 'infrastructure' },
          reorderable: true,
          fields: STAT_FIELDS,
        }}
      />
    </div>
  );
}
