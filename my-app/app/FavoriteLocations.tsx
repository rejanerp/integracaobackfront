import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { Box, Text, HStack, VStack, IconButton, Icon } from 'native-base';
import { GET_FAVORITES } from '@/graphql/queries';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ColorsConstants, FontConstants } from '@/styles/Global.Style';

const FavoriteLocationsScreen: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_FAVORITES, {
    fetchPolicy: 'network-only',
  });
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error('Erro ao carregar os favoritos:', error);
    }
  }, [error]);

  if (loading) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando...</Text>;
  }

  return (
    <Box flex={1} backgroundColor={ColorsConstants.backgroundColor}>
      {/* Cabeçalho */}
      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingX={4}
        paddingY={3}
        backgroundColor="blue.600"
        shadow={3}
      >
        <HStack alignItems="center">
          <IconButton
            icon={<Icon as={AntDesign} name="arrowleft" color="white" />}
            onPress={() => router.replace('/dashboard')}
          />
          <Text color="white" fontSize="lg" fontFamily={FontConstants.familyRegular}>
            Favoritos
          </Text>
        </HStack>
        <IconButton
          icon={<Ionicons name="add-circle" size={24} color="white" />}
          onPress={() => router.push('/AddCityScreen')}
        />
      </HStack>

      {/* Lista de Favoritos */}
      <FlatList
        data={data?.favorites || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Animatable.View animation="fadeInUp" duration={1000}>
            <Box
              m={3}
              p={4}
              borderRadius="lg"
              backgroundColor="white"
              shadow={3}
              borderWidth={1}
              borderColor="gray.200"
            >
              <VStack>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  fontFamily={FontConstants.familyRegular}
                  color="black"
                >
                  {item.name}
                </Text>
                <Text fontSize="sm" color="gray.500" fontFamily={FontConstants.familyRegular}>
                  País: Brasil
                </Text>
              </VStack>
            </Box>
          </Animatable.View>
        )}
        onRefresh={() => refetch()}
        refreshing={loading}
      />
    </Box>
  );
};

export default FavoriteLocationsScreen;
