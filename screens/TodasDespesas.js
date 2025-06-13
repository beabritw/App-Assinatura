import { useEffect, useContext, useState } from 'react'
import DespesaSaida from '../components/despesa/DespesaSaida'
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../src/firebaseConnection'
import {AuthContext} from '../src/auth-contexto';

function TodasDespesas(){
    const { uid } = useContext(AuthContext)
    const [despesas, setDespesas] = useState([])

    useEffect(() => {
        if (!uid) return;
      
        const unsubscribe = onSnapshot(collection(db, uid), snapshot => {
          const lista = snapshot.docs.map(doc => ({
            id: doc.id,
            descricao: doc.data().descricao,
            valor: doc.data().valor,
            data: doc.data().data?.toDate?.() || new Date(),
          }));
          setDespesas(lista);
        });
      
        return () => unsubscribe(); // limpa o listener ao sair
      }, [uid]);

    return (
        <DespesaSaida despesas={despesas} periodo={'Total'}/>
    )
}
export default TodasDespesas




