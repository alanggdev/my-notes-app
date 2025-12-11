import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";

import { useAppContext } from "../hooks/useAppContext";

import ClockIcon from "../../assets/icons/clock.svg";

export default function IndexView() {
  const router = useRouter();
  const { notes, handleSetCurrentNote } = useAppContext();
  const isEmpty = notes.length === 0;

  return (
    <View style={styles.container}>
      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Sin notas, agrega una para comenzar.
          </Text>
        </View>
      ) : null}
      {!isEmpty ? (
        <View style={styles.listContainer}>
          <FlashList
            data={notes}
            masonry
            numColumns={2}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  handleSetCurrentNote(item);
                  router.push("/note");
                }}
                style={[{
                  width: "97%",
                  marginRight: index % 2 === 0 ? "auto" : undefined,
                  marginLeft: index % 2 === 1 ? "auto" : undefined
                }, index % 2 ? { paddingRight: 20 } : { paddingLeft: 20 }]}
              >
                <View style={styles.cardContainer}>
                  {item.title !== "" ? (
                    <Text style={styles.title}>
                      {item.title}
                    </Text>
                  ) : null}
                  {item.description !== "" ? (
                    <Text style={styles.description}>
                      {item.description}
                    </Text>
                  ) : null}
                  <View style={styles.creationDateContainer}>
                    <ClockIcon
                      width={16}
                      height={16}
                      color="#9ca3af"
                    />
                    <Text style={styles.createDate}>
                      {item.creationDate}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4E3",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "black",
    fontWeight: 600,
    fontSize: 15,
    textAlign: "justify",
  },
  listContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  cardContainer: {
    borderTopWidth: 15,
    borderColor: "#2A2B2A",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 4,
        spreadDistance: 0,
        color: "rgba(48, 73, 191, 0.15)",
      },
    ],
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
  },
  description: {

  },
  creationDateContainer: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  createDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
});