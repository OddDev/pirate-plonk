fetch("https://api.jsonbin.io/e/collection/6001a05de31fbc3bdef40863/all-bins", {
  headers: {
    "secret-key":
      "$2b$10$6r9ltsMdgoyW3gYV0c.fKe5I8xbSAO2j2SQA/HJhGU8Vk1LA7VbEq",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
