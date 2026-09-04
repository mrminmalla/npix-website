import { Injectable } from '@nestjs/common';
import { Document } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto';

const INCLUDE = { category: true, fileAsset: true, previewAsset: true };

/**
 * Short, human-friendly file-type labels for the public site's file-type
 * badge/icon lookup (see apps/web's `getFileTypeIcon`), keyed by the
 * uploaded asset's actual MIME type — admins never type this in.
 */
const MIME_TYPE_LABELS: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  'text/csv': 'CSV',
  'text/plain': 'TXT',
  'application/zip': 'ZIP',
  'image/png': 'PNG',
  'image/jpeg': 'JPG',
  'image/webp': 'WEBP',
  'image/svg+xml': 'SVG',
};

function labelFromMimeType(mimeType: string, filename: string): string {
  if (MIME_TYPE_LABELS[mimeType]) return MIME_TYPE_LABELS[mimeType];
  const ext = filename.split('.').pop();
  if (ext && ext.length <= 5) return ext.toUpperCase();
  const subtype = mimeType.split('/')[1];
  return subtype ? subtype.toUpperCase() : 'FILE';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// The admin's rich-text editor can only ever *produce* a small, known set
// of tags (its own schema has no concept of <script>/<style>/event
// handlers), so this is a backend backstop, not the primary defense —
// consistent with not trusting a client-side UI as the actual security
// boundary. Applied to every `html` field inside a `content` block before
// it's ever persisted.
const UNSAFE_TAGS = /<\/?(script|style|iframe|object|embed|form)\b[^>]*>/gi;
const EVENT_HANDLER_ATTR = /\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const JS_HREF = /href\s*=\s*(["'])\s*javascript:[^"']*\1/gi;

function sanitizeHtmlFragment(html: string): string {
  return html.replace(UNSAFE_TAGS, '').replace(EVENT_HANDLER_ATTR, '').replace(JS_HREF, 'href="#"');
}

function sanitizeContent(content: unknown): unknown {
  if (!Array.isArray(content)) return content;
  return content.map((block) => {
    if (block && typeof block === 'object' && typeof (block as { html?: unknown }).html === 'string') {
      return { ...block, html: sanitizeHtmlFragment((block as { html: string }).html) };
    }
    return block;
  });
}

@Injectable()
export class DocumentsService extends BaseCrudService<Document> {
  constructor(
    private readonly prisma: PrismaService,
    revalidate: RevalidateService,
  ) {
    super(prisma.document, revalidate, ['/documentation']);
  }

  /**
   * `fileType`/`fileSize` are never admin-entered (see CreateDocumentDto) —
   * they're always derived here from the actual uploaded file, which is
   * the real source of truth and can't drift out of sync with what's
   * actually attached. Falls back to a generic label/no size when no file
   * is attached at all (fileAssetId is optional on this model).
   */
  private async deriveFileMeta(
    fileAssetId: string | null | undefined,
  ): Promise<{ fileType: string; fileSize: string | null }> {
    if (!fileAssetId) return { fileType: 'FILE', fileSize: null };
    const asset = await this.prisma.asset.findUnique({ where: { id: fileAssetId } });
    if (!asset) return { fileType: 'FILE', fileSize: null };
    return {
      fileType: labelFromMimeType(asset.mimeType, asset.originalFilename),
      fileSize: formatFileSize(asset.sizeBytes),
    };
  }

  async create(dto: CreateDocumentDto) {
    const meta = await this.deriveFileMeta(dto.fileAssetId);
    return super.create({ ...dto, ...meta, content: sanitizeContent(dto.content), updatedDate: new Date() });
  }

  async update(id: string, dto: UpdateDocumentDto) {
    // Only re-derive fileType/fileSize when the attached file is actually
    // part of this update — re-deriving unconditionally (even when
    // `fileAssetId` is untouched) would overwrite legacy/seeded documents
    // that have no linked asset (fileAssetId null) with a generic
    // fallback every time any *other* field is edited, silently
    // destroying their real file-type/size display. Leaving `meta` empty
    // means those keys are simply absent from the update payload, so
    // Prisma leaves the existing values alone. `updatedDate` (the public-
    // facing "last updated" label, distinct from the internal `updatedAt`
    // audit column Prisma already manages) is still bumped on every edit,
    // same as `updatedAt`, per the same "system timestamp, not admin
    // input" rule.
    const meta = dto.fileAssetId !== undefined ? await this.deriveFileMeta(dto.fileAssetId) : {};
    return super.update(id, {
      ...dto,
      ...meta,
      content: sanitizeContent(dto.content),
      updatedDate: new Date(),
    });
  }

  listOrdered(filters: { categoryId?: string; featured?: boolean } = {}) {
    return this.findAll({
      where: {
        ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
        ...(filters.featured !== undefined ? { isFeatured: filters.featured } : {}),
      },
      orderBy: { sortOrder: 'asc' },
      include: INCLUDE,
    }).then((r) => r.items);
  }

  findOneWithRelations(id: string) {
    return this.findOne(id, INCLUDE);
  }

  async search(query: string) {
    const all = await this.listOrdered();
    const q = query.toLowerCase();
    return all.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }
}
