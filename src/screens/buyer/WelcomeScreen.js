import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.page}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoTextTop}>SMART</Text>
        <Text style={styles.logoTextBottom}>THRIFT</Text>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.buyerBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ fontSize: 18, marginRight: 10 }}>🛍</Text>
          <Text style={styles.buyerBtnText}>Shop as Buyer</Text>
        </Pressable>

        <Pressable
          style={styles.sellerBtn}
          onPress={() => navigation.navigate('SellerLogin')}
        >
          <Text style={{ fontSize: 18, marginRight: 10 }}>🏪</Text>
          <Text style={styles.sellerBtnText}>Login as Seller</Text>
        </Pressable>

        <Pressable
          style={styles.adminBtn}
          onPress={() => navigation.navigate('AdminLogin')}
        >
          <Text style={{ fontSize: 18, marginRight: 10 }}>⚙</Text>
          <Text style={styles.adminBtnText}>Admin Portal</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#8CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoCircle: {
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: '#D8A972',
    borderWidth: 8,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 64,
  },
  logoTextTop: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  logoTextBottom: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 1,
  },
  buttonGroup: {
    width: '100%',
    gap: 16,
  },
  buyerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B2E23',
    borderRadius: 999,
    paddingVertical: 16,
    width: '100%',
  },
  buyerBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  sellerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F7C7C',
    borderRadius: 999,
    paddingVertical: 16,
    width: '100%',
  },
  sellerBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  adminBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    width: '100%',
  },
  adminBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});