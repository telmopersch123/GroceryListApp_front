import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  containerRow: {
    padding: 15,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212121",
  },
  titleSecondary: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#9E9E9E",
    textAlign: "center",
    lineHeight: 20,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "red",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F9F9F9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,

    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  actionButtonPressed: {
    backgroundColor: "#EAEAEA",
    borderColor: "#BDBDBD",
    transform: [{ scale: 0.97 }],
  },
  addButton: {
    backgroundColor: "#337539",
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    padding: 5,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#337539",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  trashButton: {
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  itemCard: {
    backgroundColor: "#F5F5F5",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itemText: {
    fontSize: 16,
    color: "#212121",
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },

  iconContainer: {
    flexDirection: "row",
    gap: 8,
  },

  iconButton: {
    padding: 4,
    borderRadius: 6,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  progressContainer: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
    flex: 1,
  },

  progressBar: {
    width: "0%",
    height: "100%",
    backgroundColor: "#337539",
  },

  progressText: {
    marginTop: 5,
    fontSize: 12,
    color: "#757575",
  },

  itemsText: {
    marginTop: 5,
    fontSize: 13,
    color: "#424242",
  },

  floatingButton: {
    backgroundColor: "#EF7D0B",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
  },

  floatingButtonPressed: {
    opacity: 0.7,
  },
});
