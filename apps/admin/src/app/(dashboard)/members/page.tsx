import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function MembersPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Members',
        description: 'The full member directory shown on the Members page.',
        endpoint: '/admin/members',
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'asn', label: 'ASN', type: 'text', required: true, placeholder: 'AS12345' },
          {
            key: 'category',
            label: 'Category',
            type: 'select',
            required: true,
            options: [
              { value: 'regular', label: 'Regular' },
              { value: 'special', label: 'Special' },
            ],
          },
          { key: 'website', label: 'Website', type: 'url', showInTable: false },
          { key: 'ipAddress', label: 'IPv4 address', type: 'text' },
          { key: 'ipv6Address', label: 'IPv6 address', type: 'text', showInTable: false },
          { key: 'datahubIp', label: 'Datahub IPv4', type: 'text', showInTable: false },
          { key: 'datahubIpv6', label: 'Datahub IPv6', type: 'text', showInTable: false },
          { key: 'logoAssetId', label: 'Logo (special members)', type: 'asset', showInTable: false },
          { key: 'isActive', label: 'Active', type: 'boolean' },
        ],
      }}
    />
  );
}
