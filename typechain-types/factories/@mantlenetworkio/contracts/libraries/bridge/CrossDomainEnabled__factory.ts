/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  CrossDomainEnabled,
  CrossDomainEnabledInterface,
} from "../../../../../@mantlenetworkio/contracts/libraries/bridge/CrossDomainEnabled";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_messenger",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "messenger",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161020d38038061020d833981810160405281019061003291906100db565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610108565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100a88261007d565b9050919050565b6100b88161009d565b81146100c357600080fd5b50565b6000815190506100d5816100af565b92915050565b6000602082840312156100f1576100f0610078565b5b60006100ff848285016100c6565b91505092915050565b60f7806101166000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80633cb747bf14602d575b600080fd5b60336047565b604051603e919060a8565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000609482606b565b9050919050565b60a281608b565b82525050565b600060208201905060bb6000830184609b565b9291505056fea264697066735822122095f522f9090729768cfe0caa7c4c58c6067b74e534ed43eefa77a7ff78e2c04a64736f6c634300080b0033";

type CrossDomainEnabledConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CrossDomainEnabledConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CrossDomainEnabled__factory extends ContractFactory {
  constructor(...args: CrossDomainEnabledConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _messenger: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CrossDomainEnabled> {
    return super.deploy(
      _messenger,
      overrides || {}
    ) as Promise<CrossDomainEnabled>;
  }
  override getDeployTransaction(
    _messenger: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_messenger, overrides || {});
  }
  override attach(address: string): CrossDomainEnabled {
    return super.attach(address) as CrossDomainEnabled;
  }
  override connect(signer: Signer): CrossDomainEnabled__factory {
    return super.connect(signer) as CrossDomainEnabled__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CrossDomainEnabledInterface {
    return new utils.Interface(_abi) as CrossDomainEnabledInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CrossDomainEnabled {
    return new Contract(address, _abi, signerOrProvider) as CrossDomainEnabled;
  }
}
