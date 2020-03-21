const moment = require("moment");

module.exports = function formatDate(input) {
  return moment(input).format("MM/DD/YYYY h:m A");
};
