import React, { useState } from 'react'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Content, Background } from './styles'

const SignUp: React.FC = () => {

  const signUpInitState = {
    id: null,
    name: "",
    email: "",
    password: ""
  };

  const [signup, setSignUp] = useState(signUpInitState);
  // const [submitted, setSubmitted] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignUp({ ...signup, [name]: value });
    console.log(signup);
  }

  function saveSignUp() {
    console.log(signup)
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <form>
          <h1>Faça seu cadastro</h1>

          <Input 
            name="name" 
            icon={FiUser} 
            placeholder="Nome" 
            onChange={handleInputChange} />

          <Input 
            name="email" 
            icon={FiMail} 
            placeholder="E-mail" 
            onChange={handleInputChange} />

          <Input 
            name="password" 
            icon={FiLock} 
            type="password" 
            placeholder="Senha" 
            onChange={handleInputChange} />

          <Button type="submit" onClick={saveSignUp}> Cadastrar </Button>

          <a href="#">
            <FiArrowLeft />
            Voltar para login
          </a>
        </form>
      </Content>
    </Container>
  )
}

export default SignUp