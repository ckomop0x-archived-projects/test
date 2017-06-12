import expect from 'expect';

const products = [
  {id: 1, price: 10}, {id: 2, price: 11}, {id: 3, price: 1},
  {id: 4, price: 3}, {id: 5, price: 1}, {id: 6, price: 8},
  {id: 7, price: 3}, {id: 8, price: 0}, {id: 9, price: 4},
  {id: 10, price: 5}, {id: 11, price: 9}, {id: 12, price: 13},
];

function sortProductsByPrice (products, options = 5) {
  const lowestFull = products.sort(function(a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
  });
  const lowest = lowestFull.slice(0, options);

  const highestFull = products.sort(function(a, b) {
    return parseFloat(b.price) - parseFloat(a.price);
  });
  const highest = highestFull.slice(0, options);

  return {highest, lowest};
}



describe('Should sort and return object with two sorted and cutted arrays', () => {
  it('Without any size value', () => {
    const result = sortProductsByPrice(products);
    const expected = {
      highest: [
        { id: 12, price: 13 },
        { id: 2, price: 11 },
        { id: 1, price: 10 },
        { id: 11, price: 9 },
        { id: 6, price: 8 }
      ],
      lowest: [
        { id: 8, price: 0 },
        { id: 3, price: 1 },
        { id: 5, price: 1 },
        { id: 7, price: 3 },
        { id: 4, price: 3 }
      ]
    };
    expect(result).toEqual(expected);
  });

  it('With size 2', () => {
    const result = sortProductsByPrice(products, 2);
    const expected = { highest: [ { id: 12, price: 13 }, { id: 2, price: 11 } ], lowest: [ { id: 8, price: 0 }, { id: 5, price: 1 } ] };
    expect(result).toEqual(expected);
  })

  it('With size 0', () => {
    const result = sortProductsByPrice(products, 0);
    const expected = { highest: [], lowest: [] };
    expect(result).toEqual(expected);
  })

  it('With size 10', () => {
    const result = sortProductsByPrice(products, 10);
    const expected = {
      highest: [
        {id: 12, price: 13},
        {id: 2, price: 11},
        {id: 1, price: 10},
        {id: 11, price: 9},
        {id: 6, price: 8},
        {id: 10, price: 5},
        {id: 9, price: 4},
        {id: 4, price: 3},
        {id: 7, price: 3},
        {id: 5, price: 1}
      ],
      lowest: [
        {id: 8, price: 0},
        {id: 5, price: 1},
        {id: 3, price: 1},
        {id: 7, price: 3},
        {id: 4, price: 3},
        {id: 9, price: 4},
        {id: 10, price: 5},
        {id: 6, price: 8},
        {id: 11, price: 9},
        {id: 1, price: 10}
      ]
    };
    expect(result).toEqual(expected);
  })
});
