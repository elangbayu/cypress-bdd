Feature: Sepulsa

    Scenario: Beli pulsa di sepulsa tanpa login
        Given user is on sepulsa page
        When user click beli pulsa button
        When user input nomor handphone
        When user choose and click nominal pulsa 5rb