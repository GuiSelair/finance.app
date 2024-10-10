"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExpenseMonth = calculateExpenseMonth;
var date_fns_1 = require("date-fns");
function calculateExpenseMonth(purchaseDate, turningDay) {
    var turningDate = (0, date_fns_1.setDate)(purchaseDate, turningDay);
    if ((0, date_fns_1.isBefore)(purchaseDate, turningDate)) {
        return {
            isInCurrentMonth: true,
            month: (0, date_fns_1.getMonth)(purchaseDate)
        };
    }
    return {
        isInCurrentMonth: false,
        month: (0, date_fns_1.getMonth)(purchaseDate) + 1
    };
}
