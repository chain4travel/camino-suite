import React, { createContext, useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import s from './ManagerProxyModule#CMAccountManager.json'
const SmartContractContext = createContext()

export const useSmartContract = () => useContext(SmartContractContext)

export const SmartContractProvider = ({ children }) => {
    const [web3, setWeb3] = useState(null)
    const [contract, setContract] = useState(null)
    const [account, setAccount] = useState(null)

    useEffect(() => {
        const initializeWeb3 = async () => {
            const web3Instance = new Web3(Web3.givenProvider || 'http://localhost:8545')
            setWeb3(web3Instance)
            let contractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'
            // console.log({ bytecode: s.bytecode, abi: s.abi, contratAddress: s })
            try {
                const accounts = await web3Instance.eth.getAccounts()
                setAccount(accounts[0])

                const contractInstance = new web3Instance.eth.Contract(s.abi, contractAddress)
                setContract(contractInstance)
            } catch (error) {
                console.error('Error initializing Web3 or contract:', error)
            }
        }

        initializeWeb3()
    }, [])

    const readFromContract = async (method, ...args) => {
        if (!contract) {
            console.error('Contract is not initialized')
            return
        }

        try {
            const result = await contract.methods['getAllRegisteredServiceNames'](...args).call({
                from: account,
            })
            return result
        } catch (error) {
            console.error(`Error reading from contract (method: ${method}):`, error)
            throw error
        }
    }

    const writeToContract = async (method, ...args) => {
        if (!contract) {
            console.error('Contract is not initialized')
            return
        }
        console.log(contract.methods)

        try {
            const result = await contract.methods['registerService'](...args).send({
                from: account,
            })
            // const result = await contract.methods[method](...args).send({ from: account })
            return result
        } catch (error) {
            console.error(`Error writing to contract (method: ${method}):`, error)
            throw error
        }
    }

    const value = {
        web3,
        contract,
        account,
        readFromContract,
        writeToContract,
    }

    return <SmartContractContext.Provider value={value}>{children}</SmartContractContext.Provider>
}
