## Vending Machine
- [x] Get child by NFC tag Number (/children/:nfc_tag)
- [x] Login child (/children/login)
- [ ] Purchase (/children/purchase)

## Mobile App
- [x] Register Parent (POST/parents)
- [x] Login Parent (POST/parents/login)
- [x] Register Child (POST/parents/register-child)
    - [x] Get One Password Group (GET/password-group/:id)
    - [x] Get Snack Options (GET/snacks)
- [x] Get Children from a parent (GET/children/parents/:id)
- View Account Details
    - [x] Update Child Info (PATCH/children/:id) -- update name, tagNumber and passwordImageId
    - [x] Delete Child (DELETE/children/:id)
- Budget & Snacks
    - [ ] Update Budget (PATCH/children/budget)
    - [ ] Update Allowed Snacks (PUT/children/snacks)
- [ ] Get Order History (GET/children/history)