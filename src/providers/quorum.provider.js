import axios from "axios";
import Web3 from "web3";
import quorumjs from "quorum-js";
import TruffleContract from "@truffle/contract";

const contracts = {};
class QuorumProvider {
    constructor(conString) {
        this.axiosInstance = axios.create({
            baseURL: 'http://127.0.0.1:3001',
            timeout: 5000
        });
    }

    static getInstance(conString) {
        if (!this.instance) {
            this.instance = new QuorumProvider();
        }

        return this.instance;
    }

    async init() {
        try {
            await this.initSmartContract()
        } catch (error) {
            console.log(error)
        }
    }

    async initSmartContract() {
        try {
            console.log("Initializes smart contract")
            // TODO: Implement startup connections to quorum network
            // const web3 = new Web3(new Web3.providers.HttpProvider(this.config.networks[0].provider));
            const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

            contracts.web3 = web3

            // var fcnTokenMetadata = await this.axiosInstance.get("FNCToken.json")

            // contracts.FNCToken = await TruffleContract(fcnTokenMetadata.data)

            // await contracts.FNCToken.setProvider(contracts.web3.currentProvider)

            // await contracts.FNCToken.deployed().then((instance) => {
            //     console.log('into deployed')
            //     contracts.FNCInstance = instance
            // })
            // console.log(contracts.FNCToken.isDeployed())

            // var factoryMetadata = await this.axiosInstance.get("TokenFactory.json")

            // contracts.TokenFactory = await TruffleContract(factoryMetadata.data)
            // await contracts.TokenFactory.setProvider(contracts.web3.currentProvider)

            // await contracts.TokenFactory.deployed().then((instance) => {
            //     console.log('into deployed token factory')
            //     // console.log(contracts.TokenFactory.web3.eth.defaultAccount())
            //     contracts.TokenFactoryInstance = instance
            // })

            var factory1155Metadata = await this.axiosInstance.get("Fino1155Factory.json")

            contracts.Token1155Factory = await TruffleContract(factory1155Metadata.data)
            await contracts.Token1155Factory.setProvider(contracts.web3.currentProvider)

            await contracts.Token1155Factory.deployed().then((instance) => {
                console.log('into deployed Token1155Factory')
                contracts.Token1155FactoryInstance = instance
            })

            var marketPlaceMetadata = await this.axiosInstance.get("NFTMarketPlace.json")
            contracts.NFTMarketPlace = await TruffleContract(marketPlaceMetadata.data)
            await contracts.NFTMarketPlace.setProvider(contracts.web3.currentProvider)

            await contracts.NFTMarketPlace.deployed().then((instance) => {
                console.log('into deployed NFTMarketPlace')
                contracts.MarketPlaceIns = instance
            })


        } catch (error) {
            console.log(error)
        }
    }

    async deployNew721Token(name, symbol) {
        // console.log(contracts.TokenFactoryInstance)
        var newTokenInfo = await contracts.TokenFactoryInstance.deployERC721(name, symbol, { from: "0xc9c913c8c3c1cd416d80a0abf475db2062f161f6" })
        console.log('newTokenInfo =================================================================')
        console.log(newTokenInfo)

        // console.log('logs infomations')
        // console.log(newTokenInfo.logs)

        return { success: true, tokenResponse: newTokenInfo }
    }

    async deployNew1155Token(name, uri, tokenId, maxSupply) {
        var new1155TokenInfo = await contracts.Token1155FactoryInstance.deployERC1155(name, uri, tokenId, maxSupply, { from: "0x821D0CcB36E6aB34Eeb50a56fBA9421E488fD18b" })
        console.log('new deployNew1155Land =================================================================')
        console.log(new1155TokenInfo)

        return { success: true, tokenResponse: new1155TokenInfo }
    }

    async transfer1155Token(name, uri, tokenId, maxSupply) {
        var new1155TokenInfo = await contracts.Token1155FactoryInstance.deployERC1155(name, uri, tokenId, maxSupply, { from: "0x821D0CcB36E6aB34Eeb50a56fBA9421E488fD18b" })
        console.log('new transfer1155Token =================================================================')
        console.log(new1155TokenInfo)

        return { success: true, tokenResponse: new1155TokenInfo }
    }

    async mint1155Token(to, tokenId, amount) {
        var mintERC1155 = await contracts.Token1155FactoryInstance.mintERC1155(to, tokenId, amount, { from: "0x821D0CcB36E6aB34Eeb50a56fBA9421E488fD18b" })
        console.log('new mintERC1155 =================================================================')
        console.log(mintERC1155)

        return { success: true, response: mintERC1155 }
    }

    async getTokenNameByAddress(tokenAddress) {
        let tokenName = await contracts.TokenFactoryInstance.getDeployedTokenByAddress(tokenAddress)
        return { success: true, tokenName: tokenName }
    }

    async transferToken(from, to, amount) {
        console.log('from: ' + from + ' -- to: ' + to + ' -- amount: ' + amount)
        // console.log(contracts.FNCToken)

        // var result = await contracts.FNCToken.transfer(to, amount, { from: from })
        // console.log(result.status)
        // console.log(result.tx)

        await contracts.FNCToken.deployed().then((instance) => {
            console.log('into deployed')
            console.log(instance)
            var result = instance.transfer(to, amount, { from: from })
            console.log(result.status)
            console.log(result.tx)
        })

        return { success: true }
    }
}
export default QuorumProvider