'use strict';

class RepositoryFactory {
  constructor(RepositoryClass = null) {
    if (!RepositoryClass) {
      throw new Error('RepositoryClass is required!');
    }

    this.defaultRepo = RepositoryClass;
    this.reset();
  }

  set repository(repo) {
    this.repo = repo;
  }

  get repository() {
    return new this.repo();
  }

  reset() {
    this.repo = this.defaultRepo;
  }
}

module.exports = {
  RepositoryFactory
};
