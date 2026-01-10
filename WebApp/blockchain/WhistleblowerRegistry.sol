// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WhistleblowerRegistry {

    struct Submission {
        string contentHash;
        uint256 submissionTime;
    }

    Submission[] private submissions;

    event SubmissionRecorded(uint256 submissionIndex, string hashValue, uint256 recordedTime);

    function recordSubmission(string memory _hash) public {
        submissions.push(Submission(_hash, block.timestamp));
        emit SubmissionRecorded(submissions.length - 1, _hash, block.timestamp);
    }

    function retrieveSubmission(uint256 index) public view returns (string memory, uint256) {
        require(index < submissions.length, "Submission index out of range");
        Submission memory s = submissions[index];
        return (s.contentHash, s.submissionTime);
    }

    function getTotalSubmissions() public view returns (uint256) {
        return submissions.length;
    }
}
