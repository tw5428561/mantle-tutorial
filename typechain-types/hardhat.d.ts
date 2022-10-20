/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "CrossDomainEnabled",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CrossDomainEnabled__factory>;
    getContractFactory(
      name: "ICrossDomainMessenger",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICrossDomainMessenger__factory>;
    getContractFactory(
      name: "IL2StandardERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL2StandardERC20__factory>;
    getContractFactory(
      name: "L2StandardERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L2StandardERC20__factory>;
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "ReentrancyGuardUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "ERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155__factory>;
    getContractFactory(
      name: "IERC1155MetadataURI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155MetadataURI__factory>;
    getContractFactory(
      name: "IERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155__factory>;
    getContractFactory(
      name: "IERC1155Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Receiver__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Burnable__factory>;
    getContractFactory(
      name: "ERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IERC20Test",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Test__factory>;
    getContractFactory(
      name: "ITssRewardContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ITssRewardContract__factory>;
    getContractFactory(
      name: "L1CustomERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L1CustomERC20__factory>;
    getContractFactory(
      name: "FromL1_ControlL2Greeter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FromL1_ControlL2Greeter__factory>;
    getContractFactory(
      name: "FromL2_ControlL1Greeter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FromL2_ControlL1Greeter__factory>;
    getContractFactory(
      name: "Greeter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Greeter__factory>;
    getContractFactory(
      name: "L2CustomERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L2CustomERC20__factory>;
    getContractFactory(
      name: "ExampleToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ExampleToken__factory>;
    getContractFactory(
      name: "IOVM_L1ERC721Gateway",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOVM_L1ERC721Gateway__factory>;
    getContractFactory(
      name: "IOVM_L2DepositedERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOVM_L2DepositedERC721__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721URIStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorage__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "Abs_L1ERC721Gateway",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Abs_L1ERC721Gateway__factory>;
    getContractFactory(
      name: "Abs_L2DepositedERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Abs_L2DepositedERC721__factory>;
    getContractFactory(
      name: "OVM_L1ERC721Gateway",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OVM_L1ERC721Gateway__factory>;
    getContractFactory(
      name: "OVM_L2DepositedERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OVM_L2DepositedERC721__factory>;
    getContractFactory(
      name: "ICrossDomainMessenger",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICrossDomainMessenger__factory>;
    getContractFactory(
      name: "SimpleStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleStorage__factory>;
    getContractFactory(
      name: "TestERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC1155__factory>;
    getContractFactory(
      name: "TestERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC721__factory>;
    getContractFactory(
      name: "ITssGroupManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ITssGroupManager__factory>;
    getContractFactory(
      name: "IStakingSlashing",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakingSlashing__factory>;
    getContractFactory(
      name: "TssGroupManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TssGroupManager__factory>;
    getContractFactory(
      name: "TssStakingSlashing",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TssStakingSlashing__factory>;
    getContractFactory(
      name: "TssRewardContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TssRewardContract__factory>;

    getContractAt(
      name: "CrossDomainEnabled",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CrossDomainEnabled>;
    getContractAt(
      name: "ICrossDomainMessenger",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICrossDomainMessenger>;
    getContractAt(
      name: "IL2StandardERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL2StandardERC20>;
    getContractAt(
      name: "L2StandardERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L2StandardERC20>;
    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "ReentrancyGuardUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "ERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155>;
    getContractAt(
      name: "IERC1155MetadataURI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155MetadataURI>;
    getContractAt(
      name: "IERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155>;
    getContractAt(
      name: "IERC1155Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Receiver>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Burnable>;
    getContractAt(
      name: "ERC721Enumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Enumerable>;
    getContractAt(
      name: "IERC721Enumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Enumerable>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IERC20Test",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Test>;
    getContractAt(
      name: "ITssRewardContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ITssRewardContract>;
    getContractAt(
      name: "L1CustomERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L1CustomERC20>;
    getContractAt(
      name: "FromL1_ControlL2Greeter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FromL1_ControlL2Greeter>;
    getContractAt(
      name: "FromL2_ControlL1Greeter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FromL2_ControlL1Greeter>;
    getContractAt(
      name: "Greeter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Greeter>;
    getContractAt(
      name: "L2CustomERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L2CustomERC20>;
    getContractAt(
      name: "ExampleToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ExampleToken>;
    getContractAt(
      name: "IOVM_L1ERC721Gateway",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOVM_L1ERC721Gateway>;
    getContractAt(
      name: "IOVM_L2DepositedERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOVM_L2DepositedERC721>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721URIStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721URIStorage>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "Abs_L1ERC721Gateway",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Abs_L1ERC721Gateway>;
    getContractAt(
      name: "Abs_L2DepositedERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Abs_L2DepositedERC721>;
    getContractAt(
      name: "OVM_L1ERC721Gateway",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OVM_L1ERC721Gateway>;
    getContractAt(
      name: "OVM_L2DepositedERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OVM_L2DepositedERC721>;
    getContractAt(
      name: "ICrossDomainMessenger",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICrossDomainMessenger>;
    getContractAt(
      name: "SimpleStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleStorage>;
    getContractAt(
      name: "TestERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC1155>;
    getContractAt(
      name: "TestERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC721>;
    getContractAt(
      name: "ITssGroupManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ITssGroupManager>;
    getContractAt(
      name: "IStakingSlashing",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStakingSlashing>;
    getContractAt(
      name: "TssGroupManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TssGroupManager>;
    getContractAt(
      name: "TssStakingSlashing",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TssStakingSlashing>;
    getContractAt(
      name: "TssRewardContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TssRewardContract>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
