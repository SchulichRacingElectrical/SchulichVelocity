class Session {
    constructor(tableRows) {
        this.rows = []
        for (var i = 0; i < tableRows.length; i++) {
            this.rows.push(new Row(tableRows[i]))
        }
    }

}

class Row {
    constructor(tableRow) {                                 //make sure that capitalization is correct
        this.rpm = tableRow.RPM
        this.interval = tableRow.Interval
        this.tps = tableRow.tps
        this.Will = "gay"
    }
}

module.exports.Session = Session