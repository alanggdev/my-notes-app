import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";

import { AppConsumer, AppProvider } from "../context/AppContext";
import { CustomIndexHeader } from "../components/CustomIndexHeader";

import AddIcon from "../../assets/icons/plug.svg";
import TrashIcon from "../../assets/icons/trash.svg";

export default function AppLayout() {
  const router = useRouter();

  return (
    <AppProvider>
      <AppConsumer>
        {({ currentNote, handleDeleteNote, handleClearCurrentNote }) => (
          <Fragment>
            <StatusBar style="light" backgroundColor="#F8F4E3" />
            <Stack
              screenOptions={{
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  header: (props) => (
                    <CustomIndexHeader
                      {...props}
                      title="Mis Notas"
                      actions={[
                        {
                          name: "Agregar",
                          icon: AddIcon,
                          action: () => {
                            handleClearCurrentNote();
                            router.push("/note");
                          },
                        },
                      ]}
                    />
                  )
                }}
              />
              <Stack.Screen
                name="note"
                options={{
                  header: (props) => (
                    <CustomIndexHeader
                      {...props}
                      backButton
                      actions={[
                        ...(currentNote ? [{
                          name: "Eliminar",
                          icon: TrashIcon,
                          action: () => {
                            handleDeleteNote(currentNote?.id as string);
                            router.back();
                          },
                        }] : [])
                      ]}
                    />
                  )
                }}
              />
            </Stack>
          </Fragment>
        )}
      </AppConsumer>
    </AppProvider>
  );
}
