import { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';
import { AuthContext } from '../src/auth-contexto';
import AssinaturasSaida from '../components/assinaturas/AssinaturasSaida';
import { View, Text, StyleSheet } from 'react-native';

function TelaInicial() {
  const { uid } = useContext(AuthContext);
  const [todasAssinaturas, setTodasAssinaturas] = useState([]);
  const [proximasAssinaturas, setProximasAssinaturas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = onSnapshot(collection(db, uid), (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
        valor: doc.data().valor,
        categoria: doc.data().categoria,
        dataRenovacao: doc.data().dataRenovacao.toDate(),
      }));

      setTodasAssinaturas(lista);


      const hoje = new Date();
      const futuras = lista
        .filter(item => item.dataRenovacao >= hoje)
        .sort((a, b) => a.dataRenovacao - b.dataRenovacao);

      setProximasAssinaturas(futuras.slice(0, 5)); 
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  if (isLoading) {
    return <View style={styles.centered}><Text>Carregando...</Text></View>
  }

  return (
    <AssinaturasSaida
      assinaturas={proximasAssinaturas} 
      todasAssinaturas={todasAssinaturas}
      periodo="Próximas Renovações"
    />
  );
}

export default TelaInicial;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});