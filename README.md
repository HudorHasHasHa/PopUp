 https://hudorhashasha.github.io/PopUp/

- Po kliknięciu w przycisk wyskakuje pop-up otoczony overlayem.
1. Kliknięcie na overlay/'x' zamyka pop-up
2. Widoczna w oknie cena za sztukę produktu zależy od wybranego rozmiaru pamięci RAM oraz wariantu kolorystycznego.
3. Wybranie rozmiaru "128 GB" wyrzuca komunikat ponieważ w pliku xbox.json zdefiniowano liczbę sztuk na 0, prowadzi to również do przejścia do "najwcześniejszego" elementu legitymującego się ilością sztuk >= 1.
4. Status dostępności produktu również działa na podstawie pobranych danych z pliku json, jego działanie widoczne jest po "wykupieniu" wszystkich dostępnych sztuk produktu.
5. Input sprawdza czy wprowadzona treść jest liczbą oraz nie pozwala na wprowadzenie wielkości mniejszej od 1 i większej od ilości zdefiniowanej w pliku xbox.json dla wybranej wielkości Ram.
6. Przycisk dodaj do koszyka zbiera po evencie "click" wszystkie dane do obiektu oraz przeładowuje elementy strony z zaktualizowanymi wartościami, które zostały pobrane pliku json. Na końcu pliku script.js dodałem atrapę fetch z metodą post w razie konieczności przesłania do api.
