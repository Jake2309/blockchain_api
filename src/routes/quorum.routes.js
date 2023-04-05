import { Router } from "express";
import QuorumController from "../controller/quorum.controller";
const router = new Router()

router.post('/transfer-token', async (req, res) => {
    console.log('start transfer token')
    // console.log('request: ')
    // console.log(req)
    QuorumController.transferToken(req, res)
})

router.post('/deploy-new-721-token', async (req, res) => {
    console.log('start transfer token')

    QuorumController.createNewToken(req, res)
})

router.post('/deploy-new-1155-token', async (req, res) => {
    console.log('start create-new-1155-land token')

    QuorumController.deployNew1155Token(req, res)
})

router.post('/mint-1155', async (req, res) => {
    console.log('mint-1155')

    QuorumController.mint1155Token(req, res)
})

router.get('/get-nft-name', async (req, res) => {
    console.log('start get-nft-name token')

    QuorumController.getTokenNameByAddress(req, res)
})

export default router
