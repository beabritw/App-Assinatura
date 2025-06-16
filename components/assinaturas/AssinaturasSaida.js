import { View, StyleSheet } from 'react-native';
import AssinaturasSumario from './AssinaturasSumario';
import AssinaturasLista from './AssinaturasLista';

function AssinaturasSaida({ assinaturas, todasAssinaturas, periodo }) {
  return (
    <View style={styles.container}>
      <AssinaturasSumario assinaturas={todasAssinaturas} />
      <AssinaturasLista assinaturas={assinaturas} />
    </View>
  );
}

export default AssinaturasSaida;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    }
})