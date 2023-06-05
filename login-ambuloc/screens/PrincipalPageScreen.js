import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrincipalPageScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSettings = () => {
    // Navegar a la pantalla de Configuración
  };

  const handleHelp = () => {
    // Navegar a la pantalla de Ayuda
  };

  const handleMap = () => {
    navigation.navigate('Home');
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>AmbuLoc</Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Menú</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Página Principal</Text>
        {/* Contenido de la página principal */}
      </View>

      {menuOpen && (
        <View style={styles.menu}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nombre de Usuario</Text>
            <View style={styles.menuOptions}>
              <TouchableOpacity onPress={handleSettings} style={styles.menuOptionButton}>
                <Text style={styles.menuOptionButtonText}>Configuración</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleHelp} style={styles.menuOptionButton}>
                <Text style={styles.menuOptionButtonText}>Ayuda</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={handleMap} style={styles.mapButton}>
        <Text style={styles.mapButtonText}>Mapa</Text>
      </TouchableOpacity>

      {menuOpen && (
        <TouchableOpacity style={styles.overlay} onPress={closeMenu} activeOpacity={1} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#7C3AED',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  menuButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  userInfo: {
    width: '100%',
    marginBottom: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  menuOptions: {
    marginBottom: 20,
  },
  menuOptionButton: {
    marginBottom: 10,
  },
  menuOptionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  mapButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
  },
  mapButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default PrincipalPageScreen;
