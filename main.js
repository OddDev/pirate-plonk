performance.mark("TTR:start");
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=rum")
  .then((response) => response.json())
  .then((data) => {
    // Get random drink
    const drink = data.drinks[Math.round(Math.random() * data.drinks.length)];

    // Write to DOM
    rumage.src = drink.strDrinkThumb;
    rumline.innerHTML = drink.strDrink;
    rumscription.innerHTML = drink.strInstructions;
  })
  .then(() => {
    performance.mark("TTR:end");
    performance.measure("Time To Rum", "TTR:start", "TTR:end");
  });

// Performance Observer
const po = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Let's pretend this is our analysis server thing
    fetch("https://api.jsonbin.io/b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "secret-key":
          "$2b$10$6r9ltsMdgoyW3gYV0c.fKe5I8xbSAO2j2SQA/HJhGU8Vk1LA7VbEq",
        "collection-id": "6001a05de31fbc3bdef40863",
        name: "Time To Rum Measure",
      },
      body: JSON.stringify(entry.toJSON()),
    });
  }
});
po.observe({ type: "measure", buffered: true });
