import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// TypeScript: solo se permiten estos valores como operación
type Operacion = 'suma' | 'resta' | 'multiplicacion' | 'division' | 'potencia';

const TITULOS: Record<Operacion, string> = {
  suma: 'La suma es',
  resta: 'La resta es',
  multiplicacion: 'El producto es',
  division: 'La división es',
  potencia: 'La potencia es',
};

export default function App() {
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [titulo, setTitulo] = useState<string>('');

  const handleOperation = (operacion: Operacion): void => {
    const num1: number = parseFloat(number1);
    const num2: number = parseFloat(number2);

    if (isNaN(num1) || isNaN(num2)) {
      Alert.alert('Error', 'Por favor ingresa números válidos');
      return;
    }

    let resultado: number;
    switch (operacion) {
      case 'suma':
        resultado = num1 + num2;
        break;
      case 'resta':
        resultado = num1 - num2;
        break;
      case 'multiplicacion':
        resultado = num1 * num2;
        break;
      case 'division':
        if (num2 === 0) {
          Alert.alert('Error', 'No se puede dividir entre 0');
          return;
        }
        resultado = num1 / num2;
        break;
      case 'potencia':
        resultado = Math.pow(num1, num2);
        break;
    }

    setTitulo(TITULOS[operacion]);
    setResult(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingresa el primer número:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={number1}
        onChangeText={setNumber1}
      />

      <Text style={styles.label}>Ingresa el segundo número:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={number2}
        onChangeText={setNumber2}
      />

      <View style={styles.buttons}>
        <Button title="Sumar" onPress={() => handleOperation('suma')} />
        <Button title="Restar" onPress={() => handleOperation('resta')} />
        <Button title="Multiplicar" onPress={() => handleOperation('multiplicacion')} />
      </View>
      <View style={styles.buttons}>
        <Button title="Dividir" onPress={() => handleOperation('division')} />
        <Button title="Potencia" onPress={() => handleOperation('potencia')} />
      </View>

      {result !== null && (
        <Text style={styles.result}>
          {titulo}: {result}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 12,
  },
  result: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
});