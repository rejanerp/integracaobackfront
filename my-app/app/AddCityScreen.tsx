import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Box, VStack, FormControl, Input, Switch, Button, Text, HStack } from 'native-base';
import { useMutation } from '@apollo/client';
import { ADD_CITY } from '@/graphql/mutations';
import { useRouter } from 'expo-router';

const AddCityScreen: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [hasPassport, setHasPassport] = useState(false);
  const [date, setDate] = useState('');

  const [addCity, { loading, error }] = useMutation(ADD_CITY);
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const handleAddCity = () => {
    if (!cityName || !country) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    Alert.alert(
      'Confirmação',
      `Você deseja adicionar a cidade:\n\nCidade: ${cityName}\nPaís: ${country}\nPassaporte: ${hasPassport ? 'Sim' : 'Não'}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await addCity({
                variables: { name: cityName, state: country },
                refetchQueries: ['GetFavorites'], // Atualiza lista de favoritos
              });
              alert('Cidade adicionada com sucesso!');
              router.replace('/FavoriteLocations'); // Redireciona após salvar
            } catch (err) {
              console.error('Erro ao adicionar cidade:', err);
              alert('Erro ao salvar a cidade. Tente novamente.');
            }
          },
        },
      ]
    );
  };

  return (
    <Box flex={1} p={4} backgroundColor="white">
      <VStack space={4}>
        {/* Nome da Cidade */}
        <FormControl isRequired>
          <FormControl.Label>Nome da Cidade</FormControl.Label>
          <Input
            value={cityName}
            onChangeText={setCityName}
            placeholder="Digite o nome da cidade"
          />
        </FormControl>

        {/* País */}
        <FormControl isRequired>
          <FormControl.Label>País</FormControl.Label>
          <Input
            value={country}
            onChangeText={setCountry}
            placeholder="Digite o nome do país"
          />
        </FormControl>

        {/* Data */}
        <FormControl>
          <FormControl.Label>Data</FormControl.Label>
          <Input value={date} isReadOnly placeholder="Data atual" />
        </FormControl>

        {/* Passaporte */}
        <FormControl>
          <FormControl.Label>Passaporte:</FormControl.Label>
          <HStack alignItems="center" justifyContent="space-between">
            <Text>Não</Text>
            <Switch
              isChecked={hasPassport}
              onToggle={() => setHasPassport(!hasPassport)}
              onTrackColor="blue.600"
            />
            <Text>Sim</Text>
          </HStack>
        </FormControl>

        {/* Botão de Salvar */}
        <Button mt={4} onPress={handleAddCity} colorScheme="blue" isLoading={loading}>
          Adicionar Cidade
        </Button>

        {/* Erro de Mutação */}
        {error && (
          <Text color="red.500" mt={2}>
            Erro ao salvar a cidade. Tente novamente.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default AddCityScreen;
