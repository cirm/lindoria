export const loyaltyMap = {
  1: 'Hostile',
  2: 'Unfriendly',
  3: 'Indifferent',
  4: 'Friendly',
  5: 'Helpful',
};

const map = {
  persons: {
    key: 'pname',
    target: 'regent',
  },
  domains: {
    key: 'dname',
    target: 'domain',
  },
};

export const getDisplay = (type, props) => props[type]
  .toSeq()
  .filter(x => x.get(map[type].key) === props.focus.getIn(['province', map[type].target]))
  .take(1)
  .get(0)
  .get('display');
