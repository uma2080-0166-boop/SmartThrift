import { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

const AGE_RANGES = ['18 - 24', '25 - 34', '35 - 44', '45+'];

const BODY_TYPES = [
  { id: 'athletic', label: 'Athletic', desc: 'Toned build · 60–80 kg · Fits S–L structured cuts', icon: '🏋️' },
  { id: 'slim',     label: 'Slim',     desc: 'Lean frame · Under 60 kg · XS–M fits easily',       icon: '🧍' },
  { id: 'curvy',    label: 'Curvy',    desc: 'Fuller hips & bust · 65–90 kg · Sizes M–XL',        icon: '💃' },
  { id: 'broad',    label: 'Broad',    desc: 'Wide shoulders · 80–110 kg · Fits L–XXL best',      icon: '💪' },
];

const STYLES = [
  { name: 'Vintage',    icon: '🕰️', bg: '#F5EFE6', activeBg: '#E8D5B7' },
  { name: 'Minimalist', icon: '⬜',  bg: '#F0F0F0', activeBg: '#DCDCDC' },
  { name: 'Streetwear', icon: '🧢',  bg: '#E8EFF5', activeBg: '#C8DCF0' },
  { name: 'Luxury',     icon: '✨',  bg: '#F5F0E8', activeBg: '#E8D9C0' },
];

const CLOTHING_CATEGORIES = [
  { id: 'tees',      label: 'Tees',      icon: '👕',  text: null,  color: '#E3F2FD' },
  { id: 'shirts',    label: 'Shirts',    icon: '👔',  text: null,  color: '#E8F5E9' },
  { id: 'jeans',     label: 'Jeans',     icon: '👖',  text: null,  color: '#EDE7F6' },
  { id: 'jackets',   label: 'Jackets',   icon: '🥼',  text: null,  color: '#FFF3E0' },
  { id: 'hoodies',   label: 'Hoodies',   icon: null,  text: 'HO',  color: '#FCE4EC' },
  { id: 'overcoats', label: 'Overcoats', icon: '🧥',  text: null,  color: '#E0F7FA' },
  { id: 'shorts',    label: 'Shorts',    icon: '🩳',  text: null,  color: '#E8EAF6' },
  { id: 'joggers',   label: 'Joggers',   icon: null,  text: 'JG',  color: '#F1F8E9' },
];

export default function UpdateStylePreferenceScreen({ navigation }) {
  const { userPreferences, completeOnboarding } = useAuth();

  const [selectedAge,        setSelectedAge]        = useState(userPreferences?.age        || null);
  const [selectedBody,       setSelectedBody]       = useState(userPreferences?.bodyType   || null);
  const [selectedStyles,     setSelectedStyles]     = useState(userPreferences?.styles     || []);
  const [selectedCategories, setSelectedCategories] = useState(userPreferences?.categories || []);

  function toggleStyle(name) {
    setSelectedStyles((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  function toggleCategory(id) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function handleSave() {
    if (selectedStyles.length === 0) {
      Alert.alert('Required', 'Please select at least one style.');
      return;
    }
    if (!selectedAge) {
      Alert.alert('Required', 'Please select your age range.');
      return;
    }
    if (!selectedBody) {
      Alert.alert('Required', 'Please select your body type.');
      return;
    }
    completeOnboarding({
      styles:     selectedStyles,
      age:        selectedAge,
      bodyType:   selectedBody,
      categories: selectedCategories,
    });
    Alert.alert('Saved!', 'Your style preferences have been updated.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5FAF5' }}>

      {/* Header */}
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.brandText}>Edit Style</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}>

        <Text style={styles.mainHeading}>
          <Text style={{ color: colors.primary }}>Update Your </Text>
          <Text style={{ color: colors.accentGreen }}>Style</Text>
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          Update your preferences to get better recommendations.
        </Text>

        {/* Style tiles */}
        <Text style={[typography.heading, { marginTop: spacing.lg }]}>
          Pick your style<Text style={{ color: colors.danger, fontSize: 13 }}> *</Text>
        </Text>
        <View style={styles.styleGrid}>
          {STYLES.map((styleItem) => {
            const active = selectedStyles.includes(styleItem.name);
            return (
              <Pressable
                key={styleItem.name}
                onPress={() => toggleStyle(styleItem.name)}
                style={[
                  styles.styleTile,
                  { backgroundColor: active ? styleItem.activeBg : styleItem.bg },
                  active && styles.styleTileActive,
                ]}
              >
                {active && (
                  <View style={styles.checkmark}>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>✓</Text>
                  </View>
                )}
                <Text style={styles.tileIcon}>{styleItem.icon}</Text>
                <Text style={[styles.tileName, active && { color: colors.primary }]}>
                  {styleItem.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Age range */}
        <Text style={[typography.heading, { marginTop: spacing.xl }]}>
          What's your age range?<Text style={{ color: colors.danger, fontSize: 13 }}> *</Text>
        </Text>
        <View style={styles.ageGrid}>
          {AGE_RANGES.map((age) => (
            <Pressable
              key={age}
              onPress={() => setSelectedAge(age)}
              style={[styles.ageBtn, selectedAge === age && styles.ageBtnActive]}
            >
              <Text style={[styles.ageBtnText, selectedAge === age && styles.ageBtnTextActive]}>
                {age}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Body type */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl }}>
          <Text style={typography.heading}>
            Body type<Text style={{ color: colors.danger, fontSize: 13 }}> *</Text>
          </Text>
        </View>
        <View style={{ marginTop: spacing.sm }}>
          {BODY_TYPES.map((body) => {
            const active = selectedBody === body.id;
            return (
              <Pressable
                key={body.id}
                onPress={() => setSelectedBody(body.id)}
                style={[styles.bodyRow, active && styles.bodyRowActive]}
              >
                <View style={[styles.bodyIcon, active && styles.bodyIconActive]}>
                  <Text style={{ fontSize: 22 }}>{body.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={[typography.subheading, active && { color: '#FFFFFF' }]}>{body.label}</Text>
                  <Text style={[typography.caption, { color: active ? '#FFFFFFAA' : colors.textSecondary }]}>{body.desc}</Text>
                </View>
                <View style={[styles.checkCircle, active && styles.checkCircleActive]}>
                  {active && <Text style={{ color: '#FFFFFF', fontSize: 12 }}>✓</Text>}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Categories */}
        <Text style={[typography.heading, { marginTop: spacing.xl, marginBottom: spacing.xs }]}>
          Preferred Categories
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.md }]}>
          Select all that interest you (optional)
        </Text>
        <View style={styles.categoryGrid}>
          {CLOTHING_CATEGORIES.map((cat) => {
            const active = selectedCategories.includes(cat.id);
            return (
              <Pressable
                key={cat.id}
                onPress={() => toggleCategory(cat.id)}
                style={[
                  styles.categoryCard,
                  { backgroundColor: active ? colors.primary : cat.color },
                  active && styles.categoryCardActive,
                ]}
              >
                {cat.icon ? (
                  <Text style={{ fontSize: 26 }}>{cat.icon}</Text>
                ) : (
                  <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.10)', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, fontWeight: '900', color: active ? '#FFFFFF' : '#444' }}>{cat.text}</Text>
                  </View>
                )}
                <Text style={[typography.caption, { marginTop: 4, fontWeight: '700', textAlign: 'center', fontSize: 11 }, active && { color: '#FFFFFF' }]}>
                  {cat.label}
                </Text>
                {active && (
                  <View style={styles.categoryCheck}>
                    <Text style={{ color: '#FFFFFF', fontSize: 9 }}>✓</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Save button */}
        <Pressable style={styles.saveBtn} onPress={handleSave}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Save Preferences</Text>
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.sm },
  backBtn:   { width: 48, height: 48, borderRadius: 999, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  backArrow: { fontSize: 24, fontWeight: '700', color: colors.primary },
  brandText: { fontSize: 16, fontWeight: '800', color: colors.primary, letterSpacing: 1 },
  mainHeading: { fontSize: 28, fontWeight: '800', lineHeight: 36, marginTop: spacing.sm },
  styleGrid:   { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  styleTile:   { width: '47%', aspectRatio: 1, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  styleTileActive: { borderColor: colors.primary },
  tileIcon:    { fontSize: 40, marginBottom: spacing.xs },
  tileName:    { fontWeight: '700', fontSize: 15, color: '#444' },
  checkmark:   { position: 'absolute', top: spacing.sm, right: spacing.sm, width: 24, height: 24, borderRadius: 999, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  ageGrid:     { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  ageBtn:      { width: '47%', padding: spacing.md, borderRadius: radius.md, backgroundColor: '#FFFFFF', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  ageBtnActive:{ backgroundColor: colors.accentGreen, borderColor: colors.accentGreen },
  ageBtnText:  { fontWeight: '600', color: colors.textPrimary },
  ageBtnTextActive: { color: '#FFFFFF' },
  bodyRow:     { flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: '#FFFFFF', borderRadius: radius.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  bodyRowActive:   { backgroundColor: colors.accentGreen, borderColor: colors.accentGreen },
  bodyIcon:        { width: 48, height: 48, borderRadius: radius.sm, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
  bodyIconActive:  { backgroundColor: 'rgba(255,255,255,0.3)' },
  checkCircle:     { width: 26, height: 26, borderRadius: 999, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  checkCircleActive: { backgroundColor: 'rgba(255,255,255,0.3)', borderColor: '#FFFFFF' },
  categoryGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  categoryCard:    { width: '22%', aspectRatio: 1, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border, position: 'relative' },
  categoryCardActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryCheck:   { position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: 999, backgroundColor: colors.accentGreen, justifyContent: 'center', alignItems: 'center' },
  saveBtn:     { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl },
});