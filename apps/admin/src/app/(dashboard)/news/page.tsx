import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function NewsPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'News & Events',
        description: 'Slug is auto-generated from the title if left blank.',
        endpoint: '/admin/news-events',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          {
            key: 'slug',
            label: 'Slug',
            type: 'text',
            showInTable: false,
            placeholder: 'auto-generated',
            omitIfEmpty: true,
          },
          {
            key: 'category',
            label: 'Category',
            type: 'select',
            required: true,
            options: [
              { value: 'Announcements', label: 'Announcements' },
              { value: 'Maintenance', label: 'Maintenance' },
              { value: 'New Members', label: 'New Members' },
              { value: 'Workshops', label: 'Workshops' },
              { value: 'Conferences', label: 'Conferences' },
              { value: 'Upgrades', label: 'Upgrades' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            type: 'select',
            options: [
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
            ],
          },
          { key: 'publishedAt', label: 'Published date', type: 'date', required: true },
          { key: 'summary', label: 'Summary', type: 'textarea', required: true, showInTable: false },
          { key: 'content', label: 'Content', type: 'textarea', required: true, showInTable: false },
          {
            key: 'location',
            label: 'Location (Workshops/Conferences)',
            type: 'text',
            showInTable: false,
          },
          { key: 'featuredImageAssetId', label: 'Featured image', type: 'asset', showInTable: false },
          { key: 'isFeatured', label: 'Featured', type: 'boolean' },
        ],
      }}
    />
  );
}
