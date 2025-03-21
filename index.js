/* Your Code Here */
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(dateTime) {
    let [date, hour] = dateTime.split(" ");
    this.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour, 10) });
    return this;
}

function createTimeOutEvent(dateTime) {
    let [date, hour] = dateTime.split(" ");
    this.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour, 10) });
    return this;
}

function hoursWorkedOnDate(targetDate) {
    let inEvent = this.timeInEvents.find(e => e.date === targetDate);
    let outEvent = this.timeOutEvents.find(e => e.date === targetDate);
    if (!inEvent || !outEvent) return 0;
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(targetDate) {
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour;
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(emp => emp.firstName === firstNameString) || null;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, emp) => total + allWagesFor.call(emp), 0);
}
