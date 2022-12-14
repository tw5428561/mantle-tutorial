/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface FromL2_ControlL1GreeterInterface extends utils.Interface {
  functions: {
    "crossDomainMessengerAddr()": FunctionFragment;
    "greeterL1Addr()": FunctionFragment;
    "setGreeting(string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "crossDomainMessengerAddr"
      | "greeterL1Addr"
      | "setGreeting"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "crossDomainMessengerAddr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "greeterL1Addr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setGreeting",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "crossDomainMessengerAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "greeterL1Addr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGreeting",
    data: BytesLike
  ): Result;

  events: {};
}

export interface FromL2_ControlL1Greeter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FromL2_ControlL1GreeterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    crossDomainMessengerAddr(overrides?: CallOverrides): Promise<[string]>;

    greeterL1Addr(overrides?: CallOverrides): Promise<[string]>;

    setGreeting(
      _greeting: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  crossDomainMessengerAddr(overrides?: CallOverrides): Promise<string>;

  greeterL1Addr(overrides?: CallOverrides): Promise<string>;

  setGreeting(
    _greeting: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    crossDomainMessengerAddr(overrides?: CallOverrides): Promise<string>;

    greeterL1Addr(overrides?: CallOverrides): Promise<string>;

    setGreeting(
      _greeting: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    crossDomainMessengerAddr(overrides?: CallOverrides): Promise<BigNumber>;

    greeterL1Addr(overrides?: CallOverrides): Promise<BigNumber>;

    setGreeting(
      _greeting: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    crossDomainMessengerAddr(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    greeterL1Addr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setGreeting(
      _greeting: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
