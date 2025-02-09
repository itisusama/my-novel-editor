import { Note } from "@/lib/types";
import { Input } from "./ui/input";
import { Editor } from "./Editor";
import { useToast } from "@/hooks/use-toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCallback, useState, useEffect } from "react";
import debounce from "lodash/debounce";

interface NoteEditorProps {
  note: Note;
}

export function NoteEditor({ note }: NoteEditorProps) {
  const [localTitle, setLocalTitle] = useState(note.title);
  const [localContent, setLocalContent] = useState(note.content);
  const { toast } = useToast();

  // Reset local state when note changes
  useEffect(() => {
    setLocalTitle(note.title);
    setLocalContent(note.content);
  }, [note.id]); // Only reset when note.id changes

  const saveNote = useCallback(
    debounce(async (title: string, content: string) => {
      try {
        const noteRef = doc(db, "notes", note.id);
        await updateDoc(noteRef, {
          title,
          content,
          updatedAt: Date.now(),
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save note",
          variant: "destructive",
        });
      }
    }, 1000),
    [note.id]
  );

  const handleTitleChange = (title: string) => {
    setLocalTitle(title);
    saveNote(title, localContent);
  };

  const handleContentChange = (content: string) => {
    setLocalContent(content);
    saveNote(localTitle, content);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <Input
        value={localTitle}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Note title"
        className="text-lg font-semibold"
      />
      <div className="flex-1">
        <Editor content={localContent} onChange={handleContentChange} />
      </div>
    </div>
  );
}