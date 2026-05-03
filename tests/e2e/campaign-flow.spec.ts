import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "yaml";

const campaignPath = resolve(
  process.cwd(),
  "src/content/scenarios/solvex-a-campaign.yaml",
);
const campaignData = parse(readFileSync(campaignPath, "utf-8"));
const missions: Record<string, any>[] = campaignData.missions;

test.describe("Full campaign browser playthrough", () => {
  test("selects all correct decisions, submits, passes, and advances through Missions 1–8", async ({
    page,
  }) => {
    await page.goto("/");

    // Play through Missions 1–7 (each has a next mission)
    for (let i = 0; i < 7; i++) {
      const mission = missions[i];
      const missionNumber = mission.mission_number as number;
      const correctIds: string[] = mission.correct_decision_ids;

      // 1. Verify we are on the correct mission
      await expect(page.locator('[data-testid="current-mission"]')).toHaveText(
        `Mission ${missionNumber}`,
      );

      // 2. Click all correct decision cards
      for (const id of correctIds) {
        const card = page.locator(`[data-testid="decision-card-${id}"]`);
        await expect(card).toBeVisible();
        await card.click();
      }

      // 3. Submit the design review
      await page.locator('[data-testid="submit-review"]').click();

      // 4. Verify design review screen is shown
      await expect(
        page.locator('[data-testid="design-review-screen"]'),
      ).toBeVisible();

      // 5. Verify perfect score
      await expect(page.locator('[data-testid="score-percent"]')).toHaveText(
        "100%",
      );

      // 6. Advance to the next mission
      await page.locator('[data-testid="continue-next"]').click();
      await expect(
        page.locator('[data-testid="mission-dashboard"]'),
      ).toBeVisible();
    }

    // 7. Play Mission 8 (the final mission)
    const mission8 = missions[7];
    await expect(page.locator('[data-testid="current-mission"]')).toHaveText(
      `Mission ${mission8.mission_number}`,
    );

    const correctIds8: string[] = mission8.correct_decision_ids;
    for (const id of correctIds8) {
      const card = page.locator(`[data-testid="decision-card-${id}"]`);
      await expect(card).toBeVisible();
      await card.click();
    }

    await page.locator('[data-testid="submit-review"]').click();

    // 8. Verify final-mission design review shows 100% and campaign-complete state
    await expect(
      page.locator('[data-testid="design-review-screen"]'),
    ).toBeVisible();
    await expect(page.locator('[data-testid="score-percent"]')).toHaveText(
      "100%",
    );

    // Final mission: no "continue-next" button; instead "Campaign Complete" is shown
    await expect(
      page.locator('[data-testid="continue-next"]'),
    ).not.toBeVisible();
    await expect(page.locator("text=Campaign Complete")).toBeVisible();
  });
});
