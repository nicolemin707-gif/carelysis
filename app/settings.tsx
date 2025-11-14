import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../constants/firebaseConfig';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function SettingsScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
            <View style={{width: 24}}/>
        </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderSlate300,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
})
