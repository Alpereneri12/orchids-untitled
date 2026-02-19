import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Linking, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import MenuCard from '@/components/MenuCard';

const WHATSAPP_NUMBER = '905551234567';
const WHATSAPP_MESSAGE = 'Yardıma ihtiyacım var.';

const HEALTH_TIPS = [
  'Su içmek için harika bir zaman! 💧',
  'Bugün 15 dakika yürüyüş seni zinde tutar. 🚶',
  'Öğünlerini küçük tutmak metabolizmanı hızlandırır. 🥗',
  'Derin bir nefes al — stres seviyeni düşürür. 🧘',
  'Bu gece erken yatmak yarınki performansını artırır. 😴',
  'Sebze ve meyve tüketimini artırmayı dene bugün! 🥦',
  'Ekran başından kalk, 5 dakika hareket et. 🏃',
  'Vücudun için en iyi ilaç: düzenli uyku. 🌙',
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'Günaydın ☀️';
  if (hour >= 12 && hour < 18) return 'Tünaydın 👋';
  return 'İyi Akşamlar 🌙';
}

function openWhatsApp() {
  const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
  const nativeUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;
  const webUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  Linking.canOpenURL(nativeUrl)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(nativeUrl);
      }
      // Fallback: try web link (works in browser / web preview)
      return Linking.openURL(webUrl);
    })
    .catch(() => {
      Alert.alert(
        'WhatsApp Yüklü Değil',
        'Lütfen WhatsApp uygulamasını yükleyin ve tekrar deneyin.'
      );
    });
}

const MENU_ITEMS = [
  { title: 'Formlar', icon: 'file-document-outline', route: '/formlar' as const },
  { title: 'Eğitimler', icon: 'dumbbell', route: '/egitimler' as const },
  { title: 'Günlük Hedefler', icon: 'target', route: '/gunluk-hedefler' as const },
  { title: 'SSS', icon: 'frequently-asked-questions', route: '/sss' as const },
  { title: 'Bildirimler', icon: 'bell-outline', route: '/bildirimler' as const },
  { title: 'WhatsApp Acil', icon: 'whatsapp', route: null },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState(getGreeting);
  const dailyTip = useMemo(
    () => HEALTH_TIPS[Math.floor(Math.random() * HEALTH_TIPS.length)],
    []
  );

  useEffect(() => {
    const timer = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const rows: (typeof MENU_ITEMS[number])[][] = [];
  for (let i = 0; i < MENU_ITEMS.length; i += 2) {
    rows.push(MENU_ITEMS.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeSmall}>Hoş Geldiniz</Text>
          <Text style={styles.welcomeName}>{greeting}</Text>
          <Text style={styles.welcomeSub}>Bugün nasıl hissediyorsunuz?</Text>
        </View>

        {/* Motivasyon Kartı */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationIcon}>💡</Text>
          <Text style={styles.motivationText}>{dailyTip}</Text>
        </View>

        {/* Stats banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.850</Text>
            <Text style={styles.statLabel}>Kalori</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>6.240</Text>
            <Text style={styles.statLabel}>Adım</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>%78</Text>
            <Text style={styles.statLabel}>Hedef</Text>
          </View>
        </View>

        {/* Grid Menu */}
        <Text style={styles.sectionTitle}>Menü</Text>
        <View style={styles.grid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item) => (
                <MenuCard
                  key={item.title}
                  title={item.title}
                  iconName={item.icon as any}
                  onPress={
                    item.route === null
                      ? openWhatsApp
                      : () => router.push(item.route as any)
                  }
                />
              ))}
              {row.length === 1 && <View style={styles.emptyCell} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
    marginTop: 8,
  },
  welcomeSmall: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  welcomeName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginTop: 2,
  },
  welcomeSub: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  motivationCard: {
    backgroundColor: 'rgba(255, 92, 92, 0.10)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 92, 92, 0.20)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  motivationIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  motivationText: {
    flex: 1,
    fontSize: 14,
    color: '#CC2E2E',
    fontWeight: '600',
    lineHeight: 20,
  },
  statsBanner: {
    backgroundColor: '#FF5C5C',
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 28,
    alignItems: 'center',
    shadowColor: '#FF5C5C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  grid: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
  },
  emptyCell: {
    flex: 1,
    margin: 8,
  },
});
