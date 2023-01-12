// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Party {
    uint rsvpAmount;
    uint venueAmount;
    address[] groupMembers;
    bool public status;
    //maping to store the address of the already rsvp members
    mapping(address => bool) public hasRsvp;

    constructor(uint _rsvpAmount) {
        rsvpAmount = _rsvpAmount;
    }

    //function to rsvp
    function rsvp() external payable {
        require(msg.value >= rsvpAmount, "less account balance");
        require(!hasRsvp[msg.sender], "already rsvp to join the party");
        // (bool success, ) = address(this).call{value: rsvpAmount}("");
        // require(success, "failed");
        payable(address(this)).transfer(msg.value);
        hasRsvp[msg.sender] = true;
        status = true;
    }

    //paybill for the party
    function payBill(address venue, uint Amount) external payable {
        venueAmount = Amount;
        (bool sent, ) = venue.call{value: Amount}("");
        require(sent, "no transaction sent");
        uint amountToReturn = address(this).balance / groupMembers.length;
        for (uint i; i < groupMembers.length; i++) {
            (bool returnAmount, ) = groupMembers[i].call{value: amountToReturn}(
                ""
            );
            require(returnAmount, "no transaction sent");
        }
    }

    function returnAmountToPay() public view returns (uint) {
        return rsvpAmount;
    }

    function returnVenueAmount() public view returns (uint) {
        return venueAmount;
    }

    function returnStatus() public view returns (bool) {
        return status;
    }

    receive() external payable {}

    fallback() external payable {}
}
