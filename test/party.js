const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Party Contract", function(){
    let amountTocontribute;
    let PartyContractDeploy;
    it("deployment should assign the amount eact member should contribute", async function(){
        const {owner, other} = ethers.getSigner();
         amountTocontribute = ethers.utils.parseEther("1");
        const PartyContract = await ethers.getContractFactory("Party");
        PartyContractDeploy = await PartyContract.deploy(amountTocontribute);
        await PartyContractDeploy.deployed();
        
        const amountForEachMember = await PartyContractDeploy. returnAmountToPay();
        expect(amountTocontribute.toString()).to.equal(amountForEachMember.toString());
        
        
    });
     it("should check if a member could be able rsvp",async function(){
        
         await PartyContractDeploy.rsvp({value:amountTocontribute});
         const status = await PartyContractDeploy.returnStatus();
       
        expect(status).to.equal(true);
        
       })
       
    
})