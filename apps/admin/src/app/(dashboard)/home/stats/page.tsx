import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';
import { ICON_OPTIONS } from '@/components/resource/types';

const STAT_FIELDS = [
  { key: 'label', label: 'Label', type: 'text' as const, required: true },
  { key: 'value', label: 'Value', type: 'number' as const, required: true },
  { key: 'prefix', label: 'Prefix', type: 'text' as const },
  { key: 'suffix', label: 'Suffix', type: 'text' as const, placeholder: ' Gbps' },
  { key: 'decimals', label: 'Decimal places', type: 'number' as const },
  { key: 'iconName', label: 'Icon', type: 'icon' as const, required: true, options: ICON_OPTIONS },
  { key: 'description', label: 'Description', type: 'textarea' as const },
];

export default function HomeStatsPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Home Page Stats',
        description:
          'The 4 headline stat cards on the Home page. "Connected ASNs" is computed live from the Members list and is not editable here.',
        endpoint: '/admin/stat-cards',
        listQuery: '?section=home',
        fixedValues: { section: 'home' },
        reorderable: true,
        fields: STAT_FIELDS,
      }}
    />
  );
}
