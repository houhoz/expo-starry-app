import ApodListItem from '@/components/ApodListItem';
import { fetchApod, Apod } from '@/api';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

const ApodDetails = () => {
  const { date } = useLocalSearchParams() as { date: string };
  const [apod, setApod] = useState<Apod>({} as Apod);

  useEffect(() => {
    fetchApod(date).then(setApod);
  }, [date]);

  if (!apod) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <Stack.Screen options={{ title: date }} />
      <ApodListItem apod={apod} />
      <Text
        style={{
          padding: 15,
          backgroundColor: 'white',
          lineHeight: 22,
          fontSize: 16,
          maxWidth: 500,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        {apod.explanation}
      </Text>
    </ScrollView>
  );
};

export default ApodDetails;
