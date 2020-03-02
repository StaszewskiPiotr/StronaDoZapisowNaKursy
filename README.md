# StronaDoZapisowNaKursy 

Użyte oprogramowanie:
1. Visual Studio Code - wersja 1.40.2
2. MySql Workbench - wersja 8.0.18
3. Docker Desktop - wersja 2.1.0.5

Szczegółowe kroki odpalenia programu:
1. Otworzyć w Visual Studio Code folder "tin_baza_danych_projekt"
2. Otworzyć program MySql Workbench oraz utworzyć w nim połączenie oparte o dane:\
\
Connection name: tin-projekt\
Hostname: localhost\
Port: 3306\
Username: root\
Password: toor\

3. Połączyć się za pomocą "Open connection";
4. W zakładce Query wkleić cały kod z pliku, do którego ścieżka wygląda tak "tin_baza_danych_projekt/db/schema.sql", a następnie kliknąć w zakładkę Query>Execute
5. Uruchomić program Docker Desktop
6. Wrócić do programu Visual Studio oraz otworzyć terminal
7. Wpisać w terminal po kolei:
npm install\
npm install -g nodemon\
cd db\
cd docker\
docker-compose up\
8. Otworzyć drugą zakładkę w terminalu i wpisać:
nodemon app.js
9. Otworzyć przeglądarkę i wpisać "http://localhost:3000/"
