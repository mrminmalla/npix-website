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
          // File type/size are derived automatically from the uploaded
          // file itself (see DocumentsService.deriveFileMeta) — never
          // admin-entered, so there's no field for either here.
          { key: 'version', label: 'Version', type: 'text', showInTable: false },
          { key: 'tags', label: 'Tags', type: 'tags', showInTable: false },
          {
            key: 'publishDate',
            label: 'Publish date',
            type: 'date',
            required: true,
            // Defaults to today for a new document; still fully editable
            // for scheduling a future/backdated publish date. Only
            // applies on create — editing an existing document always
            // loads its real stored value. ('today' rather than a
            // function: this page is a Server Component, and a function
            // value can't cross into the Client Component that renders
            // the form.)
            defaultValue: 'today',
          },
          // Updated date is managed automatically by the backend on every
          // save (DocumentsService.update) — not an admin-editable field.
          { key: 'fileAssetId', label: 'File', type: 'asset', showInTable: false },
          {
            key: 'content',
            label: 'Document Content',
            type: 'richtext',
            showInTable: false,
            placeholder: 'Write or paste the document content here…',
          },
          { key: 'isFeatured', label: 'Featured', type: 'boolean' },
        ],
      }}
    />
  );
}
