function fetchAndParseData() {
  spinner.style.display = "block";
  fetch(
    "https://api.jsonbin.io/e/collection/6001a05de31fbc3bdef40863/all-bins",
    {
      headers: {
        "secret-key":
          "$2b$10$6r9ltsMdgoyW3gYV0c.fKe5I8xbSAO2j2SQA/HJhGU8Vk1LA7VbEq",
      },
    }
  )
    .then((response) => response.json())
    .then((data) =>
      data.records.slice(0, 5).map((record) =>
        fetch(`https://api.jsonbin.io/b/${record.id}/latest`, {
          headers: {
            "secret-key":
              "$2b$10$6r9ltsMdgoyW3gYV0c.fKe5I8xbSAO2j2SQA/HJhGU8Vk1LA7VbEq",
          },
        })
          .then((response) => response.json())
          .then((bin) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${bin.name} - ${bin.duration}`;
            list.append(listItem);
            return parseInt(bin.duration);
          })
      )
    )
    .then((bins) =>
      Promise.all(bins).then((results) => {
        average.innerHTML = Math.round(
          results
            .sort((firstElement, secondElement) =>
              firstElement > secondElement ? 1 : -1
            )
            .slice(0, -1)
            .reverse()
            .slice(0, -1)
            .reduce((sum, current) => sum + current) / 3
        );
        spinner.style.display = "none";
      })
    );
}
