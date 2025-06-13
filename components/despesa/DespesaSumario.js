import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({despesas, periodo}){
    const somaDespesas = despesas.reduce((total, despesa) => {
        return total + despesa.valor;
    }, 0);


    return (
        <View style={styles.topo}>
            <Text style={styles.textoBrancoNegrito}>{periodo}</Text>
            <Text style={styles.textoBrancoNegrito}>Vencimento</Text>
            <Text style={styles.textoBrancoNegrito}>R$ {somaDespesas.toFixed(2)}</Text>
        </View>
    );
}

export default DespesaSumario;

const styles = StyleSheet.create({
    topo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'darkgray',

    },
  textoBrancoNegrito: {
    color: 'white',
    fontWeight: 'bold',
  }
})