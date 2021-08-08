const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });
const contactSchema = mongoose.Schema({
  id: Number,
  name: { type: String, minLength: 3, required: true, unique: true },
  number: { type: String, minLength: 8 },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

contactSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Contact", contactSchema);
