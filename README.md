# Bilder-BOT Control Center

Moderne Verwaltungsoberfläche für den Bilder-BOT, bereit für Railway.

## Railway starten
- Dieses Repository mit Railway verbinden.
- Build: kein Build-Schritt nötig.
- Start Command: `npm start`.
- Railway stellt den Port über `PORT` bereit.
- Unter Settings → Networking eine öffentliche Domain erzeugen.

## Bereiche
Übersicht, Willkommenssystem, Vorlagen, Bild-Beiträge, Automationen/Zeitpläne, Moderationseinstellungen, Server- und Rollen-IDs, Aktivitätsprotokoll, JSON-Import/-Export.

## Daten und Bot-Verbindung
Diese Oberfläche speichert die eingegebenen Konfigurationen aktuell im Browser (localStorage) und exportiert/importiert JSON. Sie ist damit eine funktionsfähige Konfigurationsoberfläche, aber noch keine Live-Steuerung des Discord-Bots. Für das Senden von Nachrichten, Rollenänderungen, Moderation und Zeitpläne muss das Bot-Backend eine authentifizierte API bereitstellen und diese Website muss daran angebunden werden.

Die Webseite zeigt deshalb transparent „Bot-API noch nicht verbunden“ an und behauptet keine erfolgreichen Discord-Aktionen.

**Sicherheit:** Discord Bot Token, OAuth Client Secret und andere Geheimnisse ausschließlich als private Railway Variables speichern, niemals in Formulare, GitHub oder exportierte JSON-Dateien eintragen.

## Lokal testen
`npm start` und anschließend `http://localhost:3000` öffnen.
Healthcheck: `/health`.
