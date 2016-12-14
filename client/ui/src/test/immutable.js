import {describe, before, it}  from 'mocha';
import {should, assert, expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

describe('immutability', () => {

  describe('Maps', () => {
    it('basics', () => {
      let map1 = fromJS({id: 1, name: 'bob', address: {street: '123 Memory Lane', city: 'Baltimore', state: 'MD'}});

      map1.set('id', 2);
      expect(map1.get('id')).to.equal(1);
      expect(map1.getIn(['id']), "expected immutable's key-path to retrieve the id").to.equal(1);
      expect(map1.getIn(['address', 'street']), "expected immutable's key-path to retrieve the street").to.equal('123 Memory Lane');

      let map2 = map1.setIn(['address', 'street'], '21 Memory Blvd.');
      expect(map2.getIn(['address', 'street'])).to.equal('21 Memory Blvd.', "expected immutable's key-path to retrieve the street");

    })
  });

  describe('Lists', () => {

    let findIndexInList = (list, searchValue) => {
      return list.findIndex(value => {
        return value === searchValue;
      });
    };

    it('creating Lists', () => {
      let list1 = List.of('alpha', 'beta', 'gamma');

      expect(list1.size).to.equal(3);
      expect(list1.get(0)).to.equal('alpha');
      expect(list1.get(-3)).to.equal('alpha');

      expect(findIndexInList(list1, 'gamma')).to.equal(2);
    });
  })
});

