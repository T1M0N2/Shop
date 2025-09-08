const quotes = [
  "Träume nicht dein Leben, sondern lebe deinen Traum.",
  "Der Weg ist das Ziel.",
  "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.",
  "In der Ruhe liegt die Kraft.",
  "Heute ist ein guter Tag für einen guten Tag.",
  "Die beste Zeit für einen Neuanfang ist jetzt.",
  "Nicht der Berg ist es, den man bezwingt, sondern das eigene Ich.",
  "Auch aus Steinen, die einem in den Weg gelegt werden, kann man Schönes bauen.",
  "Du bist stärker, als du denkst.",
  "Der einzige Weg, großartige Arbeit zu leisten, ist zu lieben, was man tut."
];

function getTodayKey() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `quote-${today}`;
}

function getRandomQuote() {
  const usedQuotes = JSON.parse(localStorage.getItem("usedQuotes")) || [];
  const available = quotes.filter(q => !usedQuotes.includes(q));

  // Wenn alle durch: zurücksetzen
  if (available.length === 0) {
    localStorage.setItem("usedQuotes", JSON.stringify([]));
    return getRandomQuote();
  }

  const quote = available[Math.floor(Math.random() * available.length)];
  usedQuotes.push(quote);
  localStorage.setItem("usedQuotes", JSON.stringify(usedQuotes));
  return quote;
}

function showQuote() {
  const todayKey = getTodayKey();
  let quote = localStorage.getItem(todayKey);

  if (!quote) {
    quote = getRandomQuote();
    localStorage.setItem(todayKey, quote);
  }

  document.getElementById("quote").textContent = quote;
}

function requestNotification() {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("🔔 Erinnerung aktiviert", {
        body: "Du bekommst täglich einen neuen Spruch.",
      });

      // Einfaches tägliches Notification-Beispiel (funktioniert nur wenn App offen)
      setInterval(() => {
        new Notification("Dein täglicher Spruch", {
          body: localStorage.getItem(getTodayKey())
        });
      }, 24 * 60 * 60 * 1000); // alle 24h
    }
  });
}

window.addEventListener("DOMContentLoaded", showQuote);
