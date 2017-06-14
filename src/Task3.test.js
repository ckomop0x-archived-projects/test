import expect from 'expect';

const compare = function (arrayOne, arrayTwo) {
  return arrayOne.length == arrayTwo.length && arrayOne.every((v, i) => v === arrayTwo[i])
}

const sortProductsByPrice = (() => {
  let state = [];
  let modified = false;
  return (data = [], options) => {
    let tempArray = [ ...data ];
    modified = compare(state, tempArray);
    if (!modified) {
      state = [ ...tempArray ];
    }

    let lowest, highest;
    const arrayLength = options && options.size ? options.size : 5;
    if(modified === false) {
      if (tempArray.length >= arrayLength && arrayLength !== 0) {
        const lowestFull = tempArray.sort(function(a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        lowest = lowestFull.slice(0, arrayLength);

        const highestFull = tempArray.sort(function(a, b) {
          return parseFloat(b.price) - parseFloat(a.price);
        });
        highest = highestFull.slice(0, arrayLength);

      } else {
        highest = null;
        lowest = null;
      }
    } else {
      highest = null;
      lowest = null;
    }

    return {highest, lowest};
  };
})();

const products = [
  {id: 1, price: 10},
  {id: 2, price: 11},
  {id: 3, price: 1},
  {id: 4, price: 2},
  {id: 5, price: 100},
  {id: 6, price: 0.1},
];

describe('Should sort and return object with two sorted and cutted arrays', () => {



  it('With modification 1', () => {

    const result = sortProductsByPrice(products);
    const expected = {
      highest: [
        {id: 5, price: 100},
        {id: 2, price: 11},
        {id: 1, price: 10},
        {id: 4, price: 2},
        {id: 3, price: 1}],
      lowest: [
        {id: 6, price: 0.1},
        {id: 3, price: 1},
        {id: 4, price: 2},
        {id: 1, price: 10},
        {id: 2, price: 11}]
    };

    expect(result).toEqual(expected);
  });

  it('Without modification 2', () => {

    const result = sortProductsByPrice(products);
    const result2 = sortProductsByPrice(products);

    const expected = {
      highest: null,
      lowest: null
    };
    expect(result2).toEqual(expected);
  });

  it('With modification 3', () => {
    const result = sortProductsByPrice(products);
    products.push({id: 7, price: 1200});
    const result2 = sortProductsByPrice(products);
    products.push({id: 8, price: 0});
    const result3 = sortProductsByPrice(products);
    const expected = {
      highest: [
        {id: 7, price: 1200},
        {id: 5, price: 100},
        {id: 2, price: 11},
        {id: 1, price: 10},
        {id: 4, price: 2}],
      lowest: [
        {id: 8, price: 0},
        {id: 6, price: 0.1},
        {id: 3, price: 1},
        {id: 4, price: 2},
        {id: 1, price: 10}]
    };
    expect(result3).toEqual(expected);
  });
});
