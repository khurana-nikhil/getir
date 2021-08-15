const {
  outboundSessionTransformer
} = require(`${modulesPath}/domain/case-study/transformers`);
const recordStub = require(`${testModule}/stubs/record`);

const mockSession = recordStub.aggregateRecord;

describe('Outbound transformer', () => {
  it('transform response payload', async () => {
    const response = outboundSessionTransformer.transform(mockSession);
    expect(response.code).toEqual(0);
    expect(response.msg).toEqual('Success');
    expect(Array.isArray(response.records)).toBeTruthy();
  });
});
