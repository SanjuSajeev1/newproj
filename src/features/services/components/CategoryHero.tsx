import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { gs } from '../../home/constants/glassTheme';

type Props = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

export function CategoryHero({ title, subtitle, imageUrl }: Props) {
  return (
    <View style={styles.wrap}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.bg} resizeMode="cover">
        <LinearGradient
          colors={['rgba(2,6,23,0.08)', 'rgba(2,6,23,0.42)', 'rgba(2,6,23,0.88)']}
          locations={[0, 0.55, 1]}
          start={{ x: 0.25, y: 0 }}
          end={{ x: 0.55, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#0B1220',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 26,
    elevation: 7,
  },
  bg: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: gs.lg,
    paddingBottom: gs.lg,
    paddingTop: gs.lg,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.7,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 20,
  },
});

