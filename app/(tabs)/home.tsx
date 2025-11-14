import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { router } from 'expo-router';
import Header from '../../components/dashboard/Header';
import InsightCard from '../../components/dashboard/InsightCard';
import VitalsCard from '../../components/dashboard/VitalsCard';
import MedicationsCard from '../../components/dashboard/MedicationsCard';
import SymptomsCard from '../../components/dashboard/SymptomsCard';
import FloatingActionButton from '../../components/dashboard/FloatingActionButton';

export default function Home() {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserName(user.email ? user.email.split('@')[0] : 'User');
      } else {
        setUserName('Guest');
        router.replace('/(auth)/sign-in');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <View style={styles.container}>
      <Header userName={userName} onSignOut={handleSignOut} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <InsightCard title="Daily Insight" content="Stay hydrated! Drinking enough water can significantly improve your energy levels and mood." />
        <VitalsCard />
        <MedicationsCard />
        <SymptomsCard />
        {/* Add more cards here as needed */}
      </ScrollView>
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 100, // To make space for the FAB
  },
});