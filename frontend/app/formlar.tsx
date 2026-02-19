import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const BESIN_TURLERI = ['Kahvaltı', 'Öğle Yemeği', 'Akşam Yemeği', 'Ara Öğün', 'İçecek'];
const BESINLER = ['Yulaf Ezmesi', 'Yumurta', 'Tavuk Göğsü', 'Pirinç', 'Brokoli', 'Elma', 'Muz', 'Süt', 'Yoğurt', 'Fındık'];

export default function FormlarScreen() {
  const router = useRouter();

  // --- Kullanıcı Bilgileri ---
  const [ad, setAd] = useState('');
  const [yas, setYas] = useState('');
  const [kayitBilgi, setKayitBilgi] = useState<{ ad: string; yas: string } | null>(null);

  const handleKullanicıKaydet = () => {
    if (!ad.trim() || !yas.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen ad ve yaş alanlarını doldurun.');
      return;
    }
    setKayitBilgi({ ad: ad.trim(), yas: yas.trim() });
  };

  // --- Beslenme ---
  const [selectedOgun, setSelectedOgun] = useState<string | null>(null);
  const [selectedBesin, setSelectedBesin] = useState<string | null>(null);
  const [kalori, setKalori] = useState('');
  const [miktar, setMiktar] = useState('');
  const [showOgunDropdown, setShowOgunDropdown] = useState(false);
  const [showBesinDropdown, setShowBesinDropdown] = useState(false);

  const handleBeslenmeKaydet = () => {
    if (!selectedOgun || !selectedBesin || !kalori) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
      return;
    }
    Alert.alert(
      'Kaydedildi!',
      `${selectedBesin} (${selectedOgun}) - ${kalori} kcal başarıyla eklendi.`,
      [{ text: 'Tamam' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FF5C5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Formlar</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Kullanıcı Bilgileri Bölümü ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-circle-outline" size={22} color="#FF5C5C" />
            <Text style={styles.sectionTitle}>Kullanıcı Bilgileri</Text>
          </View>

          <Text style={styles.label}>Ad Soyad</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="account-outline" size={20} color="#FF5C5C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Adınızı girin"
              placeholderTextColor="#BBBBBB"
              value={ad}
              onChangeText={setAd}
            />
          </View>

          <Text style={[styles.label, { marginTop: 14 }]}>Yaş</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="calendar-account-outline" size={20} color="#FF5C5C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Yaşınızı girin"
              placeholderTextColor="#BBBBBB"
              keyboardType="numeric"
              value={yas}
              onChangeText={setYas}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleKullanicıKaydet} activeOpacity={0.8}>
            <MaterialCommunityIcons name="content-save-outline" size={20} color="#FFF" />
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>

          {kayitBilgi && (
            <View style={styles.resultCard}>
              <MaterialCommunityIcons name="check-circle-outline" size={20} color="#FF5C5C" />
              <Text style={styles.resultText}>
                Kaydedilen Bilgi: <Text style={styles.resultHighlight}>{kayitBilgi.ad}</Text>, <Text style={styles.resultHighlight}>{kayitBilgi.yas}</Text>
              </Text>
            </View>
          )}
        </View>

        {/* ── Beslenme Ekleme Bölümü ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-apple-outline" size={22} color="#FF5C5C" />
            <Text style={styles.sectionTitle}>Beslenme Ekle</Text>
          </View>

          <Text style={styles.label}>Öğün Türü</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => { setShowOgunDropdown(!showOgunDropdown); setShowBesinDropdown(false); }}>
            <Text style={selectedOgun ? styles.dropdownText : styles.dropdownPlaceholder}>
              {selectedOgun ?? 'Öğün seçin...'}
            </Text>
            <MaterialCommunityIcons name={showOgunDropdown ? 'chevron-up' : 'chevron-down'} size={22} color="#888" />
          </TouchableOpacity>
          {showOgunDropdown && (
            <View style={styles.dropdownMenu}>
              {BESIN_TURLERI.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.dropdownItem, selectedOgun === item && styles.dropdownItemActive]}
                  onPress={() => { setSelectedOgun(item); setShowOgunDropdown(false); }}>
                  <Text style={[styles.dropdownItemText, selectedOgun === item && styles.dropdownItemTextActive]}>{item}</Text>
                  {selectedOgun === item && <MaterialCommunityIcons name="check" size={18} color="#FF5C5C" />}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={[styles.label, { marginTop: 14 }]}>Besin</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => { setShowBesinDropdown(!showBesinDropdown); setShowOgunDropdown(false); }}>
            <Text style={selectedBesin ? styles.dropdownText : styles.dropdownPlaceholder}>
              {selectedBesin ?? 'Besin seçin...'}
            </Text>
            <MaterialCommunityIcons name={showBesinDropdown ? 'chevron-up' : 'chevron-down'} size={22} color="#888" />
          </TouchableOpacity>
          {showBesinDropdown && (
            <View style={styles.dropdownMenu}>
              {BESINLER.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.dropdownItem, selectedBesin === item && styles.dropdownItemActive]}
                  onPress={() => { setSelectedBesin(item); setShowBesinDropdown(false); }}>
                  <Text style={[styles.dropdownItemText, selectedBesin === item && styles.dropdownItemTextActive]}>{item}</Text>
                  {selectedBesin === item && <MaterialCommunityIcons name="check" size={18} color="#FF5C5C" />}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={[styles.label, { marginTop: 14 }]}>Miktar (gram / adet)</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="scale" size={20} color="#FF5C5C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ör: 150"
              placeholderTextColor="#BBBBBB"
              keyboardType="numeric"
              value={miktar}
              onChangeText={setMiktar}
            />
          </View>

          <Text style={[styles.label, { marginTop: 14 }]}>Kalori (kcal)</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="fire" size={20} color="#FF5C5C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ör: 320"
              placeholderTextColor="#BBBBBB"
              keyboardType="numeric"
              value={kalori}
              onChangeText={setKalori}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleBeslenmeKaydet} activeOpacity={0.8}>
            <MaterialCommunityIcons name="content-save-outline" size={20} color="#FFF" />
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#222' },
  scrollContent: { padding: 20, paddingBottom: 40 },

  section: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 18, gap: 8 },
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
    paddingVertical: 15, marginTop: 20, gap: 8,
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

  dropdown: {
    backgroundColor: '#F9F9F9', borderRadius: 12, borderWidth: 1.5, borderColor: '#EEEEEE',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingVertical: 13,
  },
  dropdownText: { fontSize: 15, color: '#222', fontWeight: '500' },
  dropdownPlaceholder: { fontSize: 15, color: '#BBBBBB' },
  dropdownMenu: {
    backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1.5,
    borderColor: '#EEEEEE', marginTop: 4, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 14, paddingVertical: 13, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  dropdownItemActive: { backgroundColor: '#FFF5F5' },
  dropdownItemText: { fontSize: 14, color: '#444' },
  dropdownItemTextActive: { color: '#FF5C5C', fontWeight: '600' },
});
