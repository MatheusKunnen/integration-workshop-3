## Vending Machine
- [x] Get child by NFC tag Number (/children/:nfc_tag)
- [x] Login child (/children/login)
- [x] Purchase (/snacks/purchase/:id)
- [x] Get Snack Options (GET/snacks)

## Mobile App
- [x] Register Parent (POST/parents)
- [x] Login Parent (POST/parents/login)
- [x] Register Child (POST/parents/register-child)
    - [x] Get One Password Group (GET/password-group/random)
    - [x] Get Snack Options (GET/snacks)
- [x] Get Children from a parent (GET/children/all)
- View Account Details
    - [x] Update Child Info (PATCH/children/:id) -- update name, tagNumber and passwordImageId
    - [x] Delete Child (DELETE/children/:id)
- Budget & Snacks
    - [x] Update Budget (PATCH/children/:id/budget)
    - [x] Update Allowed Snacks (PATCH/children/:id/snacks)
- [x] Get Order History (GET/children/history/:id)

## For debug:
- [x] Update parent balance
- [x] Update snack stock