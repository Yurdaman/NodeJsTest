module.exports = function (grunt) {
  // Подключаем плагины
  ["grunt-eslint", "grunt-exec", "grunt-shell"].forEach((task) =>
    grunt.loadNpmTasks(task)
  );

  // Конфигурация
  grunt.initConfig({
    shell: {
      mocha: {
        // Запускаем только совместимые с Node.js тесты
        command:
          "npx mocha qa/tests-crosspage.mjs qa/tests-unit.js --experimental-modules",
      },
    },
    eslint: {
      target: ["*.js", "lib/**/*.js", "public/**/*.js", "qa/**/*.js", "!public/vendor/**/*.js"],
    },
    exec: {
      linkchecker: {
        cmd: "npx blc http://localhost:3000 --filter-level 3",
      },
    },
  });

  // Регистрируем задачу по умолчанию
  grunt.registerTask("default", [
    "shell:mocha", // запуск тестов в Node.js
    "eslint", // проверка JS-кода
    "exec:linkchecker", // проверка ссылок
  ]);
};
