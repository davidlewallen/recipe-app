const axios = require('axios');
const jsdom = require('jsdom')

const { JSDOM } = jsdom;

const { strip, stripIngredients, stripInstructions, stripTitle } = require('../myrecipes');

const expectedData = require('../../../utils/__mock__/websiteRulesMock');

describe('RealSimple Rules Test', () => {
  let dom = null;

  beforeAll(async () => {
    const url = 'https://www.realsimple.com/food-recipes/browse-all-recipes/beef-and-barley-soup-with-porcini';
    const res = await axios.get(url);
    const html = res.data;
    dom = new JSDOM(html);
  });

  describe('stripIngredients', () => {
    it('should strip ingredients from website', () => {
      const results = stripIngredients(dom);

      expect(results).toEqual(expectedData.realsimple.ingredients);
    });
  });

  describe('stripInstructions', () => {
    it('should strip instructions from website', () => {
      const results = stripInstructions(dom);

      expect(results).toEqual(expectedData.realsimple.instructions);
    });
  });

  describe('stripTitle', () => {
    it('should strip title from website', () => {
      const results = stripTitle(dom);

      expect(results).toEqual(expectedData.realsimple.title);
    })
  })

  describe('strip', () => {
    it('should strip ingredients, instructions, title, and build an object', () => {
      const results = strip(dom);

      expect(results).toEqual(expectedData.realsimple.full);
    })
  })
})
