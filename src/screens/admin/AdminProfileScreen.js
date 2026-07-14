import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function AdminProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800' }]}>
          Smart Thrift
        </Text>
        <Pressable onPress={() => navigation.navigate('AdminSettings')}>
          <Text style={{ fontSize: 22 }}>⚙</Text>
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarCircle}>
          <Text style={{ fontSize: 40 }}>⚙</Text>
        </View>
        <View style={styles.adminBadge}>
          <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>
            SUPER ADMIN
          </Text>
        </View>
        <Text style={[typography.heading, { marginTop: spacing.md }]}>
          {user?.name || 'Admin User'}
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          {user?.email || 'admin@smartthrift.com'}
        </Text>
      </View>

      <View style={styles.statsGrid}>
        {[
          { label: 'Total Users', value: '2,481', icon: '👥', color: colors.primaryTeal },
          { label: 'Active Sellers', value: '48', icon: '🏪', color: colors.accentGreen },
          { label: 'Total Listings', value: '1,204', icon: '📋', color: colors.primary },
          { label: 'Revenue', value: 'NPR 1.2M', icon: '💰', color: colors.amber },
        ].map((stat) => (
          <View key={stat.label} style={[styles.statCard, { borderTopColor: stat.color }]}>
            <Text style={{ fontSize: 24 }}>{stat.icon}</Text>
            <Text style={[typography.heading, { color: stat.color, fontSize: 18, marginTop: spacing.xs }]}>
              {stat.value}
            </Text>
            <Text style={typography.caption}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={{ padding: spacing.lg }}>
        <Text style={[typography.subheading, { marginBottom: spacing.sm }]}>
          Admin Actions
        </Text>
        {[
          { icon: '👥', label: 'Manage Users', screen: 'AdminUsers' },
          { icon: '📋', label: 'Moderate Listings', screen: 'AdminListings' },
          { icon: '📊', label: 'View Reports', screen: 'AdminReports' },
          { icon: '💳', label: 'Transactions', screen: 'AdminTransactions' },
          { icon: '🎫', label: 'Support Tickets', screen: 'AdminSupport' },
          { icon: '🔔', label: 'Send Notification', screen: 'AdminNotifications' },
          { icon: '⚙', label: 'Settings', screen: 'AdminSettings' },
        ].map((item) => (
          <Pressable
            key={item.label}
            style={styles.menuBtn}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={{ fontSize: 20 }}>{item.icon}</Text>
            <Text style={[typography.subheading, { marginLeft: spacing.md, flex: 1 }]}>
              {item.label}
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 20 }}>{'>'}</Text>
          </Pressable>
        ))}

        <Pressable style={styles.logoutBtn} onPress={() => logout()}>
          <Text style={{ color: colors.danger, fontWeight: '700', fontSize: 16 }}>
            Logout Admin
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  profileSection: { alignItems: 'center', padding: spacing.xl },
  avatarCircle: { width: 90, height: 90, borderRadius: 999, backgroundColor: colors.amber + '33', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.amber },
  adminBadge: { backgroundColor: '#1A1A2E', paddingHorizontal: spacing.md, paddingVertical: 3, borderRadius: radius.pill, marginTop: spacing.sm },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.lg },
  statCard: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', borderTopWidth: 3 },
  menuBtn: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md, marginBottom: spacing.sm },
  logoutBtn: { borderWidth: 1, borderColor: colors.danger, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
});