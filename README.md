# TR-FastApi-React

Projekt przygotowany przez Dominika Nowaka

Wymagania:
* Docker
* docker-compose 3.7

Sposób uruchomienia:
```bash
sudo docker-compose up
```

Podstawowe wymagania:
- [x] Korzystanie z kompoenentów funkcyjnych
- [x] Użycie bazy danych My Sql
- [x] Komunikacja - REST
- [x] Pojedyńczy serwer serwujący dane i strone

Wymagania - Głowny ekran:
- [x] Wyświetla aktywności aktywnego (lub dowolnie innego) dnia. Podlicza zgłoszony czas
- [x] Posiada przyciski Obejrzyj/Dodaj/Zmień/Skasuj. Dla miesięcy zamkniętych można tylko oglądać -> przyciski Details/ Add new/ Edit / Delete
- [x] Posiada możliwość zmiany dnia, a nawet miesiąca

Wymagania - Ekran do wprowadzania:
- [x] użytkownik może dodać lub usunąć aktywność
- [x] raportując aktywność wskazujemy projekt, na rzecz którego ją wykonano
- [x] Nie można przypisać aktywności do zamkniętego projektu
- [x] Po wyborze projektu (opcjonalnie) można wybrać podkategorię w ramach tego projektu
- [x] Dla aktywności określamy spędzony czas (w minutach)
- [x] Aktywność ma pole opisowe, w które opcjonalnie możemy wpisać dodatkowe tekstowe informacje
