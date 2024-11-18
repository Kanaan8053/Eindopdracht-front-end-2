// Variabelen om de tijdslimieten bij te houden voor het tonen van wachtwoorden en notificaties
var showTimeout;
var showAllTimeout;

// Array om alle wachtwoordvelden bij te houden
var passwordFields = [];

// Functie om een nieuw item toe te voegen aan de rechterkaart
function addToRightCard() {

    // Haal de ingevoerde URL en wachtwoord op
    var url = document.getElementById("newUrl").value;
    var password = document.getElementById("newPassword").value;
    var rightCard = document.getElementById("newRightCard");

    // Maak een nieuw item en voeg het toe aan de kaart
    var newItem = document.createElement("div");
    newItem.classList.add("item");

    // Maak een informatie-element aan voor het item en vul het met URL en wachtwoord
    var itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");
    itemInfo.innerHTML =
        "<strong>URL / Naam:</strong> " +
        url +
        "<br><strong>Wachtwoord:</strong> <span class='password' data-password='" +
        password +
        "' style='color: black'>" +
        "*".repeat(password.length) +
        "</span>";
    newItem.appendChild(itemInfo);

    // Maak een knop om het wachtwoord te tonen en voeg event listeners toe
    var showBtn = document.createElement("button");
    showBtn.classList.add("btn", "show-btn");
    showBtn.innerText = "Show";
    showBtn.onmousedown = function () {
        showTimeout = setTimeout(function () {
            var passwordField = newItem.querySelector(".password");
            passwordField.innerHTML = passwordField.getAttribute("data-password");
            passwordFields.push(passwordField);
        }, 500);
    };
    showBtn.onmouseup = function () {
        clearTimeout(showTimeout);
        hidePasswords();
    };
    newItem.appendChild(showBtn);

    // Maak een knop om het item te verwijderen en voeg een event listener toe
    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "delete-btn");
    deleteBtn.innerText = "Verwijder";
    deleteBtn.onclick = function () {
        newItem.remove();
        showNotification("Wachtwoord verwijderd!");
    };
    newItem.appendChild(deleteBtn);

    // Voeg het nieuwe item toe aan de rechterkaart
    rightCard.insertBefore(newItem, rightCard.firstChild);

    // Wis de ingevoerde URL en wachtwoord
    document.getElementById("newUrl").value = "";
    document.getElementById("newPassword").value = "";

    // Toon een notificatie dat het wachtwoord is opgeslagen
    showNotification("Wachtwoord opgeslagen!");
}

// Functie om een notificatie weer te geven met het opgegeven bericht
function showNotification(message) {

    // Maak een nieuw notificatie-element aan en voeg het bericht toe
    var notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText = message;

    // Voeg het notificatie-element toe aan de pagina
    document.body.appendChild(notification);

    // Verwijder de notificatie na 3 seconden
    setTimeout(function () {
        notification.remove();
    }, 3000);
}

// Functie om alle wachtwoorden te tonen
function showAllPasswords() {

    // Start een time-out om de wachtwoorden te tonen na een korte vertraging
    showAllTimeout = setTimeout(function () {

        // Zoek alle wachtwoordvelden en toon hun ware waarden
        var passwordFields = document.querySelectorAll(".password");
        passwordFields.forEach(function (passwordField) {
            passwordField.innerHTML = passwordField.getAttribute("data-password");
        });
    }, 500);
}

// Functie om alle wachtwoorden te verbergen
function hidePasswords() {

    // Zoek alle wachtwoordvelden en vervang ze door sterren
    var passwordFields = document.querySelectorAll(".password");
    passwordFields.forEach(function (passwordField) {
        passwordField.innerHTML = "*".repeat(passwordField.getAttribute("data-password").length);
    });
}

// Functie om de kaarten om te draaien
function reverseCards() {

    // Zoek de linker- en rechterkaarten
    var leftCard = document.getElementById("newLeftCard");
    var rightCard = document.getElementById("newRightCard");

    // Wissel de HTML-inhoud van de kaarten om
    var temp = leftCard.innerHTML;
    leftCard.innerHTML = rightCard.innerHTML;
    rightCard.innerHTML = temp;

    // Voeg event listeners toe aan de knoppen in de omgedraaide kaart
    var showBtns = document.querySelectorAll('.show-btn');
    showBtns.forEach(function (btn) {
        btn.onmousedown = function () {
            showTimeout = setTimeout(function () {
                var passwordField = btn.parentNode.querySelector(".password");
                passwordField.innerHTML = passwordField.getAttribute("data-password");
                passwordFields.push(passwordField);
            }, 500);
        };

        btn.onmouseup = function () {
            clearTimeout(showTimeout);
            hidePasswords();
        };
    });

    // Voeg event listeners toe aan de "Show All" knop in de omgedraaide kaart
    document.getElementById('newShowAllBtn').onmousedown = function () {
        showAllPasswords();
    };
    document.getElementById('newShowAllBtn').onmouseup = function () {
        clearTimeout(showAllTimeout);
        hidePasswords();
    };

    // Voeg event listener toe aan de "omdraaien" knop
    document.getElementById('reverseBtn').addEventListener('click', function () {
        showNotification("Kaartjes omgedraaid!");
    });
}
