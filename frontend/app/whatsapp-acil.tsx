import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Linking, StyleSheet, Alert } from 'react-native';

const ACIL_CONTACTS = [
  { id: '1', ad: 'Diyetisyen Destek', numara: '+905001234567', unvan: 'Beslenme Danışmanı', renk: '#25D366' },
  { id: '2', ad: 'Fitness Koçu', numara: '+905009876543', unvan: 'Kişisel Antrenör', renk: '#25D366' },
  { id: '3', ad: 'Sağlık Danışmanı', numara: '+905551234567', unvan: '7/24 Destek Hattı', renk: '#FF5C5C' },
];

export default function WhatsAppAcilScreen() {
  const router = useRouter();

  const arayaGec = (numara: string, ad: string) => {
    const url = `whatsapp://send?phone=${numara.replace('+', '')}&text=Merhaba, uygulama üzerinden ulaşıyorum.`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('WhatsApp Bulunamadı', 'WhatsApp uygulaması yüklü değil.');
        }
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FF5C5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WhatsApp Acil</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <MaterialCommunityIcons name="whatsapp" size={44} color="#25D366" />
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.bannerTitle}>Acil Destek</Text>
            <Text style={styles.bannerSub}>Uzmanlarımıza hemen ulaşın</Text>
          </View>
        </View>
        {ACIL_CONTACTS.map((contact) => (
          <View key={contact.id} style={styles.card}>
            <View style={[styles.avatar, { backgroundColor: contact.renk + '20' }]}>
              <Text style={[styles.avatarText, { color: contact.renk }]}>
                {contact.ad.charAt(0)}
              </Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.adText}>{contact.ad}</Text>
              <Text style={styles.unvanText}>{contact.unvan}</Text>
            </View>
            <TouchableOpacity
              style={[styles.wpButton, { backgroundColor: contact.renk }]}
              onPress={() => arayaGec(contact.numara, contact.ad)}
              activeOpacity={0.8}>
              <MaterialCommunityIcons name="whatsapp" size={20} color="#FFF" />
              <Text style={styles.wpButtonText}>Yaz</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.disclaimer}>
          * Acil durumlarda 112'yi arayın. Bu hat sağlık danışmanlığı içindir.
        </Text>
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
    backgroundColor: '#F0FFF4', borderRadius: 16, padding: 20,
    flexDirection: 'row', alignItems: 'center', marginBottom: 24,
  },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: '#25D366' },
  bannerSub: { fontSize: 13, color: '#888', marginTop: 2 },
  card: {
    backgroundColor: '#FFF', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center',
    padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: '700' },
  adText: { fontSize: 15, fontWeight: '700', color: '#222' },
  unvanText: { fontSize: 12, color: '#888', marginTop: 2 },
  wpButton: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8,
  },
  wpButtonText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  disclaimer: { fontSize: 11, color: '#AAA', textAlign: 'center', marginTop: 16, lineHeight: 16 },
});
