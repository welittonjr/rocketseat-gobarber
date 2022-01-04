import React, { createContext, useCallback } from 'react'
import api from '../service/api'

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    console.log(response.data)
  },[])

  return (
    <AuthContext.Provider value={{ name:'wellington', signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }