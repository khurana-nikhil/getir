const {
  recordProvider
} = require(`${modulesPath}/domain/case-study/providers`);
const faker = require('faker');

const {
  recordStorageFactory
} = require(`${modulesPath}/domain/case-study/storage`);

jest.mock(`${modulesPath}/domain/case-study/storage`, () => {
  return {
    recordStorageFactory: {
      repository: {
        getRecords: () => jest.fn()
      }
    }
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Record Provider', () => {
  test('should call getRecords of storage factory once', async () => {
    const body = {
      startDate: faker.datatype.string(),
      endDate: faker.datatype.string(),
      minCount: faker.datatype.number(),
      maxCount: faker.datatype.number()
    };
    const recordStorageRepositorySpy = jest.spyOn(
      recordStorageFactory.repository,
      'getRecords'
    );
    await recordProvider.getRecords(body);
    expect(recordStorageRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
