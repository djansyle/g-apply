import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import apply from '../src';

chai.use(chaiAsPromised);

describe('apply', function () {
  it('should call all function and return the last result', async function () {
    const pre = sinon.fake();
    const fn = sinon.fake.resolves(true);

    await expect(apply([pre, fn])(1, 2)).to.eventually.be.true;
    expect(pre.callCount).to.equal(1);
    expect(fn.callCount).to.equal(1);
  });

  it('should error when not a function', function () {
    expect(() => apply([1, 2] as any)).to.throw(TypeError);
  });
});