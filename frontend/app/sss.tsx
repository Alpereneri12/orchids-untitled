import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const SSS_DATA = [
  { soru: 'Uygulamayı nasıl kullanabilirim?', cevap: 'Ana menüden istediğiniz bölüme tıklayarak başlayabilirsiniz. Günlük hedefler bölümünden aktivitelerinizi takip edebilirsiniz.' },
  { soru: 'Kalori hesaplama nasıl çalışır?', cevap: 'Beslenme Ekle bölümünden yediğiniz besinleri ve miktarlarını girerek günlük kalori takibinizi yapabilirsiniz.' },
  { soru: 'Bildirimler nasıl ayarlanır?', cevap: 'Bildirimler menüsünden hangi saatlerde hatırlatma almak istediğinizi belirleyebilirsiniz.' },
  { soru: 'Verilerimi nasıl yedeklerim?', cevap: 'Profil ayarlarından bulut yedekleme özelliğini etkinleştirerek verilerinizi güvende tutabilirsiniz.' },
  { soru: 'Eğitim videoları nereden izlenir?', cevap: 'Eğitimler menüsünden size özel hazırlanmış egzersiz ve beslenme videolarına ulaşabilirsiniz.' },
];

export default function SSSScreen() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FF5C5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sık Sorulan Sorular</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <MaterialCommunityIcons name="frequently-asked-questions" size={40} color="#FF5C5C" />
          <Text style={styles.bannerText}>Nasıl yardımcı olabiliriz?</Text>
        </View>
        {SSS_DATA.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, openIndex === index && styles.cardOpen]}
            onPress={() => setOpenIndex(openIndex === index ? null : index)}
            activeOpacity={0.85}>
            <View style={styles.cardHeader}>
              <Text style={styles.soru}>{item.soru}</Text>
              <MaterialCommunityIcons
                name={openIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#FF5C5C"
              />
            </View>
            {openIndex === index && (
              <Text style={styles.cevap}>{item.cevap}</Text>
            )}
          </TouchableOpacity>
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
  banner: {
    backgroundColor: '#FFF0F0', borderRadius: 16, padding: 20,
    flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 14,
  },
  bannerText: { fontSize: 16, fontWeight: '600', color: '#FF5C5C' },
  card: {
    backgroundColor: '#FFF', borderRadius: 14, padding: 16, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  cardOpen: { borderLeftWidth: 3, borderLeftColor: '#FF5C5C' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  soru: { fontSize: 14, fontWeight: '600', color: '#222', flex: 1, marginRight: 8 },
  cevap: { fontSize: 13, color: '#666', marginTop: 10, lineHeight: 20 },
});
