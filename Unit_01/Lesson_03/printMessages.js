//requires messages module (availabe through the array via exports.)
const messageModule = require("./message");
messageModule.messages.forEach(m => console.log(m));
