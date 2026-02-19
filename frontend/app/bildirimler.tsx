import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';

const BILDIRIMLER_INIT = [
  { id: '1', baslik: 'Günlük Hedef Hatırlatması', saat: '08:00', aktif: true, icon: 'target' as const },
  { id: '2', baslik: 'Su İçme Hatırlatması', saat: 'Her 2 saatte', aktif: true, icon: 'cup-water' as const },
  { id: '3', baslik: 'Egzersiz Zamanı', saat: '18:30', aktif: false, icon: 'dumbbell' as const },
  { id: '4', baslik: 'Yatmadan Özet', saat: '22:00', aktif: true, icon: 'sleep' as const },
];

export default function BildirimlerScreen() {
  const router = useRouter();
  const [bildirimler, setBildirimler] = useState(BILDIRIMLER_INIT);

  const toggle = (id: string) => {
    setBildirimler((prev) =>
      prev.map((b) => (b.id === id ? { ...b, aktif: !b.aktif } : b))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FF5C5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirimler</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>Bildirim Ayarları</Text>
        {bildirimler.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#FF5C5C" />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.cardTitle}>{item.baslik}</Text>
              <Text style={styles.cardSub}>{item.saat}</Text>
            </View>
            <Switch
              value={item.aktif}
              onValueChange={() => toggle(item.id)}
              trackColor={{ false: '#E0E0E0', true: '#FFB3B3' }}
              thumbColor={item.aktif ? '#FF5C5C' : '#F4F3F4'}
            />
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
  sectionLabel: { fontSize: 13, color: '#888', fontWeight: '600', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: {
    backgroundColor: '#FFF', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center',
    padding: 16, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  iconWrapper: { backgroundColor: '#FFF0F0', borderRadius: 12, padding: 10 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#222' },
  cardSub: { fontSize: 12, color: '#888', marginTop: 2 },
});
