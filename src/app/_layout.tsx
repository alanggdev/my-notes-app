import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProvider } from "../context/AppContext";
import { CustomIndexHeader } from "../components/CustomIndexHeader";

import AddIcon from "../../assets/icons/plug.svg";

export default function AppLayout() {
  const router = useRouter();

  return (
    <AppProvider>
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
                    action: () => router.push("/note"),
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
              />
            )
          }}
        />
      </Stack>
    </AppProvider>
  );
}
