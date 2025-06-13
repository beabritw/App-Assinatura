import { useEffect, useContext, useState } from 'react'
import DespesaSaida from '../components/despesa/DespesaSaida'
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../src/firebaseConnection'
import {AuthContext} from '../src/auth-contexto';

function DespesaRecentes() {
  const { uid } = useContext(AuthContext)
  const [despesas, setDespesas] = useState([])

  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter(despesa => {
        return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }
  useEffect(() => {
      if (!uid) return;
    
      const unsubscribe = onSnapshot(collection(db, uid), snapshot => {
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          descricao: doc.data().descricao,
          valor: doc.data().valor,
          data: doc.data().data?.toDate?.() || new Date(),
        }));
        setDespesas(filtrarUltimos7Dias(lista));
      });
    
      return () => unsubscribe(); // limpa o listener ao sair
    }, [uid]);

  return (
      <DespesaSaida despesas={despesas} periodo={'Total'}/>
  )
}

export default DespesaRecentes;