const {Model} = require('./model');

class StreamingModel extends Model{
    constructor(DB) {
        super(DB);
    }

    fetchData() {
        
    }
}

module.exports = StreamingModel;