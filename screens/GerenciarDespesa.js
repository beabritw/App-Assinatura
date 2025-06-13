import {View, Text, TextInput, StyleSheet, Pressable, Button} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../src/auth-contexto';
import {  addDoc, collection } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';
import { Alert } from 'react-native';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';

function GerenciarDespesa({route, navigation}) {
  const despesaId = route.params?.despesaId;

  const [data, setData] = useState(new Date());
  const [dataVenc, setDataVenc] = useState(new Date());
  const [valor, setValor] = useState('');
  const [nome, setNome] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false); 
    setData(currentDate);
  };

  const handleChangeValor = (text) => {
    const cleanText = text.replace(',', '.');

    // Expressão para capturar apenas números com até 2 casas decimais
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);

    if (match) {
      setValor(cleanText);
    }
  };

const { uid } = useContext(AuthContext);

async function addDespesa() {
  try {
    await addDoc(collection(db, uid), {
      nome: nome,
      valor: parseFloat(valor),
      data: data,
    });
    Alert.alert('Sucesso', 'Despesa cadastrada com sucesso!');
    navigation.goBack();
  } catch (error) {
    console.log('Erro ao cadastrar despesa:', error);
    Alert.alert('Erro', 'Ocorreu um problema ao cadastrar a despesa.');
  }
}

useEffect(() => {
  async function buscarDespesa() {
    const docRef = doc(db, uid, despesaId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setNome(snapshot.data().nome);
      setValor(String(snapshot.data().valor));
      setData(snapshot.data().data.toDate());

      }else{
        console.log('Nenhum documento encontrado!');
      };

  }

  if (despesaId) {
    buscarDespesa();
  }
}, [despesaId]);

async function alterarDespesa() {

  try {
    const despesaRef = doc(db, uid, despesaId); // Caminho: coleção uid / documento despesaId

    await updateDoc(despesaRef, {
      nome: nome,
      valor: parseFloat(valor),
      data: data,
    });

    Alert.alert('Sucesso', 'Despesa atualizada com sucesso!');
    navigation.goBack(); // Volta para tela anterior

  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);
    Alert.alert('Erro', 'Não foi possível atualizar a despesa.');
  }
}

async function removerDespesa() {

  try {
    const despesaRef = doc(db, uid, despesaId); // coleção uid / documento despesaId
    await deleteDoc(despesaRef);

    Alert.alert('Sucesso', 'Despesa removida com sucesso!');
    navigation.goBack(); // Volta para a tela anterior

  } catch (error) {
    console.error('Erro ao remover despesa:', error);
    Alert.alert('Erro', 'Não foi possível remover a despesa.');
  }
}


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} maxLength={20}
      value = {nome} onChangeText={setNome}></TextInput>
      </View>  
      
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Valor da Despesa</Text>
      <TextInput style={styles.input} 
      keyboardType={'decimal-pad'} maxLength={10}
      value = {valor} onChangeText={handleChangeValor}></TextInput>
      </View>  

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Data da Despesa</Text>
      <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker value={data} mode="date"
            display="default" onChange={onChange}
          />
        )}

      </View>

      <View style={styles.inputContainer}>

        <Text style={styles.label}>Vencimento</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{dataVenc.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker value={dataVenc} mode="date"
            display="default"
          />
        )}
      </View>

      <View style={styles.inputContainer}>
    {despesaId ? (
      <View >
        <View style={{marginBottom:10}}>
      <Button title='Alterar' onPress={alterarDespesa}></Button>
      </View>
      <Button title='Remover' onPress={removerDespesa} color="red"></Button>
      </View>
      
     ) : (
    <Button title='Cadastrar' onPress={addDespesa}></Button>
      )
    }
      </View> 
    
    </View>

  ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
});



export default GerenciarDespesa;