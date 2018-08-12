import { Selector } from 'testcafe';

const resolutionWidth = 1440;
const resolutionHeight = 800;
const open = async (testcafe) => {
  await testcafe.resizeWindow(
    parseInt(resolutionWidth, 10),
    parseInt(resolutionHeight, 10),
  );
};

fixture('Test')
  .page('http://localhost:3000/index.html')
  .beforeEach(async (testcafe) => {
    await open(testcafe);
  });

test('My first test', async (testcafe) => {
  await testcafe
    .expect(Selector('[class*="app-header"]').innerText).contains('ScatterPlot Chart');
});
