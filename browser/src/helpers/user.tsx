/* eslint-disable @typescript-eslint/no-empty-function */
import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers } from "ethers"
import { providers } from "ethers"
import { useEffect, useState } from "react"
import React from "react"
import { Author } from "src/types/common/server-api"
import Web3Modal from "web3modal"

import { getUser } from "./api"

const Web3ModalProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID,
    },
  },
}
const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions: Web3ModalProviderOptions,
})

export interface UserContextInfo {
  currentUser: Author | undefined
  setCurrentUser(user: Author | undefined): void
  connectWallet(): Promise<void>
  generateSignature(textToSign: string): Promise<string>
  currentUserWalletAddress: string | undefined
  signAndValidate(textToSign: string): Promise<string>
  fetchUserFromWalletAddress(): Promise<void>
}

export const UserContext = React.createContext<UserContextInfo>({
  currentUser: undefined,
  setCurrentUser: () => {},
  connectWallet: async () => {},
  generateSignature: async () => "",
  currentUserWalletAddress: undefined,
  signAndValidate: async () => "",
  fetchUserFromWalletAddress: async () => {},
})

export function UserProvider({ children }) {
  const [provider, setProvider] = useState(
    window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : undefined,
  )
  const [currentUserWalletAddress, setCurrentUserWalletAddress] = useState<
    string | undefined
  >()
  const [currentUser, setCurrentUser] = useState<Author | undefined>()

  async function fetchUserFromWalletAddress(): Promise<void> {
    const address = await getWalletAddress()
    if (address) {
      const newUser = await getUser({ id: address })
      setCurrentUser(newUser)
      setCurrentUserWalletAddress(newUser?.walletId)
    }
  }

  async function connectWallet(): Promise<void> {
    const instance = await web3Modal.connect()
    await instance.enable()
    const newProvider = new providers.Web3Provider(instance)
    setProvider(newProvider)
  }

  // Utility methods for accessing a connected wallet account.
  async function generateSignature(textToSign: string): Promise<string> {
    if (!provider) {
      throw new Error("No web3 provider found!")
    }
    // Sign the declaration. Any errors here should be handled by the caller.
    const signer = provider.getSigner()
    return await signer.signMessage(textToSign)
  }

  async function getWalletAddress(): Promise<string> {
    if (!provider) {
      throw new Error("No web3 provider found!")
    }
    return await provider.getSigner().getAddress()
  }

  async function signAndValidate(textToSign: string): Promise<string> {
    if (!provider) {
      throw new Error("No web3 provider found!")
    }
    const signature = await generateSignature(textToSign)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const verifyingAddress = ethers.utils.verifyMessage(textToSign, signature)
    if (verifyingAddress !== address) {
      throw new Error("Invalid Signature!")
    }
    return signature
  }

  useEffect(() => {
    if (provider) {
      getWalletAddress()
        .then(address =>
          fetchUserFromWalletAddress().then(() => {
            setCurrentUserWalletAddress(address)
          }),
        )
        .catch(() => {
          setCurrentUserWalletAddress(undefined)
        })
    }
  }, [provider])

  const userContext = {
    currentUser,
    setCurrentUser,
    connectWallet,
    generateSignature,
    currentUserWalletAddress,
    signAndValidate,
    fetchUserFromWalletAddress,
  }

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  )
}
