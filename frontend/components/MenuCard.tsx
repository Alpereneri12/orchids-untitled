import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface MenuCardProps {
  title: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
}

export default function MenuCard({ title, iconName, onPress }: MenuCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons name={iconName} size={36} color="#FF5C5C" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flex: 1,
    margin: 8,
    paddingVertical: 28,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 120,
  },
  iconWrapper: {
    backgroundColor: '#FFF0F0',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
});
