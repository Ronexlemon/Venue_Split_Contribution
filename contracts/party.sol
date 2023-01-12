// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Party {
    uint rsvpAmount;
    address[] groupMembers;
    //maping to store the address of the already rsvp members
    mapping(address => bool) public hasRsvp;

    constructor(uint _rsvpAmount) {
        rsvpAmount = _rsvpAmount;
    }

    //function to rsvp
    function rsvp() external payable {
        require(msg.value == rsvpAmount, "less account balance");
        require(!hasRsvp[msg.sender], "already rsvp to join the party");
        (bool success, ) = address(this).call{value: msg.value}("");
        require(success);
        hasRsvp[msg.sender] = true;
    }
    //paybill for the party
    function payBill(address venue,uint Amount) external payable{
        (bool sent,) = venue.call{value: Amount}("");
        require(sent);
        uint amountToReturn = address(this).balance /groupMembers.length;
        for(uint i; i< groupMembers.length; i++){
            (bool returnAmount,) = groupMembers[i].call{value:amountToReturn}("");
            require(returnAmount);
        }

    }
}
