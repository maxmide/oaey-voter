const { chromium } = require("playwright");  // Import Playwright

(async () => {
  // Launch the Chromium browser
  const browser = await chromium.launch({ headless: true }); // Set headless: false if you want to see the browser
  const context = await browser.newContext();
  const page = await context.newPage();  // Open a new page

  // Outer loop: 1000 times
  for (let i = 0; i < 1000; i++) {
    console.log(`Outer loop iteration: ${i + 1}`);

    // Inner loop: 4 times
    for (let j = 0; j < 5; j++) {
      await page.goto("https://www.thaiupdate.info/female-star-of-the-year-group-1/");
      console.log(`  Inner loop iteration: ${j + 1}`);

      // Interact with the page
      await page.locator("id=PDI_answer65586722").check();
      await page.locator("id=pd-vote-button14773738").click();
      await page.waitForSelector("id=PDI_form14773738", { timeout: 9000 });

      // Extract and calculate the answer
      const expression = await page.locator("id=captcha_14773738").textContent();
      const numbers = expression.match(/\d+/g);
      const num1 = parseInt(numbers[0], 10);
      const num2 = parseInt(numbers[1], 10);
      const answer = num1 + num2;

      // Fill in the answer and click the vote button
      await page.locator("id=answer_14773738").fill(answer.toString());
      await page.locator("id=pd-vote-button14773738").click();

      // Pause for 10 seconds between inner loop iterations
      await page.waitForTimeout(100);
    }

    // Pause for 1 minute and 30 seconds between outer loop iterations
    console.log(`Pausing for 1 minute...`);
    await page.waitForTimeout(60000);
  }

  // Close the browser when done
  await browser.close();
})();
