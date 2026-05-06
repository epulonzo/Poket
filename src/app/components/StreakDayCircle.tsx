import { View, Text, StyleSheet } from "react-native";

interface StreakDayCircleProps {
  day: string;
  done: boolean;
  isToday: boolean;
}

export function StreakDayCircle({ day, done, isToday }: StreakDayCircleProps) {
  if (isToday) {
    return (
      <View style={styles.todayCircle}>
        <Text style={styles.todayText}>{day}</Text>
      </View>
    );
  }
  if (done) {
    return (
      <View style={styles.doneCircle}>
        <Text style={styles.doneText}>{day}</Text>
      </View>
    );
  }
  return (
    <View style={styles.futureCircle}>
      <Text style={styles.futureText}>{day}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#20E69C",
    alignItems: "center",
    justifyContent: "center",
  },
  todayText: {
    fontSize: 13,
    color: "#071009",
    fontWeight: "900",
  },
  doneCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(32, 230, 156, 0.15)",
    borderWidth: 1,
    borderColor: "#20E69C",
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: {
    fontSize: 12,
    color: "#20E69C",
    fontWeight: "700",
  },
  futureCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  futureText: {
    fontSize: 12,
    color: "#BEB3CB",
  },
});
