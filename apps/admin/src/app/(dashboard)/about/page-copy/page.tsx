import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function AboutPageCopyPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'About Page Copy',
        description:
          'The "Who We Are", "What is an IXP", "Why NPIX Exists", Mission, and Vision prose blocks. sectionKey should stay unique per page (e.g. "mission", "vision", "who-we-are").',
        endpoint: '/admin/page-sections',
        listQuery: '?pageSlug=about',
        fixedValues: { pageSlug: 'about' },
        reorderable: true,
        fields: [
          { key: 'sectionKey', label: 'Section key', type: 'text', required: true, placeholder: 'mission' },
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text', required: true },
          { key: 'body', label: 'Body', type: 'textarea', required: true },
        ],
      }}
    />
  );
}
