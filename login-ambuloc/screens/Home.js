import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDav6TPfUpab9rj9QrIaLnEHYs04_KLi6o';

const Stack = createStackNavigator();

export default function FirstScreen({ navigation }) {
  const [origin, setOrigin] = useState({
    latitude: 4.7014,
    longitude: -74.03244,
  });

  const [destination, setDestination] = useState({
    latitude: 4.700923565472723,
    longitude: -74.03156339834439,
  });

  const [route, setRoute] = useState(null);
  const [duration, setDuration] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMoving) {
        setDestination((prevDestination) => ({
          latitude: prevDestination.latitude - 0.0001,
          longitude: prevDestination.longitude - 0.0001,
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMoving]);

  useEffect(() => {
    const updatedRegion = {
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.001,
    };

    mapRef.current.animateToRegion(updatedRegion);
  }, [origin]);

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

  const handleStartMoving = () => {
    setIsMoving(true);
  };

  const handleStopMoving = () => {
    setIsMoving(false);
  };

  const handleHelpButton = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setDestination({
        latitude,
        longitude,
      });

      console.log('Current Location:', latitude, longitude);
    } catch (error) {
      console.log('Error getting current location:', error);
    }
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
        <Marker
          draggable
          coordinate={origin}
          onDragEnd={(e) => setOrigin(e.nativeEvent.coordinate)}
        >
        </Marker>

        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(e) => setDestination(e.nativeEvent.coordinate)}
        >
        </Marker>

        <Polyline coordinates={route || [origin, destination]} />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={6}
          onReady={(result) => {
            setRoute(result.coordinates);
            setDuration(result.duration);
          }}
          strokeColor="black"
        />
      </MapView>

      <TouchableOpacity style={styles.centerButton} onPress={handleCenterMap}>
        <FontAwesome name="crosshairs" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.emergencyButton} onPress={handleHelpButton}>
        <Text style={styles.buttonText}>AYUDA</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        {isMoving ? (
          <TouchableOpacity style={styles.stopButton} onPress={handleStopMoving}>
            <Text style={styles.buttonText}>Detener Movimiento</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={handleStartMoving}>
            <Text style={styles.buttonText}>Iniciar Movimiento</Text>
          </TouchableOpacity>
        )}
      </View>
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
    top: 550,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: 'green',
    width: 200,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stopButton: {
    backgroundColor: 'red',
    width: 200,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
