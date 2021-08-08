require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Contact = require("./models/contact");

//define express and other middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

//GET all persons
app.get("/api/persons", (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts);
  });
});

//GET app info
app.get("/api/info", (request, response) => {
  Contact.find({}).then(contacts => {
    const info = `<p>The phone book has ${
      contacts.length
    } people<p/><p>${Date()}<p/> `;
    response.json(info);
  });
});

//GET specific person
app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

//delete a contact
app.delete("/api/persons/:id", (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(response => {
      res.status(204).end();
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

//ADD a contact
app.post("/api/persons", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "content missing" });
  }

  const newContact = req.body;

  if (newContact.name === "" || newContact.number === "") {
    return res.status(404).json({ error: "name or number can not be empty" });
  }

  const contact = new Contact({
    name: newContact.name,
    number: newContact.number,
  });

  contact
    .save()
    .then(response => {
      res.json(newContact);
    })
    .catch(error => next(error));
});

//update a contact

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  const contact = {
    name: name,
    number: number,
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact);
    })
    .catch(error => next(error));
});

//Error handler middleware
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    console.error(error.message);
    return response.status(400).send({ error: error.message });
  }

  next(error);
};
//load error handler middleware..which normally comes last
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
