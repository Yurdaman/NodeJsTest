const fortune = require("../lib/fortune");
const { expect } = require("chai");

describe("Fortune cookie tests", function () {
  it("getFortune() должен вернуть строку", function () {
    expect(typeof fortune.getFortune()).to.equal("string");
  });

  it("getFortune() должен возвращать разные значения при разных вызовах", function () {
    const fortunes = new Set();
    for (let i = 0; i < 50; i++) {
      fortunes.add(fortune.getFortune());
    }
    expect(fortunes.size).to.be.at.least(2);
  });
});