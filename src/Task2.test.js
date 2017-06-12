import expect from 'expect';

function sortProductsByPrice (products, options) {
  let lowest, highest;
  const arrayLength = options && options.size ? options.size : 0;

  if (products.length >= arrayLength && arrayLength !== 0) {
    const highestFull = products.sort(function(a, b) {
      return parseFloat(b.price) - parseFloat(a.price);
    });
    highest = highestFull.slice(0, arrayLength);

    const lowestFull = products.sort(function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    });
    lowest = lowestFull.slice(0, arrayLength);
  } else {
    highest = null;
    lowest = null;
  }

  return {highest, lowest};
}

describe('Should sort and return object with two sorted and cutted arrays', () => {
  const products = [
    {id: 1, price: 10}, {id: 2, price: 11}, {id: 3, price: 1},
  ];
  it('Without any size value', () => {
    const result = sortProductsByPrice(products);
    const expected = {
      highest: null,
      lowest: null
    };
    expect(result).toEqual(expected);
  });

  it('With size 4', () => {
    const result = sortProductsByPrice(products, {size: 4});
    const expected = {
      highest: null,
      lowest: null
    };
    expect(result).toEqual(expected);
  })

  it('With size 3', () => {
    const result = sortProductsByPrice(products, {size: 3});
    const expected = {
      highest: [{id: 2, price: 11},{id: 1, price: 10},{id: 3, price: 1}],
      lowest: [{id: 3, price: 1},{id: 1, price: 10},{id: 2, price: 11}]
    };
    expect(result).toEqual(expected);
  })

  it('With size 2', () => {
    const result = sortProductsByPrice(products, {size: 2});
    const expected = {
      highest: [{id: 2, price: 11},{id: 1, price: 10}],
      lowest: [{id: 3, price: 1},{id: 1, price: 10}]
    };
    expect(result).toEqual(expected);
  });

  it('With size 1', () => {
    const result = sortProductsByPrice(products, {size: 1});
    const expected = {
      highest: [{id: 2, price: 11}],
      lowest: [{id: 3, price: 1}]
    };
    expect(result).toEqual(expected);
  });

  it('With size 0', () => {
    const result = sortProductsByPrice(products, {size: 0});
    const expected = {
      highest: null,
      lowest: null
    };
    expect(result).toEqual(expected);
  })
});
