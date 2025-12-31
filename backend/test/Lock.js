import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers.js";
import chai from "chai";

const { expect } = chai;

describe("Whistleblower", function () {
  // Fixture to deploy the Whistleblower contract
  async function deployWhistleblowerFixture() {
    const [submitter, otherAccount] = await ethers.getSigners();

    const Whistleblower = await ethers.getContractFactory("Whistleblower");
    const whistleblower = await Whistleblower.deploy();

    return { whistleblower, submitter, otherAccount };
  }

  describe("Report Submission", function () {
    it("Should allow submitting a report and emit event", async function () {
      const { whistleblower, submitter } = await loadFixture(deployWhistleblowerFixture);

      const testHash = "QmTestHash123";

      await expect(whistleblower.submitReport(testHash))
        .to.emit(whistleblower, "ReportSubmitted")
        .withArgs(0, testHash, await ethers.provider.getBlock("latest").then(b => b.timestamp));
    });

    it("Should increment report count after submission", async function () {
      const { whistleblower } = await loadFixture(deployWhistleblowerFixture);

      const initialCount = await whistleblower.getReportsCount();
      expect(initialCount).to.equal(0);

      await whistleblower.submitReport("QmAnotherHash456");

      const updatedCount = await whistleblower.getReportsCount();
      expect(updatedCount).to.equal(1);
    });

    it("Should store report details correctly", async function () {
      const { whistleblower } = await loadFixture(deployWhistleblowerFixture);

      const testHash = "QmStoredHash789";
      await whistleblower.submitReport(testHash);

      const report = await whistleblower.getReport(0);
      expect(report[0]).to.equal(testHash); // ipfsHash
      expect(report[1]).to.be.a('bigint'); // timestamp
    });

    it("Should revert when accessing invalid report index", async function () {
      const { whistleblower } = await loadFixture(deployWhistleblowerFixture);

      await expect(whistleblower.getReport(99)).to.be.revertedWith("Invalid report ID");
    });
  });

  describe("Report Retrieval", function () {
    it("Should return correct report data", async function () {
      const { whistleblower } = await loadFixture(deployWhistleblowerFixture);

      const hash1 = "QmFirstReport";
      const hash2 = "QmSecondReport";

      await whistleblower.submitReport(hash1);
      await whistleblower.submitReport(hash2);

      const report1 = await whistleblower.getReport(0);
      const report2 = await whistleblower.getReport(1);

      expect(report1[0]).to.equal(hash1);
      expect(report2[0]).to.equal(hash2);
    });

    it("Should maintain accurate total count", async function () {
      const { whistleblower } = await loadFixture(deployWhistleblowerFixture);

      await whistleblower.submitReport("QmHash1");
      await whistleblower.submitReport("QmHash2");
      await whistleblower.submitReport("QmHash3");

      const total = await whistleblower.getReportsCount();
      expect(total).to.equal(3);
    });
  });
});
