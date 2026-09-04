import { ResourceCrudPage } from '@/components/resource/ResourceCrudPage';

export default function FaqsPage() {
  return (
    <ResourceCrudPage
      config={{
        title: 'FAQs',
        description: 'Shown on the Documentation page.',
        endpoint: '/admin/faqs',
        reorderable: true,
        fields: [
          { key: 'question', label: 'Question', type: 'text', required: true },
          { key: 'answer', label: 'Answer', type: 'textarea', required: true },
          { key: 'isActive', label: 'Active', type: 'boolean' },
        ],
      }}
    />
  );
}
