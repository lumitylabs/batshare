// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuadraticFunding {
    struct Project {
        address creator;
        uint256 totalAmount;
        uint256 quadraticAmount;
        uint256 lastWithdrawDay;
        mapping(uint256 => uint256) dayTotalAmount;
        mapping(uint256 => uint256) dayQuadraticAmount;
    }

    mapping(string => Project) public projects;
    mapping(uint256 => uint256) public dayTotalAmount;
    mapping(uint256 => uint256) public dayQuadraticAmount;

    uint256 private timeOffset = 0;
    uint256 lastWithdrawDay;

    // TEST ONLY!
    function addDays(uint256 time) public {
        timeOffset += time * DAY_IN_SECONDS;
    }

    uint256 public startTimestamp;
    uint256 public constant DAY_IN_SECONDS = 86400;

    event DonationReceived(
        address indexed donor,
        string projectId,
        uint256 amount,
        uint256 day
    );
    event ProjectRegistered(string projectId, address indexed creator);
    event Withdrawn(string projectId, uint256 amount);

    constructor() {
        startTimestamp = block.timestamp;
    }

    function getCurrentDay() public view returns (uint256) {
        return (block.timestamp + timeOffset - startTimestamp) / DAY_IN_SECONDS;
    }

    function registerProject(string memory projectId) public {
        require(
            projects[projectId].creator == address(0),
            "Project already exists"
        );

        projects[projectId].creator = msg.sender;
        projects[projectId].lastWithdrawDay = type(uint256).max;

        emit ProjectRegistered(projectId, msg.sender);
    }

    function donate(string memory projectId) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        require(
            projects[projectId].creator != address(0),
            "Project doesn't exist"
        );

        uint256 currentDay = getCurrentDay();
        Project storage project = projects[projectId];

        uint256 previousQuadraticValue = babylonianSqrt(
            project.dayTotalAmount[currentDay]
        );
        uint256 newDonationAmount = project.dayTotalAmount[currentDay] +
            msg.value;
        uint256 newQuadraticValue = babylonianSqrt(newDonationAmount);

        uint256 quadraticDifference = newQuadraticValue -
            previousQuadraticValue;

        project.totalAmount += msg.value;
        project.quadraticAmount += quadraticDifference;
        project.dayTotalAmount[currentDay] += msg.value;
        project.dayQuadraticAmount[currentDay] += quadraticDifference;

        dayTotalAmount[currentDay] += msg.value;
        dayQuadraticAmount[currentDay] += quadraticDifference;

        emit DonationReceived(msg.sender, projectId, msg.value, currentDay);
    }

    function withdraw(string memory projectId) public {
        require(
            msg.sender == projects[projectId].creator,
            "Only the project creator can withdraw"
        );
        uint256 startDay = projects[projectId].lastWithdrawDay ==
            type(uint256).max
            ? 0
            : projects[projectId].lastWithdrawDay + 1;
        uint256 currentDay = getCurrentDay();
        uint256 amountToWithdraw = 0;

        for (uint256 i = startDay; i < currentDay; i++) {
            amountToWithdraw += projects[projectId].dayTotalAmount[i];
            projects[projectId].dayTotalAmount[i] = 0;
        }

        require(amountToWithdraw > 0, "No funds to withdraw");

        projects[projectId].lastWithdrawDay = currentDay - 1;

        payable(msg.sender).transfer(amountToWithdraw);

        emit Withdrawn(projectId, amountToWithdraw);
    }

    function babylonianSqrt(uint256 x) public pure returns (uint256 z) {
        if (x == 0) return 0;
        z = x;
        uint256 y = (z + x / z) / 2;
        while (y < z) {
            z = y;
            y = (z + x / z) / 2;
        }
    }
}
