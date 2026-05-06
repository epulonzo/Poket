import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Flame, Sparkles } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { getStreakMotivation, StreakMotivation } from "../../services/smartAdvice";
import { StreakDayCircle } from "../components/StreakDayCircle";
import { TextShimmer } from "../components/TextShimmer";

const C = {
  card: "rgba(255, 255, 255, 0.075)",
  cardSoft: "rgba(255, 255, 255, 0.065)",
  primary: "#20E69C",
  primarySoft: "rgba(32, 230, 156, 0.15)",
  textMuted: "#BEB3CB",
  textSoft: "#DCFBEF",
  amber: "#F6A623",
  danger: "#FF6262",
  border: "rgba(255,255,255,0.18)",
};

const currentStreak = 11;
const personalBest = 21;
const todayBudgetUsed = 67;

const weekHistory = [
  { day: "S", done: true },
  { day: "M", done: true },
  { day: "T", done: true },
  { day: "W", done: true },
  { day: "T", done: true },
  { day: "F", done: true },
  { day: "S", done: true },
  { day: "S", done: true },
  { day: "M", done: true },
  { day: "T", done: true },
  { day: "W", done: true }, // today
  { day: "T", done: false },
  { day: "F", done: false },
  { day: "S", done: false },
];

const todayIndex = 10;

const budgetBarColor =
  todayBudgetUsed < 70 ? C.primary : todayBudgetUsed < 90 ? C.amber : C.danger;

export function StreakTracker() {
  const [aiData, setAiData] = useState<StreakMotivation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStreakMotivation(currentStreak, personalBest)
      .then(setAiData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <LinearGradient colors={["#0A7E58", "#123C35", "#170725", "#080111"]} locations={[0, 0.2, 0.5, 0.92]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }} edges={["top", "left", "right"]}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 112 }} showsVerticalScrollIndicator={false}>
          <Text style={{ color: "white", fontSize: 28, fontWeight: "900", marginBottom: 4 }}>Daily Streak</Text>
          <Text style={{ color: C.textSoft, fontSize: 14, marginBottom: 20 }}>Stay within budget every day</Text>

          {/* Big streak display */}
          <View style={{ backgroundColor: C.primarySoft, borderRadius: 24, padding: 28, alignItems: "center", marginBottom: 16 }}>
            <Flame color={C.primary} size={36} />
            <Text style={{ color: C.primary, fontSize: 60, fontWeight: "900", lineHeight: 72, marginTop: 8 }}>{currentStreak}</Text>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>day streak</Text>
            <Text style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>Personal best: {personalBest} days</Text>
          </View>

          {/* Day circles grid */}
          <View style={{ backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 24, padding: 16, marginBottom: 16 }}>
            <Text style={{ color: C.textMuted, fontSize: 12, marginBottom: 14 }}>Last 14 days</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              {weekHistory.slice(0, 7).map((item, index) => (
                <StreakDayCircle key={index} day={item.day} done={item.done} isToday={index === todayIndex} />
              ))}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {weekHistory.slice(7, 14).map((item, index) => (
                <StreakDayCircle key={index + 7} day={item.day} done={item.done} isToday={(index + 7) === todayIndex} />
              ))}
            </View>
          </View>

          {/* Today's budget */}
          <View style={{ backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 24, padding: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
              <Text style={{ color: C.textMuted, fontSize: 12 }}>Today's budget</Text>
              <Text style={{ color: budgetBarColor, fontSize: 12, fontWeight: "900" }}>{todayBudgetUsed}%</Text>
            </View>
            <View style={{ height: 8, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
              <View style={{ width: `${todayBudgetUsed}%` as any, height: "100%", backgroundColor: budgetBarColor, borderRadius: 999 }} />
            </View>
          </View>

          {/* Recovery mode */}
          <View style={{ backgroundColor: "rgba(246,166,35,0.08)", borderWidth: 1, borderColor: C.amber, borderRadius: 20, padding: 16, marginBottom: 16 }}>
            <Text style={{ color: C.amber, fontWeight: "900", fontSize: 14, marginBottom: 6 }}>Recovery Mode</Text>
            <Text style={{ color: C.textMuted, fontSize: 12, lineHeight: 18 }}>
              If you miss a day, we don't reset right away. You get a 3-day recovery sprint with lighter targets to get back on track.
            </Text>
          </View>

          {/* AI Motivation */}
          <Text style={{ color: "white", fontWeight: "900", fontSize: 16, marginBottom: 12 }}>AI Motivation</Text>
          {loading ? (
            <View style={{ backgroundColor: C.cardSoft, borderRadius: 24, borderWidth: 1, borderColor: C.border, padding: 16, gap: 12 }}>
              <TextShimmer lines={2} />
              <TextShimmer lines={2} />
            </View>
          ) : (
            <View style={{ gap: 10, marginBottom: 16 }}>
              <View style={{ backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 16, flexDirection: "row", gap: 12 }}>
                <Sparkles color={C.primary} size={20} />
                <Text style={{ color: "white", fontSize: 13, lineHeight: 20, flex: 1 }}>{aiData?.message}</Text>
              </View>
              <View style={{ backgroundColor: C.cardSoft, borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 16 }}>
                <Text style={{ color: C.primary, fontSize: 11, fontWeight: "900", marginBottom: 6 }}>Today's challenge:</Text>
                <Text style={{ color: "white", fontSize: 13, lineHeight: 20 }}>{aiData?.challenge}</Text>
              </View>
            </View>
          )}

          {/* Peer comparison */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1, backgroundColor: C.cardSoft, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 14 }}>
              <Text style={{ color: C.textMuted, fontSize: 12, marginBottom: 4 }}>Group average</Text>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "900" }}>8 days</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: C.cardSoft, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 14 }}>
              <Text style={{ color: C.textMuted, fontSize: 12, marginBottom: 4 }}>Your ranking</Text>
              <Text style={{ color: C.primary, fontSize: 20, fontWeight: "900" }}>Top 22%</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
