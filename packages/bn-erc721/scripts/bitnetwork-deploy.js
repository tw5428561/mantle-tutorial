const ethers = require('ethers')

const factory = (name, type = '', ovm = false) => {
  const artifact = require(`../artifacts/contracts/op-erc721${type == '' ? '' : '/' + type}/${name}.sol/${name}.json`)
  return new ethers.ContractFactory(artifact.abi, artifact.bytecode)
}
const factory__L1_ERC721 = factory('ExampleToken')
const factory__L2_ERC721 = factory('OVM_L2DepositedERC721', 'OVM', true)
const factory__L1_ERC721Gateway = factory('OVM_L1ERC721Gateway', 'OVM')

async function main() {
  const l1RpcProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:9545')
  const l2RpcProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545')

  const key = '0x6395a7c842a08515961888d21d72f409b61fbce96af1e520384e375f301a8297'
  const l1Wallet = new ethers.Wallet(key, l1RpcProvider)
  const l2Wallet = new ethers.Wallet(key, l2RpcProvider)
  const l1MessengerAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F'
  const l2MessengerAddress = '0x4200000000000000000000000000000000000007'
  console.log('Deploying L1 ERC721...')
  const L1_ERC721 = await factory__L1_ERC721.connect(l1Wallet).deploy(
    'L1 ERC721 ExampleToken',
    'L1EPT'
  )
  await L1_ERC721.deployTransaction.wait()
  console.log("L1 ERC721 Contract ExampleToken Address: ", L1_ERC721.address)

  console.log('Deploying L2 ERC721...')
  const L2_ERC721 = await factory__L2_ERC721.connect(l2Wallet).deploy(
    l2MessengerAddress,
    'L2 ERC721 ExampleToken',
    'L2EPT',
    {
      gasPrice: 1
    }
  )
  await L2_ERC721.deployTransaction.wait()
  console.log("L2 ERC721 Contract OVM_L2DepositedERC721 Address: ", L2_ERC721.address)

  console.log('Deploying L1 ERC721 Gateway...')
  const L1_ERC721Gateway = await factory__L1_ERC721Gateway.connect(l1Wallet).deploy(
    L1_ERC721.address,
    L2_ERC721.address,
    l1MessengerAddress
  )
  await L1_ERC721Gateway.deployTransaction.wait()
  console.log("L1 ERC721 Gateway Contract Address: ", L1_ERC721Gateway.address)

  console.log('Initializing L2 ERC721...')
  const tx0 = await L2_ERC721.init(
    L1_ERC721Gateway.address,
    {
      gasPrice: 1
    }
  )
  await tx0.wait()
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
