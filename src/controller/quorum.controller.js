import QuorumProvider from '../providers/quorum.provider';

const QuorumController = {};

QuorumController.transferToken = async (req, res) => {
    console.log('call into controller')
    let data = await QuorumProvider.getInstance().transferToken(req.body.from, req.body.to, req.body.amount)

    if (data.success) {
        return res.json('OK data success')
    }
    else return res.json('data false');
}

QuorumController.deployNew721Token = async (req, res) => {
    console.log('call createNewToken controller')
    console.log(req.query)

    let data = await QuorumProvider.getInstance().deployNew721Token(req.body.name, req.body.symbol)

    if (data.success) {
        return res.json(data.tokenResponse)
    }
    else return res.json('data false');

}

QuorumController.deployNew1155Token = async (req, res) => {
    console.log('call deployNew1155Land controller')
    console.log(req.body)

    let data = await QuorumProvider.getInstance().deployNew1155Token(req.body.name, req.body.token_uri, req.body.token_id, req.body.max_supply)

    if (data.success) {
        return res.json(data.tokenResponse)
    }
    else return res.json('data false');
}

QuorumController.transfer1155Token = async (req, res) => {
    console.log('call transfer1155Token controller')
    console.log(req.body)

    let data = await QuorumProvider.getInstance().deployNew1155Token(req.body.name, req.body.token_uri, req.body.token_id, req.body.max_supply)

    if (data.success) {
        return res.json(data.tokenResponse)
    }
    else return res.json('data false');
}

QuorumController.mint1155Token = async (req, res) => {
    console.log('call mint1155Token controller')
    console.log(req.body)

    let data = await QuorumProvider.getInstance().mint1155Token(req.body.to, req.body.token_id, req.body.amount)

    if (data.success) {
        return res.json(data.tokenResponse)
    }
    else return res.json('data false');
}

QuorumController.getTokenNameByAddress = async (req, res) => {
    console.log('call getTokenNameByAddress controller')
    // console.log(req.query)

    let data = await QuorumProvider.getInstance().getTokenNameByAddress(req.query.tokenAddress)

    console.log(data)

    if (data.success) {
        return res.json('OK: ' + data.tokenName);
    }
    else return res.json('data false');
}


export default QuorumController