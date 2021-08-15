const {
  RecordRepository
} = require(`${modulesPath}/domain/case-study/storage/record-repository`);
const recordModel = require(`${modelsPath}/record`);
const faker = require('faker');

const recordStub = require(`${testModule}/stubs/record`);

const recordRepository = new RecordRepository();
const mockSession = recordStub.aggregateRecord;

jest.mock(`${modelsPath}/record`, () => {
  return {
    aggregate: () => [mockSession]
  };
});

describe('Records Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getRecords', async () => {
    const aggregateSpy = jest.spyOn(recordModel, 'aggregate');
    const body = {
      startDate: faker.datatype.string(),
      endDate: faker.datatype.string(),
      minCount: faker.datatype.number(),
      maxCount: faker.datatype.number()
    };
    const response = await recordRepository.getRecords(body);
    expect(aggregateSpy).toHaveBeenCalledTimes(1);
    expect(response).toEqual([mockSession]);
  });
});
