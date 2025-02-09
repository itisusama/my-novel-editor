import { useState } from "react";
import { NoteList } from "@/components/NoteList";
import { NoteEditor } from "@/components/NoteEditor";
import { Note } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r">
        <NoteList
          selectedNoteId={selectedNote?.id ?? null}
          onSelectNote={setSelectedNote}
        />
      </div>
      <div className="flex-1">
        <ScrollArea className="h-full">
          {selectedNote ? (
            <div className="p-6">
              <NoteEditor note={selectedNote} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select or create a note to get started
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
