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
});
