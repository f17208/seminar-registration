import puppeteer from 'puppeteer';

const completeChecksSelector = '.CompleteCheck-container--visible';
const disabledStepsSelector = '.Step-container--disabled';
const optionsSelector = ".PeopleAttending-list tr.people-row--enabled";

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('is served on the right port', async () => {
    await page.goto(`http://localhost:${process.env.PORT}`);
    const peopleAttendingLabelId = '#people-attending-label';
    await page.waitForSelector(peopleAttendingLabelId);
    const text = await page.$eval(peopleAttendingLabelId, (e) => e.textContent);
    expect(text).toContain('How many people will be attending?');
  });

  it('changes the number of attendees', async () => {
    await page.goto(`http://localhost:${process.env.PORT}`);

    let options = await page.$$(optionsSelector);
    expect(options.length).toBe(0);

    for (let i = 0; i < 6; i++) {
      // change select value
      await page.select('#numberOfPeopleSelect', i.toString());

      options = await page.$$(optionsSelector);
      expect(options.length).toBe(i);
    }
  })

  it('enables step 2 once step 1 is completed', async () => {
    await page.goto(`http://localhost:${process.env.PORT}`);

    let completedSteps, disabledSteps;
    
    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);

    // change select value
    await page.select('#numberOfPeopleSelect', '2');
    await page.waitForSelector('#people-attending-input-0');

    await page.focus('#people-attending-input-0');
    await page.keyboard.type('Albert Einstein');

    // 1 name is not enough
    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);

    await page.focus('#people-attending-input-1');
    await page.keyboard.type('Galileo Galilei');

    // first step should be completed and second unlocked
    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(1);
    expect(disabledSteps.length).toBe(1);
  })

  it('disables step 2 if a name is cleared in step 1', async () => {
    await page.goto(`http://localhost:${process.env.PORT}`);

    let completedSteps, disabledSteps;

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);

    // change select value
    await page.select('#numberOfPeopleSelect', '1');
    await page.waitForSelector('#people-attending-input-0');

    const name = 'Pippo';
    await page.focus('#people-attending-input-0');
    await page.keyboard.type(name);

    // first step should be completed and second unlocked
    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(1);
    expect(disabledSteps.length).toBe(1);

    await page.focus('#people-attending-input-0');
    for (let i = 0; i < name.length; i++) {
      await page.keyboard.press('Backspace');
    }

    // first step should be not completed and second disabled
    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);
  })

  it('step 2 shows company name input if and only if it is required', async () => {
    await page.goto(`http://localhost:${process.env.PORT}`);

    let completedSteps, disabledSteps;

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);

    // COMPLETE FIRST STEP
    await page.select('#numberOfPeopleSelect', '1');
    await page.waitForSelector('#people-attending-input-0');

    await page.focus('#people-attending-input-0');
    await page.keyboard.type('Pluto');

    const companyNameInputSelector = '.RegistrationOptions-company-name';
    let companyNameInput = await page.$$(companyNameInputSelector);

    expect(companyNameInput.length).toBe(0);

    // SECOND STEP
    await page.click('#company-name-required-yes');

    companyNameInput = await page.$$(companyNameInputSelector);
    expect(companyNameInput.length).toBe(1);

    // set company name required to no
    await page.click('#company-name-required-no');

    companyNameInput = await page.$$(companyNameInputSelector);
    expect(companyNameInput.length).toBe(0);
  })

  it('enables step 3 after completing step 2', async () => {
    await page.goto(`http://localhost:${process.env.PORT}`);

    let completedSteps, disabledSteps;

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);

    // COMPLETE STEP 1
    await page.select('#numberOfPeopleSelect', '1');
    await page.waitForSelector('#people-attending-input-0');

    await page.focus('#people-attending-input-0');
    await page.keyboard.type('Paperino');

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(1);
    expect(disabledSteps.length).toBe(1);

    // COMPLETE STEP 2
    await page.click('#company-name-required-no');
    await page.click('#special-accomodation-required-yes');

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(2);
    expect(disabledSteps.length).toBe(0);
  })

  it('disables step 3 if a name is added in step 1', async () => {
    await page.goto(`http://localhost:${process.env.PORT}`);

    let completedSteps, disabledSteps;

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);

    // COMPLETE STEP 1
    await page.select('#numberOfPeopleSelect', '1');
    await page.waitForSelector('#people-attending-input-0');

    await page.focus('#people-attending-input-0');
    await page.keyboard.type('Pietro Gambadilegno');

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(1);
    expect(disabledSteps.length).toBe(1);

    // COMPLETE STEP 2
    await page.click('#company-name-required-no');
    await page.click('#special-accomodation-required-yes');

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(2);
    expect(disabledSteps.length).toBe(0);

    // adds empty name in step 1
    await page.select('#numberOfPeopleSelect', '2');

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    // step 2 is completed even if it's disabled, because its data was filled correctly
    expect(completedSteps.length).toBe(1); 
    expect(disabledSteps.length).toBe(2);

    // complete step 1
    await page.focus('#people-attending-input-1');
    await page.keyboard.type('Pietro Gambadilegno');

    // now step 2 and 3 should be enabled again
    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(2);
    expect(disabledSteps.length).toBe(0);
  })


  it('resets the state and brings back to step 1 after completing step 3', async () => {
    await page.goto(`http://localhost:${process.env.PORT}`);

    let completedSteps, disabledSteps;

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);

    // COMPLETE STEP 1
    await page.select('#numberOfPeopleSelect', '1');
    await page.waitForSelector('#people-attending-input-0');

    await page.focus('#people-attending-input-0');
    await page.keyboard.type('Paperino');

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(1);
    expect(disabledSteps.length).toBe(1);

    // COMPLETE STEP 2
    await page.click('#company-name-required-no');
    await page.click('#special-accomodation-required-yes');

    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(2);
    expect(disabledSteps.length).toBe(0);

    // COMPLETE STEP 3

    // submit button must be disabled
    await page.waitForSelector("#complete-registration-submit[disabled]");
    
    await page.click('#complete-registration-confirm');

    // submit button must be enabled
    let submitButton = await page.waitForSelector("#complete-registration-submit:not([disabled])");
    await submitButton.click();

    // after submit, the state is reset so the number of attendees must be zero
    const options = await page.$$(optionsSelector);
    expect(options.length).toBe(0);

    // also the 2nd and 3rd steps must be disabled, and none must be completed
    completedSteps = await page.$$(completeChecksSelector);
    disabledSteps = await page.$$(disabledStepsSelector);
    expect(completedSteps.length).toBe(0);
    expect(disabledSteps.length).toBe(2);
  })

  afterAll(() => browser.close());
});