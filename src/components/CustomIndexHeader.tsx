import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";

import type { NativeStackHeaderProps } from "@react-navigation/native-stack";

import IconImage from "../../assets/images/logo-original.png";
import BackIcon from "../../assets/icons/chevrons-left.svg";

type ActionType = {
  name: string;
  icon: React.FC<SvgProps>;
  action: () => void;
};

interface Props extends NativeStackHeaderProps {
  title?: string;
  actions?: ActionType[];
  backButton?: boolean;
}

export const CustomIndexHeader = ({
  title = "",
  actions = [],
  backButton = false,
  navigation,
}: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingTop: top }]}
    >
      {backButton ? (
        <Pressable
          onPress={() => navigation.pop(1)}
          style={styles.backButtonContainer}
        >
          <BackIcon
            width={25}
            height={25}
            stroke="white"
          />
          <Text style={styles.backText}>
            Regresar
          </Text>
        </Pressable>
      ) : null}
      {!backButton ? (
        <View style={styles.titleContainer}>
          <Image
            source={IconImage}
            style={styles.appIcon}
          />
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      ) : null}
      {actions && actions?.length > 0 ? (
        <View>
          {actions.map(({ name, icon: Icon, action }, index) => (
            <Pressable
              key={`${index}-${name}`}
              onPress={action}
              style={({ pressed }) => [
                styles.actionButton,
                pressed ? { backgroundColor: "#434443ff" } : {}
              ]}
            >
              <Icon
                width={25}
                height={25}
                stroke="white"
              />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#2A2B2A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  appIcon: {
    width: 35,
    height: 35,
  },
  actionButton: {
    padding: 4,
  },
  backText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
