import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONT_FAMILY, FONT_WEIGHT } from "../../constants/theme";
import { db, auth } from "../../constants/firebaseConfig";
import { collection, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { LineChart } from "react-native-gifted-charts";

export default function VitalsScreen() {
  const [latestVitals, setLatestVitals] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('7D');

  useEffect(() => {
    if (!auth.currentUser) {
        return;
    }

    const getTimeRangeDate = () => {
        const now = new Date();
        if (timeRange === '7D') {
            return new Date(now.setDate(now.getDate() - 7));
        }
        if (timeRange === '1M') {
            return new Date(now.setMonth(now.getMonth() - 1));
        }
        if (timeRange === '3M') {
            return new Date(now.setMonth(now.getMonth() - 3));
        }
    }

    const q = query(
      collection(db, "vitals"),
      where("userId", "==", auth.currentUser.uid),
      where("timestamp", ">=", Timestamp.fromDate(getTimeRangeDate())),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const historyData = [];
      const latestData = {};
      const heartRateData = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        historyData.push(data);
        if (!latestData[data.type]) {
            latestData[data.type] = data;
        }
        if (data.type === 'Heart Rate') {
            heartRateData.push({value: data.numericValue, date: data.timestamp.toDate()});
        }
      });
      setHistory(historyData);
      setLatestVitals(Object.values(latestData));
      setChartData(heartRateData.reverse());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [timeRange]);

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} style={{flex: 1, justifyContent: 'center'}}/>
  }

  const timeRanges = ['7D', '1M', '3M'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Vitals</Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <MaterialIcons name="settings" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.sectionTitle}>Latest Readings</Text>
        <View style={styles.vitalsContainer}>
          {latestVitals.map((vital, index) => (
            <View key={index} style={styles.vitalCard}>
              <View style={styles.vitalHeader}>
                <MaterialIcons name={vital.icon as any} size={20} color={vital.iconColor} />
                <Text style={styles.vitalLabel}>{vital.label}</Text>
              </View>
              <Text style={styles.vitalValue}>
                {vital.value} <Text style={styles.vitalUnit}>{vital.unit}</Text>
              </Text>
              <Text style={[styles.vitalStatus, { color: vital.statusColor }]}>
                {vital.status}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>History & Trends</Text>
        <View style={styles.timeRangeContainer}>
            {timeRanges.map((range) => (
                <TouchableOpacity
                    key={range}
                    style={[styles.timeRangeButton, timeRange === range && styles.timeRangeButtonActive]}
                    onPress={() => setTimeRange(range)}
                >
                    <Text style={[styles.timeRangeText, timeRange === range && styles.timeRangeTextActive]}>{range}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Heart Rate (BPM)</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: COLORS.textSlate600}}>Oct 1 - Oct 7</Text>
                    <MaterialIcons name="calendar-today" size={20} color={COLORS.textSlate600} />
                </View>
            </View>
            <LineChart
                data={chartData}
                height={192}
                spacing={40}
                initialSpacing={0}
                color={COLORS.primary}
                textColor={COLORS.textSlate600}
                dataPointsColor={COLORS.primary}
                textFontSize={12}
            />
        </View>

        <View style={styles.historyList}>
            {history.map((item, index) => (
                <View key={index} style={styles.historyCard}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
                        <View style={[styles.historyIconContainer, {backgroundColor: item.bgColor}]}>
                            <MaterialIcons name={item.icon as any} size={24} color={item.iconColor} />
                        </View>
                        <View>
                            <Text style={styles.historyLabel}>{item.label}</Text>
                            <Text style={styles.historyTime}>{new Date(item.timestamp?.toDate()).toLocaleString()}</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={styles.historyValue}>{item.value}</Text>
                        <Text style={[styles.historyStatus, {color: item.statusColor}]}>{item.status}</Text>
                    </View>
                </View>
            ))}
        </View>

      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/vitals/add')}>
        <MaterialIcons name="add" size={32} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderSlate300,
    },
    headerTitle: {
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.bold,
        fontSize: 18,
        color: COLORS.textSlate900,
    },
    sectionTitle: {
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.bold,
        fontSize: 22,
        color: COLORS.primary,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 12,
    },
    vitalsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        paddingHorizontal: 16,
    },
    vitalCard: {
        flex: 1,
        minWidth: 158,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        gap: 8,
        borderWidth: 1,
        borderColor: COLORS.borderSlate300,
    },
    vitalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    vitalLabel: {
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.textSlate900,
    },
    vitalValue: {
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.bold,
        fontSize: 24,
        color: COLORS.textSlate900,
    },
    vitalUnit: {
        fontSize: 14,
        fontWeight: FONT_WEIGHT.regular,
    },
    vitalStatus: {
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.medium,
        fontSize: 14,
    },
    timeRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: COLORS.bgBlue100,
        borderRadius: 12,
        marginHorizontal: 16,
        padding: 4,
    },
    timeRangeButton: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
    },
    timeRangeButtonActive: {
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    timeRangeText: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.textSlate600,
    },
    timeRangeTextActive: {
        color: COLORS.primary,
    },
    chartContainer: {
        margin: 16,
        padding: 16,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.borderSlate300,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    chartTitle: {
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.bold,
        fontSize: 18,
        color: COLORS.textSlate900,
    },
    historyList: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    historyCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.borderSlate300,
    },
    historyIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyLabel: {
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.semibold,
        color: COLORS.textSlate900,
    },
    historyTime: {
        color: COLORS.textSlate600,
        fontSize: 12,
    },
    historyValue: {
        fontFamily: FONT_FAMILY.display,
        fontWeight: FONT_WEIGHT.bold,
        fontSize: 18,
        color: COLORS.textSlate900,
    },
    historyStatus: {
        fontSize: 12,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});
