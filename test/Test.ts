import assert from "assert";
import { 
  TestHelpers,
  Contribution,
  ContributionEvent
} from "generated";
const { MockDb, PiePay } = TestHelpers;

describe("PiePay contract ContributionApproved event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for PiePay contract ContributionApproved event
  const event = PiePay.ContributionApproved.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("ContributionEvent is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await PiePay.ContributionApproved.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualContributionEvent = mockDbUpdated.entities.ContributionEvent.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Verify that a ContributionEvent was created
    assert(actualContributionEvent, "ContributionEvent should be created");
    assert.equal(actualContributionEvent.eventType, "approved", "Event type should be 'approved'");
    assert.equal(actualContributionEvent.executor, event.params.executor, "Executor should match");
  });
});
