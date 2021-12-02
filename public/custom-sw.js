self.addEventListener("push", (event) => {
  let title = "Alerta";
  let text = "";
  try {
    const data = event.data.json();
    title = data.title;
    text = data.body;
  } catch {
    text = event.data.text();
  }
  const options = {
    body: text,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
