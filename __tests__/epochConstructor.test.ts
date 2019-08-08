import epochConstructor from '../StockChecker/epochConstructor'
import moment from 'moment'

test('if Sat 6th July 2019 is input, epoch returned will be previous Friday at noon', () => {
  let today = moment("06-07-2019", 'DD-MM-YYYY')
  expect(epochConstructor(today, 1)).toBe(1562324400000);
});

test('if Sun 7th July 2019 is input, epoch returned will be previous Friday at noon', () => {
  let today = moment("07-07-2019", 'DD-MM-YYYY')
  expect(epochConstructor(today, 1)).toBe(1562324400000);
});

test('if Mon 8th July 2019 is input, epoch returned will be previous Friday at noon', () => {
  let today = moment("08-07-2019", 'DD-MM-YYYY')
  expect(epochConstructor(today, 1)).toBe(1562324400000);
});

test('if Tue 9th July 2019 is input, epoch returned will be the Monday before at noon', () => {
  let today = moment("06-07-2019", 'DD-MM-YYYY')
  expect(epochConstructor(today, 1)).toBe(1562324400000);
});