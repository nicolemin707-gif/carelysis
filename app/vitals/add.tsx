import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../constants/firebaseConfig';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function AddVitalScreen() {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleAddVital = async () => {
    if (!type || !value) {
      setError('Please fill out all fields.');
      return;
    }
    try {
      await addDoc(collection(db, 'vitals'), {
        userId: auth.currentUser.uid,
        type,
        value,
        numericValue: parseFloat(value),
        timestamp: serverTimestamp(),
        // TODO: Add logic to determine status, icon, etc.
        label: type,
        unit: getUnitForType(type),
        status: 'Normal',
        statusColor: '#34c759',
        icon: getIconForType(type),
        iconColor: getColorForType(type),
        bgColor: getBgColorForType(type),
      });
      router.back();
    } catch (err) {
      setError(err.message);
    }
  };

  const getUnitForType = (type) => {
    switch (type) {
      case 'Heart Rate':
        return 'BPM';
      default:
        return '';
    }
  };

  const getIconForType = (type) => {
      switch (type) {
          case 'Heart Rate':
              return 'favorite';
          case 'Blood Pressure':
              return 'bloodtype';
          case 'Temperature':
              return 'thermostat';
          default:
              return 'help';
      }
  }

    const getColorForType = (type) => {
        switch (type) {
            case 'Heart Rate':
                return '#ff3b30';
            case 'Blood Pressure':
                return '#ff9500';
            case 'Temperature':
                return '#34c759';
            default:
                return '#000000';
        }
    }

    const getBgColorForType = (type) => {
        switch (type) {
            case 'Heart Rate':
                return '#ffebee';
            case 'Blood Pressure':
                return '#fff3e0';
            case 'Temperature':
                return '#e8f5e9';
            default:
                return '#ffffff';
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Add New Vital</Text>
            <View style={{width: 24}}/>
        </View>
      <TextInput
        style={styles.input}
        placeholder="Vital Type (e.g., Heart Rate)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Add Vital" onPress={handleAddVital} />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        margin: 16,
    },
    error: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    }
})
