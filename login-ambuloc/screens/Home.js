import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDav6TPfUpab9rj9QrIaLnEHYs04_KLi6o';

const HelpButton = () => {
  const handleHelpButton = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      console.log('Current Location:', latitude, longitude);

      // Agregar aquí la lógica para la ayuda

    } catch (error) {
      console.log('Error getting current location:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.helpButton} onPress={handleHelpButton}>
      <Text style={styles.buttonText}>Ayuda</Text>
    </TouchableOpacity>
  );
};

export default function FirstScreen({ navigation }) {
  const [origin, setOrigin] = useState({
    latitude: 4.710813844200389,
    longitude: -74.06970772061347,
  });
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [loadingMessageVisible, setLoadingMessageVisible] = useState(false);
  const [cancelRequestVisible, setCancelRequestVisible] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setOrigin({
        latitude,
        longitude,
      });

      console.log('Current Location:', latitude, longitude);
    } catch (error) {
      console.log('Error getting current location:', error);
    }
  };

  const mapRef = useRef(null);

  const handleCenterMap = () => {
    const updatedRegion = {
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.001,
    };
    mapRef.current.animateToRegion(updatedRegion);
  };

  const handleHelpButtonPress = () => {
    setCancelRequestVisible(true);
    setLoadingMessageVisible(true);
    setTimeout(() => {
      setLoadingMessageVisible(false);
      setDestination({
        latitude: 4.705,
        longitude: -74.035,
      });
    }, 3000);
  };

  const handleCancelRequest = () => {
    setCancelRequestVisible(false);
    setDestination(null);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={() => navigation.navigate('Home')} style={{ fontSize: 26, fontWeight: 'bold' }}>Home</Text>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.04,
        }}
      >
        {origin && (
          <Marker
            draggable
            coordinate={origin}
            onDragEnd={(e) => setOrigin(e.nativeEvent.coordinate)}
          />
        )}

        {destination && (
          <>
            <Marker
              draggable
              coordinate={destination}
              onDragEnd={(e) => setDestination(e.nativeEvent.coordinate)}
            />

            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={6}
              onReady={(result) => {
                setRoute(result.coordinates);
              }}
              strokeColor="black"
            />
          </>
        )}
      </MapView>

      <TouchableOpacity style={styles.centerButton} onPress={handleCenterMap}>
        <FontAwesome name="crosshairs" size={24} color="white" />
      </TouchableOpacity>

      <HelpButton />

      <TouchableOpacity style={styles.emergencyButton} onPress={handleHelpButtonPress}>
        <Text style={styles.buttonText}>!</Text>
      </TouchableOpacity>

      {cancelRequestVisible && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelRequest}>
          <Text style={styles.buttonText}>Cancelar solicitud</Text>
        </TouchableOpacity>
      )}

      {loadingMessageVisible && (
        <View style={styles.loadingMessageContainer}>
          <View style={styles.loadingMessageContent}>
            <Text style={styles.loadingMessageText}>Buscando la ayuda más cercana</Text>
            <ActivityIndicator size="large" color="black" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  emergencyButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 150,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  markerIcon: {
    width: 40,
    height: 40,
  },
  centerButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessageContainer: {
    position: 'absolute',
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessageContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingMessageText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  helpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
