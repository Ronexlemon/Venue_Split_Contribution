const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("Party Contract", function(){
    let amountTocontribute;
    let PartyContractDeploy;
    let addr1, addr2, addr3, addr4;

    it("deployment should assign the amount eact member should contribute", async function(){
        [addr1, addr2, addr3, addr4, _] = await ethers.getSigners();
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
        
       });
       it("should check for amount value of the venue", async function(){
        const venueAcount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
        const partyAmount = ethers.utils.parseEther("0.5");
        await PartyContractDeploy.payBill(venueAcount,partyAmount);
        console.log(venueAcount);
        const partyamount = await PartyContractDeploy.returnVenueAmount();
        expect(partyamount.toString()).equal(partyAmount.toString())

       })
       
    
})