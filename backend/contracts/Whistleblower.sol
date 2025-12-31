// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Whistleblower {
    struct Report {
        string ipfsHash;
        uint256 timestamp;
    }

    Report[] public reports;

    event ReportSubmitted(string ipfsHash, uint256 timestamp);

    function submitReport(string memory _ipfsHash) public {
        reports.push(Report(_ipfsHash, block.timestamp));
        emit ReportSubmitted(_ipfsHash, block.timestamp);
    }

    function getReportsCount() public view returns (uint256) {
        return reports.length;
    }
}
