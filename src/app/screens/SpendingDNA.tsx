import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkles } from "lucide-react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSpendingInsight, SpendingInsight } from "../../services/smartAdvice";
import { TextShimmer } from "../components/TextShimmer";
import { useAppContext } from "../../context/AppContext";

const filters = ["All", "Food & drinks", "Transport", "Entertainment", "Shopping", "Health"];
export function SpendingDNA() {
  const { categorySpending } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("All");
  const [aiData, setAiData] = useState<SpendingInsight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpendingInsight(categorySpending)
      .then(setAiData)
      .finally(() => setLoading(false));
  }, [categorySpending]);

  return (
    <LinearGradient colors={["#3E0D6F", "#1C0B35", "#0B0813", "#0B0813"]} locations={[0, 0.15, 0.45, 0.92]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }} edges={["top", "left", "right"]}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 112 }} showsVerticalScrollIndicator={false}>
          <Text style={{ color: "white", fontSize: 28, fontWeight: "900", marginBottom: 4 }}>Spending</Text>
          <Text style={{ color: "#DED6FF", fontSize: 14, marginBottom: 20 }}>May 2026 breakdown</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
            {filters.map((filter) => {
              const selected = activeFilter === filter;
              return (
                <TouchableOpacity key={filter} onPress={() => setActiveFilter(filter)} style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: 999, marginRight: 8, backgroundColor: selected ? "#7136FD" : "rgba(255,255,255,0.08)", borderWidth: selected ? 0 : 1, borderColor: "rgba(255,255,255,0.16)" }}>
                  <Text style={{ color: selected ? "white" : "#F4ECFF", fontSize: 13, fontWeight: "900" }}>{filter}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={{ gap: 12, marginBottom: 18 }}>
            {categorySpending
              .filter(cat => activeFilter === "All" || cat.name === activeFilter)
              .map((category, index) => {
              const barColor = category.status === "safe" ? "#7136FD" : category.status === "warning" ? "#F6A623" : "#FF6262";
              return (
                <View key={index} style={{ backgroundColor: "rgba(255,255,255,0.075)", borderWidth: 1, borderColor: "rgba(255,255,255,0.18)", borderRadius: 24, padding: 16 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "white", fontSize: 16, fontWeight: "900", marginBottom: 4 }}>{category.name}</Text>
                      <Text style={{ color: "#BEB3CB", fontSize: 12 }}>RM {category.spent} / RM {category.budget}</Text>
                    </View>
                    {category.status === "over" ? (
                      <View style={{ paddingHorizontal: 9, paddingVertical: 5, backgroundColor: "rgba(255,98,98,0.12)", borderRadius: 999 }}>
                        <Text style={{ color: "#FF6262", fontSize: 11, fontWeight: "900" }}>Over budget</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={{ height: 8, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
                    <View style={{ width: `${Math.min(category.percentage, 100)}%` as any, height: "100%", backgroundColor: barColor, borderRadius: 999 }} />
                  </View>
                </View>
              );
            })}
          </View>

          {/* AI Insight */}
          <View style={{ backgroundColor: "rgba(255,255,255,0.075)", borderWidth: 1, borderColor: "rgba(255,255,255,0.18)", borderRadius: 24, padding: 18, marginBottom: 14 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
              <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(113, 54, 253, 0.15)", alignItems: "center", justifyContent: "center" }}>
                <Sparkles color="#7136FD" size={20} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#7136FD", fontSize: 13, fontWeight: "900", marginBottom: 6 }}>AI insight</Text>
                {loading ? (
                  <TextShimmer lines={2} />
                ) : (
                  <Text style={{ color: "white", fontSize: 13, lineHeight: 20 }}>{aiData?.insight}</Text>
                )}
              </View>
            </View>
          </View>

          {/* AI Spending Personality */}
          <View style={{ backgroundColor: "rgba(255,255,255,0.075)", borderWidth: 1, borderColor: "rgba(255,255,255,0.18)", borderRadius: 24, padding: 18 }}>
            <Text style={{ color: "#BEB3CB", fontSize: 13, marginBottom: 6 }}>Your spending type</Text>
            {loading ? (
              <View style={{ marginBottom: 12 }}>
                <TextShimmer lines={3} />
              </View>
            ) : (
              <>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "900", marginBottom: 8 }}>{aiData?.spendingType}</Text>
                <Text style={{ color: "#BEB3CB", fontSize: 13, lineHeight: 20, marginBottom: 12 }}>{aiData?.spendingDescription}</Text>
                <Text style={{ color: "#7136FD", fontSize: 13, fontWeight: "900" }}>{aiData?.peerComparison}</Text>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
