const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Party Contract",function(){
    it("deployment should assign the amount eact member should contribute", async function(){
        const amountTocontribute = ethers.utils.parseEther("1");
        const PartyContract = await ethers.getContractFactory("Party");
        const PartyContractDeploy = await PartyContract.deploy(amountTocontribute);
        await PartyContractDeploy.deployed();
        const amountForEachMember = await PartyContractDeploy. returnAmountToPay();
        expect(amountTocontribute.toString()).to.equal(amountForEachMember.toString());
    });
    
})