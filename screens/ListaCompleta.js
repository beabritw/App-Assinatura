import { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';
import { AuthContext } from '../src/auth-contexto';
import AssinaturasSaida from '../components/assinaturas/AssinaturasSaida';

function ListaCompleta() {
    const { uid } = useContext(AuthContext);
    const [assinaturas, setAssinaturas] = useState([]);

    useEffect(() => {
        if (!uid) return;
      
        const unsubscribe = onSnapshot(collection(db, uid), (snapshot) => {
          const lista = snapshot.docs.map(doc => ({
            id: doc.id,
            nome: doc.data().nome,
            valor: doc.data().valor,
            categoria: doc.data().categoria,
            dataRenovacao: doc.data().dataRenovacao.toDate(),
          })).sort((a, b) => a.dataRenovacao - b.dataRenovacao);
          
          setAssinaturas(lista);
        });
      
        return () => unsubscribe(); 
      }, [uid]);

    return (
        <AssinaturasSaida 
            assinaturas={assinaturas}
            todasAssinaturas={assinaturas}
            periodo="Todas as Assinaturas"
        />
    );
}

export default ListaCompleta;