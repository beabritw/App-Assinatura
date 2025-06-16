import { View, Text, StyleSheet } from 'react-native';

function AssinaturasSumario({ assinaturas }) {
  const somaMensal = assinaturas.reduce((total, assinatura) => {
    return total + assinatura.valor;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gasto Mensal Total</Text>
      <Text style={styles.valor}>R$ {somaMensal.toFixed(2)}</Text>
    </View>
  );
}

export default AssinaturasSumario;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});