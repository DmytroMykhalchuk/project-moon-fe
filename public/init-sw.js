window.addEventListener("load", async () => {
  if (navigator) {
    try {
      await navigator.serviceWorker.register("./service-workers.js")
    } catch (e) {
      console.log("Service worker register file", e);
    }
  }
});
