import { FlatList } from 'react-native';
import AssinaturaItem from './AssinaturaItem';

function AssinaturasLista({ assinaturas }) {
  return (
    <FlatList
      data={assinaturas}
      renderItem={({ item }) => <AssinaturaItem assinatura={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default AssinaturasLista;