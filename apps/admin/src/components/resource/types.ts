export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'select'
  | 'icon'
  | 'url'
  | 'date'
  | 'asset'
  | 'tags'
  | 'json';

export interface ResourceField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  /** Static options for type: 'select'. */
  options?: { value: string; label: string }[];
  /** Dynamic options for type: 'select' — fetched once from this admin
   *  endpoint and mapped via optionsValueKey/optionsLabelKey. */
  optionsEndpoint?: string;
  optionsValueKey?: string; // defaults to "id"
  optionsLabelKey?: string; // defaults to "title"
  /** Shown as a column in the list table. Defaults to true. */
  showInTable?: boolean;
  placeholder?: string;
  /** Drop this key from the submit payload entirely when left blank
   *  (e.g. an admin user's password field on edit). */
  omitIfEmpty?: boolean;
}

export interface ResourceConfig {
  title: string;
  description?: string;
  /** Admin API path, e.g. "/admin/core-values". */
  endpoint: string;
  fields: ResourceField[];
  /** Enables the up/down reorder controls (calls PATCH {endpoint}/reorder). */
  reorderable?: boolean;
  idKey?: string; // defaults to "id"
  /** Appended verbatim to the GET request, e.g. "?section=home". */
  listQuery?: string;
  /** Merged into every create/update payload but not shown as a form field
   *  (e.g. pinning `section` to the page a resource list is scoped to). */
  fixedValues?: Record<string, unknown>;
  /** Opt-in per-row delete guard (e.g. Users & Roles disabling delete on
   *  the last active Super Admin). Return a reason string to block the
   *  row's delete action (shown as the button's title + a toast if
   *  somehow triggered anyway); return null/undefined to allow it. This
   *  is UX only — the backend is the actual authority and rejects the
   *  request independently if this check is ever bypassed. */
  isRowDeleteBlocked?: (row: Record<string, unknown>, allRows: Record<string, unknown>[]) => string | null | undefined;
  /** For high-stakes resources (e.g. Users & Roles): require the admin to
   *  type the record's exact label into the delete confirmation dialog
   *  before the Delete button enables, instead of a single click/Enter. */
  confirmDeleteByTyping?: boolean;
}

/**
 * The fixed set of lucide-react icon names admins can pick from — matches
 * what the public frontend already imports, so a stored icon name always
 * maps to a real, designed icon rather than an arbitrary string.
 */
export const ICON_OPTIONS = [
  'Activity',
  'TrendingUp',
  'Network',
  'Building2',
  'Zap',
  'PiggyBank',
  'ShieldCheck',
  'Flag',
  'Target',
  'Eye',
  'Scale',
  'Handshake',
  'Lightbulb',
  'GitBranch',
  'Router',
  'MapPin',
  'Megaphone',
  'Wrench',
  'UserPlus',
  'GraduationCap',
  'Users',
  'HelpCircle',
  'FileText',
  'BookOpen',
  'Cable',
  'ClipboardList',
  'Rocket',
  'ScrollText',
  'Settings2',
  'CalendarClock',
  'Gauge',
  'Percent',
].map((name) => ({ value: name, label: name }));
