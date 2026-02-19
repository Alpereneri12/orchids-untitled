import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const AKTIVITELER = [
  {
    id: '1',
    tur: 'Koşu',
    tarih: '19 Şub 2026',
    sure: '45 dk',
    kalori: 380,
    icon: 'run' as const,
  },
  {
    id: '2',
    tur: 'Bisiklet',
    tarih: '18 Şub 2026',
    sure: '60 dk',
    kalori: 420,
    icon: 'bike' as const,
  },
  {
    id: '3',
    tur: 'Yüzme',
    tarih: '17 Şub 2026',
    sure: '30 dk',
    kalori: 260,
    icon: 'swim' as const,
  },
  {
    id: '4',
    tur: 'Yürüyüş',
    tarih: '16 Şub 2026',
    sure: '50 dk',
    kalori: 210,
    icon: 'walk' as const,
  },
  {
    id: '5',
    tur: 'Ağırlık Antrenmanı',
    tarih: '15 Şub 2026',
    sure: '55 dk',
    kalori: 310,
    icon: 'dumbbell' as const,
  },
  {
    id: '6',
    tur: 'Yoga',
    tarih: '14 Şub 2026',
    sure: '40 dk',
    kalori: 140,
    icon: 'human' as const,
  },
];

export default function AktiviteListesiScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FF5C5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fiziksel Aktivitelerim</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Total summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="fire" size={22} color="#FF5C5C" />
          <Text style={styles.summaryValue}>1.720</Text>
          <Text style={styles.summaryLabel}>Toplam Kalori</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="clock-outline" size={22} color="#FF5C5C" />
          <Text style={styles.summaryValue}>280 dk</Text>
          <Text style={styles.summaryLabel}>Toplam Süre</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="calendar-check" size={22} color="#FF5C5C" />
          <Text style={styles.summaryValue}>6</Text>
          <Text style={styles.summaryLabel}>Aktivite</Text>
        </View>
      </View>

      <FlatList
        data={AKTIVITELER}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardIconWrapper}>
              <MaterialCommunityIcons name={item.icon} size={28} color="#FF5C5C" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTur}>{item.tur}</Text>
              <Text style={styles.cardTarih}>{item.tarih}</Text>
            </View>
            <View style={styles.cardStats}>
              <View style={styles.statBadge}>
                <MaterialCommunityIcons name="clock-outline" size={13} color="#888" />
                <Text style={styles.badgeText}>{item.sure}</Text>
              </View>
              <View style={[styles.statBadge, styles.kaloriBadge]}>
                <MaterialCommunityIcons name="fire" size={13} color="#FF5C5C" />
                <Text style={[styles.badgeText, { color: '#FF5C5C' }]}>{item.kalori} kcal</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#222' },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryValue: { fontSize: 16, fontWeight: '700', color: '#222', marginTop: 4 },
  summaryLabel: { fontSize: 11, color: '#888', fontWeight: '500' },
  summaryDivider: { width: 1, backgroundColor: '#F0F0F0' },
  listContent: { padding: 20, paddingTop: 8 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIconWrapper: {
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    padding: 10,
    marginRight: 14,
  },
  cardInfo: { flex: 1 },
  cardTur: { fontSize: 15, fontWeight: '700', color: '#222' },
  cardTarih: { fontSize: 12, color: '#888', marginTop: 3 },
  cardStats: { alignItems: 'flex-end', gap: 6 },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  kaloriBadge: { backgroundColor: '#FFF0F0' },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#555' },
});
