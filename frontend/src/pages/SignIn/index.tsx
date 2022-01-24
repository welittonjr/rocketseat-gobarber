import { Form } from '@unform/web'
import React, { useCallback, useContext, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import * as Yup from 'yup'
import { Container, Content, AnimationContainer, Background } from './styles'
import { FormHandles } from '@unform/core'
import getValidationsErrors from '../../utils/getValidationErrors'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { Link } from 'react-router-dom'

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth()
  const { addToast } = useToast()
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({
          name: 'Nome obrigatório'
        })

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Digite um e-mail válido!'),
          password: Yup.string().min(1, 'Senha obrigatório!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credencias.'
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input 
              name="email" 
              icon={FiMail} 
              placeholder="E-mail" />

            <Input 
              name="password" 
              icon={FiLock} 
              type="password" 
              placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <Link to="/signup">
              <FiLogIn />
              Esqueci minha senha
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn