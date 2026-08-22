import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function DocumentsPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'Documents',
        description: 'Downloadable resources shown on the Documentation page.',
        endpoint: '/admin/documents',
        reorderable: true,
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          {
            key: 'categoryId',
            label: 'Category',
            type: 'select',
            required: true,
            showInTable: false,
            optionsEndpoint: '/admin/document-categories',
            optionsValueKey: 'id',
            optionsLabelKey: 'title',
          },
          { key: 'description', label: 'Description', type: 'textarea', required: true, showInTable: false },
          { key: 'fileType', label: 'File type', type: 'text', required: true, placeholder: 'PDF' },
          { key: 'fileSize', label: 'File size', type: 'text', placeholder: '245 KB' },
          { key: 'version', label: 'Version', type: 'text', showInTable: false },
          { key: 'tags', label: 'Tags', type: 'tags', showInTable: false },
          { key: 'publishDate', label: 'Publish date', type: 'date', required: true },
          { key: 'updatedDate', label: 'Updated date', type: 'date', required: true, showInTable: false },
          { key: 'fileAssetId', label: 'File', type: 'asset', showInTable: false },
          { key: 'content', label: 'Content blocks (JSON, advanced)', type: 'json', showInTable: false },
          { key: 'isFeatured', label: 'Featured', type: 'boolean' },
        ],
      }}
    />
  );
}
