import { Note } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash, AlertCircle } from "lucide-react";
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

interface NoteListProps {
  selectedNoteId: string | null;
  onSelectNote: (note: Note) => void;
}

export function NoteList({ selectedNoteId, onSelectNote }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const q = query(collection(db, "notes"), orderBy("updatedAt", "desc"));
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const noteList: Note[] = [];
          snapshot.forEach((doc) => {
            noteList.push({ id: doc.id, ...doc.data() } as Note);
          });
          setNotes(noteList);
          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error("Error fetching notes:", error);
          setError("Failed to load notes. Please check your connection and try again.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up Firebase listener:", error);
      setError("Failed to connect to the database. Please check your configuration.");
      setLoading(false);
    }
  }, []);

  const createNote = async () => {
    try {
      const newNote = {
        title: "Untitled Note",
        content: "",
        updatedAt: Date.now(),
      };
      const docRef = await addDoc(collection(db, "notes"), newNote);
      onSelectNote({ id: docRef.id, ...newNote });
    } catch (error) {
      console.error("Error creating note:", error);
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      toast({
        title: "Success",
        description: "Note deleted",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <AlertCircle className="h-8 w-8 text-destructive mb-2" />
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <Button onClick={createNote} className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex items-center group"
            >
              <Button
                variant={selectedNoteId === note.id ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2 px-4 font-normal"
                onClick={() => onSelectNote(note)}
              >
                {note.title || "Untitled Note"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => deleteNote(note.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}