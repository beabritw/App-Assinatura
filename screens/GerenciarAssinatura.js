import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../src/auth-contexto';
import { addDoc, collection, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';

function GerenciarAssinatura({ route, navigation }) {
  const { uid } = useContext(AuthContext);
  const assinaturaId = route.params?.assinaturaId;
  const isEditing = !!assinaturaId;

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dataRenovacao, setDataRenovacao] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar Assinatura' : 'Adicionar Assinatura',
    });
  }, [navigation, isEditing]);

  useLayoutEffect(() => {
    async function buscarAssinatura() {
      if (isEditing) {
        const docRef = doc(db, uid, assinaturaId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setNome(data.nome);
          setValor(String(data.valor));
          setCategoria(data.categoria);
          setDataRenovacao(data.dataRenovacao.toDate());
        }
      }
    }
    buscarAssinatura();
  }, [assinaturaId, isEditing, uid]);


  function onChangeDate(event, selectedDate) {
    const currentDate = selectedDate || dataRenovacao;
    setShowPicker(false);
    setDataRenovacao(currentDate);
  }
  
  function handleChangeValor(text) {
    const cleanText = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(cleanText)) {
      setValor(cleanText);
    }
  }
  
  async function handleConfirm() {
    if (!nome || !valor || !categoria) {
      Alert.alert('Campos Incompletos', 'Por favor, preencha todos os campos.');
      return;
    }
  
    const dadosAssinatura = {
      nome,
      valor: parseFloat(valor),
      dataRenovacao,
      categoria,
    };
  
    try {
      if (isEditing) {
        const docRef = doc(db, uid, assinaturaId);
        await updateDoc(docRef, dadosAssinatura);
        Alert.alert('Sucesso', 'Assinatura atualizada com sucesso!');
      } else {
        await addDoc(collection(db, uid), dadosAssinatura);
        Alert.alert('Sucesso', 'Assinatura cadastrada com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar assinatura:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao salvar a assinatura.');
    }
  }
  
  async function handleDelete() {
    try {
      const docRef = doc(db, uid, assinaturaId);
      await deleteDoc(docRef);
      Alert.alert('Sucesso', 'Assinatura removida com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao remover assinatura:', error);
      Alert.alert('Erro', 'Não foi possível remover a assinatura.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome da Assinatura</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor Mensal (R$)</Text>
        <TextInput style={styles.input} keyboardType="decimal-pad" value={valor} onChangeText={handleChangeValor} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <TextInput style={styles.input} placeholder="Ex: Streaming, Educação, Software" value={categoria} onChangeText={setCategoria} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Próxima Renovação</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{dataRenovacao.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker value={dataRenovacao} mode="date" display="default" onChange={onChangeDate} />
        )}
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button title={isEditing ? 'Atualizar' : 'Adicionar'} onPress={handleConfirm} />
        {isEditing && (
          <View style={{marginTop: 10}}>
            <Button title="Excluir" color="red" onPress={handleDelete} />
          </View>
        )}
      </View>
    </View>
  );
}

export default GerenciarAssinatura;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputContainer: { marginVertical: 10 },
  label: { fontSize: 14, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 16 },
  buttonsContainer: { marginTop: 20 }
});