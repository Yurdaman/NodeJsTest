const chai = require("chai"); // <-- missing line added
var assert = chai.assert;

window.addEventListener("load", function () {
  suite("Global Tests", function () {
    test("page has a valid title", function () {
      assert(
        document.title &&
          document.title.match(/\S/) &&
          document.title.toUpperCase() !== "TODO"
      );
    });
  });
});
