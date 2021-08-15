const ApiClient = require(`${modulesPath}/domain/case-study/api-client`);
const faker = require('faker');

const {
  recordProvider
} = require(`${modulesPath}/domain/case-study/providers`);
const {
  recordValidator
} = require(`${modulesPath}/domain/case-study/validators`);
const {
  outboundSessionTransformer
} = require(`${modulesPath}/domain/case-study/transformers`);

const client = new ApiClient();

jest.mock(`${modulesPath}/domain/case-study/providers`, () => {
  return {
    recordProvider: {
      getRecords: () => {}
    }
  };
});

jest.mock(`${modulesPath}/domain/case-study/validators`, () => {
  return {
    recordValidator: {
      validatePayload: () => {}
    }
  };
});

jest.mock(`${modulesPath}/domain/case-study/transformers`, () => {
  return {
    outboundSessionTransformer: {
      transform: () => {}
    }
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Api client', () => {
  test('should call getRecords of provider once', async () => {
    const body = {
      startDate: faker.datatype.string(),
      endDate: faker.datatype.string(),
      minCount: faker.datatype.number(),
      maxCount: faker.datatype.number()
    };
    const validatePayloadSpy = jest.spyOn(recordValidator, 'validatePayload');
    const getRecordsSpy = jest.spyOn(recordProvider, 'getRecords');
    const transformSpy = jest.spyOn(outboundSessionTransformer, 'transform');
    await client.getRecords(body);
    expect(validatePayloadSpy).toHaveBeenCalledTimes(1);
    expect(getRecordsSpy).toHaveBeenCalledTimes(1);
    expect(transformSpy).toHaveBeenCalledTimes(1);
  });
});
