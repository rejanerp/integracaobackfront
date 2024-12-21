import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, Input, Button, Text, Spinner } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Imports internos
import { auth, db } from '@/constants/firebase';
import { FontConstants, ColorsConstants, SizeConstants } from '@/styles/Global.Style';
import { setUser } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';
import { useQuery } from '@apollo/client';
import { GET_FAVORITES } from '@/graphql/queries';
import { setFavorites } from '@/store/slices/locationsSlice';

const AnimatableImageBackground = Animatable.createAnimatableComponent(ImageBackground);

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  
  const { data, loading, error } = useQuery(GET_FAVORITES);

  useEffect(() => {
    if (data && data.cities) {
      dispatch(setFavorites(data.cities));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('Erro ao carregar dados via GraphQL:', error.message);
    }
  }, [error]);

  
  const register = async () => {
    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos!');
      return;
    }
    try {
      const credencial = await createUserWithEmailAndPassword(auth, username, password);
      const user = credencial.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: username,
      });
      dispatch(setUser({ uid: user.uid, email: username }));
      setErrorMessage('');
      router.replace('/dashboard');
    } catch (error: any) {
      console.error('Erro ao registrar:', error?.message);
      setErrorMessage('Erro ao registrar: ' + (error?.message || 'Erro desconhecido'));
    }
  };

  
  const login = async () => {
    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos!');
      return;
    }
    try {
      const credencial = await signInWithEmailAndPassword(auth, username, password);
      const user = credencial.user;
      dispatch(setUser({ uid: user.uid, email: username }));
      setErrorMessage('');
      router.replace('/dashboard');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error?.message);
      setErrorMessage('Erro ao fazer login: ' + (error?.message || 'Erro desconhecido'));
    }
  };

  const user = useSelector((state: RootState) => state.auth.user);

  
  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg={ColorsConstants.backgroundColor}>
        <Spinner size="lg" color={FontConstants.color} />
        <Text color={FontConstants.color} mt={4}>Carregando dados...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg={ColorsConstants.backgroundColor}>
      <AnimatableImageBackground
        source={require('@/assets/images/background.jpg')}
        resizeMode="cover"
        style={{ flex: 1 }}
        animation="fadeIn"
        duration={1000}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
          }}
        >
          <Animatable.View
            animation="fadeInDown"
            duration={1500}
            style={{ alignItems: 'center', marginBottom: 40 }}
          >
            <Text
              fontSize="4xl"
              fontWeight="bold"
              fontFamily={FontConstants.familyRegular}
              color={FontConstants.color}
            >
              Bem-vindo
            </Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            duration={1500}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <FormControl mb={4} isInvalid={!username}>
              <FormControl.Label>E-mail</FormControl.Label>
              <Input
                value={username}
                onChangeText={setUsername}
                variant="filled"
                placeholder="Seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                fontFamily={FontConstants.familyRegular}
              />
              {!username ? (
                <FormControl.ErrorMessage>
                  Preencha o e-mail
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>

            <FormControl mb={4} isInvalid={!password}>
              <FormControl.Label>Senha</FormControl.Label>
              <Input
                value={password}
                onChangeText={setPassword}
                variant="filled"
                placeholder="Sua senha"
                secureTextEntry
                fontFamily={FontConstants.familyRegular}
              />
              {!password ? (
                <FormControl.ErrorMessage>
                  Preencha a senha
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>

            {errorMessage ? (
              <Text color="red.500" textAlign="center" mb={4} fontFamily={FontConstants.familyRegular}>
                {errorMessage}
              </Text>
            ) : null}

            <Button
              onPress={isRegistering ? register : login}
              mb={4}
              height={SizeConstants.height.medium}
            >
              {isRegistering ? 'Registrar' : 'Login'}
            </Button>
            <Button variant="link" onPress={() => setIsRegistering(!isRegistering)}>
              {isRegistering
                ? 'Já tem uma conta? Fazer login'
                : 'Não tem uma conta? Registrar'}
            </Button>
          </Animatable.View>
        </KeyboardAvoidingView>
      </AnimatableImageBackground>
    </Box>
  );
};

export default HomeScreen;  