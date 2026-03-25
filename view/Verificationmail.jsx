// view/ConfirmEmail.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { supabase } from '../services/supabase';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';

export function Verificationmail() {
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();

  useEffect(() => {
    // Fonction pour récupérer le token depuis le lien
    const handleDeepLink = async (event) => {
      const url = event.url ? event.url : event;
      const { queryParams } = Linking.parse(url);
      const token = queryParams.token;

      if (!token) {
        Alert.alert('Erreur', 'Lien invalide.');
        setLoading(false);
        return;
      }

      try {
        // Confirmer l'email avec Supabase
        const { error } = await supabase.auth.verifyOtp({ token, type: 'signup' });
        if (error) throw error;

        Alert.alert('Succès', 'Votre email a été confirmé !');
        nav.navigate('connect'); // redirige vers la page de connexion
      } catch (err) {
        console.log(err);
        Alert.alert('Erreur', err.message);
      } finally {
        setLoading(false);
      }
    };

    // Récupération du lien au lancement si ouvert depuis un deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // Écoute des liens entrants quand l'app est ouverte
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#3CB54A" />
          <Text style={styles.text}>Confirmation en cours...</Text>
        </>
      ) : (
        <Text style={styles.text}>Terminé !</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  text: { fontSize: 16, marginTop: 20, color: '#333' },
});