import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NoteType = {
  id?: string;
  title: string;
  description: string;
  creationDate?: string;
};

type ContextType = {
  notes: NoteType[];
  currentNote: NoteType | null;
  handleAddNote: (note: NoteType) => void;
  handleUpdateNote: (id: string, note: NoteType) => void;
  handleDeleteNote: (id: string) => void;
  handleSetCurrentNote: (note: NoteType) => void;
  handleClearCurrentNote: () => void;
};

const STORAGE_KEY = "my-notes";

export const AppContext = createContext<ContextType>({} as ContextType);
export const AppConsumer = AppContext.Consumer;

export const AppProvider = ({ children }: any) => {
  const wasMounted = useRef(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);

  const handleAddNote = useCallback(async (note: NoteType) => {
    const id = `${Date.now()}`;
    const creationDate = format(new Date(), "yyyy-MM-dd HH:mm");
    const newNote: NoteType = { id, creationDate, ...note };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  }, [notes]);

  const handleUpdateNote = useCallback(async (id: string, note: NoteType) => {
    const updatedNotes = notes.map((value) => value.id === id ? note : value);
    setNotes(updatedNotes);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  }, [notes]);

  const handleDeleteNote = useCallback(async (id: string) => {
    const updatedNotes = notes.filter((value) => value.id !== id);
    setNotes(updatedNotes);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  }, [notes]);

  const handleSetCurrentNote = useCallback((note: NoteType) => {
    setCurrentNote(note);
  }, []);

  const handleClearCurrentNote = useCallback(() => {
    setCurrentNote(null);
  }, []);

  useEffect(() => {
    if (wasMounted.current) return;
    wasMounted.current = true;

    const load = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const parsedValues = jsonValue !== null ? JSON.parse(jsonValue) : [];

        setNotes(parsedValues);
      } catch (error) {
        console.error("Ha ocurrido un error.");
      }
    }

    load();
  }, []);

  const contextValue = useMemo(() => ({
    currentNote,
    notes,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
    handleSetCurrentNote,
    handleClearCurrentNote,
  }), [notes, currentNote, handleAddNote, handleUpdateNote, handleDeleteNote])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
