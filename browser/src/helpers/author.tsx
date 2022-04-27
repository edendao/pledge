/* eslint-disable @typescript-eslint/no-empty-function */
import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers } from "ethers"
import { providers } from "ethers"
import { useEffect, useState } from "react"
import React from "react"
import { Author } from "src/types/common/server-api"
import Web3Modal from "web3modal"

import { getAuthor } from "./api"

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

export interface AuthorContextInfo {
  currentAuthor: Author
  setCurrentAuthor: React.Dispatch<React.SetStateAction<Author>>
  connectWallet(): Promise<string>
  generateSignature(textToSign: string): Promise<string>
  currentAuthorWalletAddress: string | undefined
  signAndValidate(textToSign: string): Promise<string>
  fetchAuthorFromWalletAddress(): Promise<void>
}

const NULL_AUTHOR: Author = {
  id: "",
  twitter: "",
  country: "",
  createdAt: new Date(),
}

export const AuthorContext = React.createContext<AuthorContextInfo>({
  currentAuthor: NULL_AUTHOR,
  setCurrentAuthor: () => {},
  connectWallet: async () => "",
  generateSignature: async () => "",
  currentAuthorWalletAddress: undefined,
  signAndValidate: async () => "",
  fetchAuthorFromWalletAddress: async () => {},
})

export function AuthorProvider({ children }) {
  const [provider, setProvider] = useState(
    window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : undefined,
  )
  const [currentAuthorWalletAddress, setCurrentAuthorWalletAddress] =
    useState("")
  const [currentAuthor, setCurrentAuthor] = useState<Author>(NULL_AUTHOR)

  async function fetchAuthorFromWalletAddress() {
    await getWalletAddress().then(async id => {
      if (id) {
        await getAuthor({ id }).then(author => {
          if (author) {
            setCurrentAuthor(author)
            setCurrentAuthorWalletAddress(author.id)
          }
        })
      }
    })
  }

  async function connectWallet() {
    const instance = await web3Modal.connect()
    await instance.enable()
    const newProvider = new providers.Web3Provider(instance)
    setProvider(newProvider)
    const address = await newProvider.getSigner().getAddress()
    return address
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
      getWalletAddress().then(
        address => {
          setCurrentAuthorWalletAddress(address)
          return fetchAuthorFromWalletAddress()
        },
        () => setCurrentAuthorWalletAddress(""),
      )
    }
  }, [provider])

  const authorContext = {
    currentAuthor,
    setCurrentAuthor,
    connectWallet,
    generateSignature,
    currentAuthorWalletAddress,
    signAndValidate,
    fetchAuthorFromWalletAddress,
  }

  return (
    <AuthorContext.Provider value={authorContext}>
      {children}
    </AuthorContext.Provider>
  )
}
