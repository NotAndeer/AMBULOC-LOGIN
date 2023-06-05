import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Keyboard, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [eps, setEps] = useState('');
  const [soat, setSoat] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigation = useNavigation();
  const auth = getAuth();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // El correo ya está en uso
        Alert.alert('Error', 'El correo ya se está usando');
      })
      .catch((signInError) => {
        // Si el error es de tipo 'auth/user-not-found',
        // significa que el correo no está en uso y se puede crear el usuario
        if (signInError.code === 'auth/user-not-found') {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Registro exitoso
              const user = userCredential.user;
              console.log(user);

              // Lógica adicional para guardar los datos adicionales en Firebase
              // ...

              // Navegar a la pantalla de inicio de sesión
              navigation.navigate('Login');
            })
            .catch((createUserError) => {
              // Error durante el registro
              console.log(createUserError);
              Alert.alert('Error', createUserError.message);
            });
        } else {
          // Otro tipo de error durante el inicio de sesión
          console.log(signInError);
          Alert.alert('Error', signInError.message);
        }
      });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleDayChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    if (formattedText.length <= 2) {
      setDay(formattedText);
      if (formattedText.length === 2) {
        monthInput.focus();
      }
    }
  };

  const handleMonthChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    if (formattedText.length <= 2) {
      setMonth(formattedText);
      if (formattedText.length === 2) {
        yearInput.focus();
      }
    }
  };

  const handleYearChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    if (formattedText.length <= 4) {
      setYear(formattedText);
    }
  };

  let monthInput;
  let yearInput;

  return (
    <TouchableOpacity activeOpacity={1} style={styles.body} onPress={dismissKeyboard}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Regístrate</Text>
          <Text style={styles.subtitle}>Crea una nueva cuenta</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirmar contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>EPS</Text>
            <TextInput
              style={styles.input}
              placeholder="EPS"
              onChangeText={(text) => setEps(text)}
              value={eps}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>SOAT</Text>
            <TextInput
              style={styles.input}
              placeholder="SOAT"
              onChangeText={(text) => setSoat(text)}
              value={soat}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
              <TextInput
                ref={(input) => (dayInput = input)}
                style={[styles.input, styles.dateInput]}
                placeholder="Día"
                onChangeText={handleDayChange}
                value={day}
                keyboardType="number-pad"
                maxLength={2}
              />
              <TextInput
                ref={(input) => (monthInput = input)}
                style={[styles.input, styles.dateInput]}
                placeholder="Mes"
                onChangeText={handleMonthChange}
                value={month}
                keyboardType="number-pad"
                maxLength={2}
              />
              <TextInput
                ref={(input) => (yearInput = input)}
                style={[styles.input, styles.dateInput]}
                placeholder="Año"
                onChangeText={handleYearChange}
                value={year}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
          </View>

        </ScrollView>
        <TouchableOpacity style={styles.signInButton} onPress={handleRegister}>
            <Text style={styles.signInButtonText}>Registrarse</Text>
          </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    maxWidth: 700,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'transparent',
  },
  picker: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'transparent',
    marginRight: 5,
  },
  signInButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  noAccountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C3AED',
  },
});

export default RegisterScreen;
