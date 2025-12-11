import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "../hooks/useAppContext";

export default function NoteView() {
  const navigation = useNavigation();
  const { currentNote, handleAddNote, handleUpdateNote } = useAppContext();
  const isEditing = !!currentNote;

  const [formData, setFormData] = useState({ title: isEditing ? currentNote.title : "", description: isEditing ? currentNote.description : "" });

  const setValue = useCallback((key: "title" | "description", value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    const sub = navigation.addListener("beforeRemove", (e) => {
      if (!isEditing) {
        if (formData.title.trim() !== "" || formData.description.trim() !== "") {
          handleAddNote(formData);
        }
      }
      if (isEditing) {
        if (formData.title.trim() !== currentNote.title || formData.description.trim() != currentNote.description) {
          const updated = { ...currentNote, ...formData };
          handleUpdateNote(currentNote.id as string, updated);
        }
      }
    });

    return sub;
  }, [formData, currentNote]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          value={formData.title}
          onChangeText={(v) => setValue("title", v)}
          placeholder="Ingrese un titulo..."
          placeholderTextColor="#9ca3af"
          numberOfLines={2}
          keyboardType="default"
          style={styles.titleInput}
          multiline
        />
      </View>
      <View style={styles.descriptionContainer}>
        <TextInput
          value={formData.description}
          onChangeText={(v) => setValue("description", v)}
          placeholder="Ingrese una descripción..."
          placeholderTextColor="#9ca3af"
          numberOfLines={30}
          keyboardType="default"
          style={styles.descriptionInput}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4E3",
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderColor: "#2A2B2A",
    paddingHorizontal: 30,
    paddingVertical: 10,
    height: 100,
  },
  titleInput: {
    fontSize: 25,
    fontWeight: "600",
    color: "black",
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 25,
  },
  descriptionInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },
});
