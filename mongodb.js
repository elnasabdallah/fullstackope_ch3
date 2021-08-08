const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}
const password = process.argv;
const url = `mongodb+srv://elnas:1234@cluster0.3iogm.mongodb.net/phonebook?retryWrites=true&w=majority`;

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
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  console.log("Phone book:");
  Contact.find({})
    .then(contacts => {
      contacts.forEach(contact => {
        console.log(contact.name, contact.number);
      });
    })
    .then(res => {
      mongoose.connection.close();
    });
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const contact = new Contact({
    name: name,
    number: number,
  });

  contact.save().then(response => {
    console.log(`added ${name} to phone book`);
    mongoose.connection.close();
  });
}
