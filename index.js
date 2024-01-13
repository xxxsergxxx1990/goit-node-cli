


const { Command } = require("commander");
const contacts = require("./contacts.js");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.log(allContacts);
        break;

      case "get":
        const contactById = await contacts.getContactById(id);
        console.log(contactById);
        break;

      case "add":
        const addedContact = await contacts.addContact(name, email, phone);
        console.log(addedContact);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(id);
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("\x1B[31m An error occurred:", error.message);
  }
}

invokeAction(options);