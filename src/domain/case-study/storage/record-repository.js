'use strict';

const recordModel = require(`${modelsPath}/record`);

const defaultModel = () => {
  return recordModel;
};

class RecordRepository {
  constructor(record = defaultModel()) {
    this.record = record;
  }

  async getRecords(body) {
    try {
      const pipelineArray = this.preParePipeLine(body);
      const records = await this.record.aggregate(pipelineArray);
      return records;
    } catch (err) {
      // logger.error(`err in getting records : ${err}`);
      throw err;
    }
  }

  preParePipeLine(body) {
    const pipelineArray = [];
    const { startDate, endDate, minCount, maxCount } = body;
    const filterByDate = {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
      }
    };

    const unwindByCount = { $unwind: { path: '$counts' } };

    const groupByKey = {
      $group: {
        _id: '$key',
        createdAt: { $first: '$createdAt' },
        totalCount: { $sum: '$counts' }
      }
    };

    const matchByCount = {
      $match: {
        totalCount: { $gte: minCount, $lte: maxCount }
      }
    };

    const finalProject = {
      $project: {
        _id: 0,
        key: '$_id',
        createdAt: '$createdAt',
        totalCount: '$totalCount'
      }
    };

    pipelineArray.push(
      filterByDate,
      unwindByCount,
      groupByKey,
      matchByCount,
      finalProject
    );
    return pipelineArray;
  }
}

module.exports = {
  RecordRepository
};
