import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ContentBlocks } from "@/components/shared/ContentBlocks";
import type { DocumentEntry } from "@/types";

export function DocumentModal({
  document,
  onOpenChange,
}: {
  document: DocumentEntry | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={document !== null} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] w-[calc(100%-2rem)] max-w-3xl flex-col gap-0 overflow-hidden p-0">
        {document && (
          <>
            <DialogHeader className="border-b border-border px-6 py-5 pr-12">
              <DialogTitle className="text-xl">{document.title}</DialogTitle>
              <DialogDescription>{document.summary}</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto px-6 py-5">
              <ContentBlocks blocks={document.content} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
