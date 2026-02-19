import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HEDEFLER = [
  { id: '1', baslik: 'Günlük Adım', hedef: '10.000 adım', mevcut: '6.240 adım', oran: 0.62, icon: 'walk' as const },
  { id: '2', baslik: 'Kalori Yakma', hedef: '500 kcal', mevcut: '380 kcal', oran: 0.76, icon: 'fire' as const },
  { id: '3', baslik: 'Su İçme', hedef: '2.5 litre', mevcut: '1.8 litre', oran: 0.72, icon: 'cup-water' as const },
  { id: '4', baslik: 'Egzersiz Süresi', hedef: '60 dk', mevcut: '45 dk', oran: 0.75, icon: 'dumbbell' as const },
];

export default function GunlukHedeflerScreen() {
  const router = useRouter();
  const [adimInput, setAdimInput] = useState('');
  const [belirlenenHedef, setBellirlenenHedef] = useState<string | null>(null);

  const handleHedefBelirle = () => {
    if (!adimInput.trim() || isNaN(Number(adimInput))) {
      Alert.alert('Geçersiz Giriş', 'Lütfen geçerli bir adım sayısı girin.');
      return;
    }
    const formatted = Number(adimInput).toLocaleString('tr-TR');
    setBellirlenenHedef(formatted);
    setAdimInput('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FF5C5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Günlük Hedefler</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Adım Hedefi Belirleme ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="shoe-sneaker" size={22} color="#FF5C5C" />
            <Text style={styles.sectionTitle}>Adım Hedefi Belirle</Text>
          </View>

          <Text style={styles.label}>Günlük Adım Sayısı</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="walk" size={20} color="#FF5C5C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ör: 10000"
              placeholderTextColor="#BBBBBB"
              keyboardType="numeric"
              value={adimInput}
              onChangeText={setAdimInput}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleHedefBelirle} activeOpacity={0.8}>
            <MaterialCommunityIcons name="flag-checkered" size={20} color="#FFF" />
            <Text style={styles.saveButtonText}>Hedef Belirle</Text>
          </TouchableOpacity>

          {belirlenenHedef && (
            <View style={styles.resultCard}>
              <MaterialCommunityIcons name="check-circle-outline" size={20} color="#FF5C5C" />
              <Text style={styles.resultText}>
                Belirlenen Adım Hedefi:{' '}
                <Text style={styles.resultHighlight}>{belirlenenHedef} adım</Text>
              </Text>
            </View>
          )}
        </View>

        {/* ── Mevcut Hedefler ── */}
        <Text style={styles.progressTitle}>Bugünkü İlerleme</Text>
        <Text style={styles.dateText}>19 Şubat 2026, Perşembe</Text>

        {HEDEFLER.map((h) => (
          <View key={h.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons name={h.icon} size={24} color="#FF5C5C" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardTitle}>{h.baslik}</Text>
                <Text style={styles.cardSub}>{h.mevcut} / {h.hedef}</Text>
              </View>
              <Text style={styles.oranText}>{Math.round(h.oran * 100)}%</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${h.oran * 100}%` as any }]} />
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#222' },
  content: { padding: 20, paddingBottom: 40 },

  section: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#222' },

  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 8 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9',
    borderRadius: 12, borderWidth: 1.5, borderColor: '#EEEEEE', paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: '#222', paddingVertical: 13 },

  saveButton: {
    backgroundColor: '#FF5C5C', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 15, marginTop: 16, gap: 8,
    shadowColor: '#FF5C5C', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  saveButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },

  resultCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF5F5', borderRadius: 12, borderWidth: 1,
    borderColor: 'rgba(255,92,92,0.2)', padding: 14, marginTop: 14,
  },
  resultText: { fontSize: 14, color: '#444', flex: 1 },
  resultHighlight: { fontWeight: '700', color: '#FF5C5C' },

  progressTitle: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 2 },
  dateText: { fontSize: 13, color: '#888', marginBottom: 14, fontWeight: '500' },
  card: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconWrapper: { backgroundColor: '#FFF0F0', borderRadius: 12, padding: 10 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#222' },
  cardSub: { fontSize: 12, color: '#888', marginTop: 2 },
  oranText: { fontSize: 18, fontWeight: '800', color: '#FF5C5C' },
  progressBg: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FF5C5C', borderRadius: 4 },
});
