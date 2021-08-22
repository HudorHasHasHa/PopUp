1.) Plik quickstart.xd crashował mi  Adobe, miałem do dyspozycji widok główny strony dzięki otwarciu pliku przez viewer online.
2.) Improwizowałem też z wyglądem pop-upu w wersji mobilnej, ułożyłem dwie sekcje na sobie.
3.) Zdjęcia do projektu pobrałem z internetu.
Co do działania:
Używając komend npm używamy npm install,  npm run watch 
Po kliknięciu w przycisk wyskakuje pop-up otoczony overlayem.
1.) Widoczna w oknie cena za sztukę produktu zależy od wybranego rozmiaru pamięci RAM oraz wariantu kolorystycznego.
2.) Wybranie rozmiaru "128 GB" wyrzuca komunikat ponieważ w pliku xbox.json zdefiniowano liczbę sztuk na 0, prowadzi to również do przejścia do rozmiaru 32GB.
3.) Input sprawdza czy wprowadzona treść jest liczbą oraz nie pozwala na wprowadzenie wielkości mniejszej od 1 i większej od ilości zdefiniowanej w pliku xbox.json dla wybranej wielkości Ram.
4.) Przycisk dodaj do koszyka zbiera po evencie "click" wszystkie dane do obiektu. Na końcu pliku script.js dodałem fetch z metodą post gdyby trzeba było przesłać obiekt z zamówieniem do api.