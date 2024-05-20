const mongoose = require('mongoose')

module.exports = () => {
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD

    const mongoUri = `mongodb+srv://ansarism70:${MONGO_PASSWORD}@cluster0.bf5snxf.mongodb.net/?retryWrites=true&w=majority`

    try {
        mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(
            console.log('mongodb connected')
        )
    } catch (error) {
        console.log(error);
    }
}