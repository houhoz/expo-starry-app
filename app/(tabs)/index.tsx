import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import ApodListItem from '@/components/ApodListItem';
import FullScreenImage from '@/components/FullScreenImage';
import { fetchApods, Apod } from '@/api';

export default function Page() {
  const [apods, setApods] = useState<Apod[]>([]);
  const [activePicture, setActivePicture] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchApods().then(setApods);
  }, []);

  if (!apods) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <FlatList
        data={apods}
        renderItem={({ item }) => (
          <ApodListItem
            apod={item}
            onImagePress={() => setActivePicture(item.url)}
          />
        )}
      />
      <FullScreenImage
        url={activePicture}
        onClose={() => setActivePicture(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({});
