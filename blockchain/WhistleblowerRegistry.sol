// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WhistleblowerRegistry {

    struct Report {
        string evidenceHash;
        uint256 timestamp;
    }

    Report[] private reports;

    event ReportSubmitted(uint256 reportId, string hash, uint256 time);

    function submitReport(string memory _hash) public {
        reports.push(Report(_hash, block.timestamp));
        emit ReportSubmitted(reports.length - 1, _hash, block.timestamp);
    }

    function getReport(uint256 index) public view returns (string memory, uint256) {
        require(index < reports.length, "Invalid report ID");
        Report memory r = reports[index];
        return (r.evidenceHash, r.timestamp);
    }

    function totalReports() public view returns (uint256) {
        return reports.length;
    }
}
