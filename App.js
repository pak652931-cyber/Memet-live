import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isLive, setIsLive] = useState(false);

  // Aapke pasandida colors dictionary
  const colors = {
    primary: '#E94560',
    primary_dark: '#C73650',
    white: '#FFFFFF',
    background_dark: '#1a1a2e',
    red: '#FF0000'
  };

  if (!permission) {
    return <View style={styles.container}><Text>Camera permissions are loading...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background_dark }]}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]} 
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Live Screen Mode
  if (isLive) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing="back" mode="video">
          <View style={styles.liveOverlay}>
            <Text style={[styles.liveText, { backgroundColor: colors.red }]}>● LIVE</Text>
            <TouchableOpacity 
              style={[styles.stopButton, { backgroundColor: colors.primary }]} 
              onPress={() => setIsLive(false)}
            >
              <Text style={styles.buttonText}>Stop Streaming</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  // Main Home Interface
  return (
    <View style={[styles.container, { backgroundColor: colors.background_dark }]}>
      {/* Header bar */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>StreamFlow</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.titleText, { color: colors.white }]}>लाइव स्ट्रीम शुरू करें</Text>
        
        <TouchableOpacity 
          style={[styles.mainLiveButton, { backgroundColor: colors.primary }]} 
          onPress={() => setIsLive(true)}
        >
          <Text style={styles.buttonText}>START LIVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  mainLiveButton: {
    width: 200,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  liveOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 30,
  },
  liveText: {
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  stopButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
  }
});
      
