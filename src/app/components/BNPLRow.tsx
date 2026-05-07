import { View, Text, StyleSheet } from "react-native";

interface BNPLRowProps {
  provider: string;
  initial: string;
  monthlyAmount: number;
  monthsLeft: number;
  risk: "low" | "medium" | "high";
}

export function BNPLRow({ provider, initial, monthlyAmount, monthsLeft, risk }: BNPLRowProps) {
  const config = {
    low: {
      circleBg: "rgba(113, 54, 253, 0.15)",
      circleText: "#7136FD",
      pillBg: "rgba(113, 54, 253, 0.12)",
      pillBorder: "rgba(113, 54, 253, 0.3)",
      pillText: "#7136FD",
      label: "Low Risk",
    },
    medium: {
      circleBg: "rgba(246, 166, 35, 0.15)",
      circleText: "#F6A623",
      pillBg: "rgba(246, 166, 35, 0.12)",
      pillBorder: "rgba(246, 166, 35, 0.3)",
      pillText: "#F6A623",
      label: "Medium Risk",
    },
    high: {
      circleBg: "rgba(255, 98, 98, 0.15)",
      circleText: "#FF6262",
      pillBg: "rgba(255, 98, 98, 0.12)",
      pillBorder: "rgba(255, 98, 98, 0.3)",
      pillText: "#FF6262",
      label: "High Risk",
    },
  }[risk];

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: config.circleBg }]}>
        <Text style={[styles.initial, { color: config.circleText }]}>{initial}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.provider}>{provider}</Text>
        <Text style={styles.details}>RM {monthlyAmount}/month · {monthsLeft} months left</Text>
      </View>
      <View style={[styles.pill, { backgroundColor: config.pillBg, borderColor: config.pillBorder }]}>
        <Text style={[styles.pillText, { color: config.pillText }]}>{config.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.075)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderRadius: 22,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  initial: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  provider: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 3,
  },
  details: {
    fontSize: 12,
    color: "#BEB3CB",
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "bold",
  },
});
