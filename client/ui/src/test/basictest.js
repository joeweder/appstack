import {describe, before, it}  from 'mocha';
import {should, assert} from 'chai';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Maps', function() {
  it('should return the value for the key', function() {
    let m1 = new Map();
    m1.set("1", 1);
    assert.equal(1, m1.get("1"));
    assert.equal(1, m1.size);
  });

  it('allow for construction from another iterable', function() {
    let m1 = new Map([['key1', 1], ['key2', 2]]);

    assert.equal(1, m1.get('key1'));
    assert.equal(2, m1.get('key2'));
  });
});

describe('Testing truthy', function() {
  it('should not be truthy', function() {
    assert.equal(false, 'true' === process.env.PRODUCTION_API || false);
  });
  it('should be truthy', function() {
    let process = {"env": {"PRODUCTION_API": "true"}};
    assert.equal(true, 'true' === process.env.PRODUCTION_API || false);
  });
});

describe('ES6:Destructuring', function() {
  it('should return the value for the key', function() {
    let m1 = new Map();
    m1.set("1", 1);
    assert.equal(1, m1.get("1"));
    assert.equal(1, m1.size);
  });

  it('allow for construction from another iterable', function() {
    let m1 = new Map([['key1', 1], ['key2', 2]]);

    assert.equal(1, m1.get('key1'));
    assert.equal(2, m1.get('key2'));
  });
});
