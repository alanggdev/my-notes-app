import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

type NoteType = {
  id?: string;
  title: string;
  description: string;
  creationDate?: string;
};

type ContextType = {
  isLoading: boolean;
  notes: NoteType[];
  currentNote: NoteType | null;
  handleAddNote: (note: NoteType) => void;
  handleUpdateNote: (id: string, note: NoteType) => void;
  handleDeleteNote: (id: string) => void;
  handleSetCurrentNote: (note: NoteType) => void;
  handleClearCurrentNote: () => void;
};

export const AppContext = createContext<ContextType>({} as ContextType);

export const AppProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);

  const handleAddNote = useCallback((note: NoteType) => {
    const id = `${Date.now()}`;
    const creationDate = format(new Date(), "yyyy-MM-dd HH:mm");
    const newNote: NoteType = { id, creationDate, ...note };

    setNotes((prev) => ([newNote, ...prev]));

    console.log(">>> Nota creada");
  }, []);

  const handleUpdateNote = useCallback((id: string, note: NoteType) => {
    setNotes((prev) => prev.map((value) => value.id === id ? note : value));
  }, []);

  const handleDeleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter((value) => value.id !== id));

    console.log(">>> Nota actualizada");
  }, []);

  const handleSetCurrentNote = useCallback((note: NoteType) => {
    setCurrentNote(note);
  }, []);

  const handleClearCurrentNote = useCallback(() => {
    setCurrentNote(null);
  }, []);

  const contextValue = useMemo(() => ({
    isLoading,
    currentNote,
    notes,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
    handleSetCurrentNote,
    handleClearCurrentNote,
  }), [notes, currentNote, isLoading])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
