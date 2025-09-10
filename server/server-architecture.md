# Arkitektur & moderna verktyg

Föreställ er att ni bygger en Todo-app. Användaren öppnar appen i webbläsaren, skriver
in en uppgift, servern sparar uppgiften i databasen och skickar tillbaka en lista med alla
todos.

Exempel flöde: webbläsare → server → databas → server → webbläsare

Hur ser stegen ut emellan?
Vad för funktioner & endpoints krävs?

klient (webbläsare)

Är du inloggad?
Vilken användare?
Får du hämta?

- visa en sida (exempel react app)
- visa lista todos (visa loading...)
- hämta todos (blir request för dem finns inte hämtade)
- Gör request att få listan

  - vänta på svar...

  Server:
  request (från klient), hämta todos (från databas)
  Databas:
  Är du inloggad?
  Vilken användare?
  Får du hämta?

  OK:
  request, SELECT \* FROM todos;

  servern får tillbaks

  - lista med todos

  Server skickar till klient

  - lista med todos

  Klient får OK från server
  Klient visar listan.
