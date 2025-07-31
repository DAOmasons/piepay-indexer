import assert from "assert";
import { 
  TestHelpers,
  PiePay_ContributionApproved
} from "generated";
const { MockDb, PiePay } = TestHelpers;

describe("PiePay contract ContributionApproved event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for PiePay contract ContributionApproved event
  const event = PiePay.ContributionApproved.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("PiePay_ContributionApproved is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await PiePay.ContributionApproved.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualPiePayContributionApproved = mockDbUpdated.entities.PiePay_ContributionApproved.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedPiePayContributionApproved: PiePay_ContributionApproved = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      executor: event.params.executor,
      contributionId: event.params.contributionId,
      contributor: event.params.contributor,
      unitType: event.params.unitType,
      unitsAwarded: event.params.unitsAwarded,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualPiePayContributionApproved, expectedPiePayContributionApproved, "Actual PiePayContributionApproved should be the same as the expectedPiePayContributionApproved");
  });
});
