import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function getDataFormatada(data) {
  return data.toLocaleDateString('pt-BR');
}

function AssinaturaItem({ assinatura }) {
  const navigation = useNavigation();

  function assinaturaPressHandler() {
    navigation.navigate('GerenciarAssinatura', {
      assinaturaId: assinatura.id,
    });
  }

  return (
    <Pressable onPress={assinaturaPressHandler} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
            <Text style={styles.nome}>{assinatura.nome}</Text>
            <Text style={styles.categoria}>{assinatura.categoria}</Text>
        </View>
        <View style={styles.valorContainer}>
            <Text style={styles.valor}>R$ {assinatura.valor.toFixed(2)}</Text>
            <Text style={styles.data}>Vence em: {getDataFormatada(assinatura.dataRenovacao)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default AssinaturaItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    itemContainer: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    infoContainer: {
        flex: 1,
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    categoria: {
        fontSize: 12,
    },
    valorContainer: {
        alignItems: 'flex-end',
    },
    valor: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27ae60'
    },
    data: {
        fontSize: 12,
        color: '#e74c3c'
    }
});