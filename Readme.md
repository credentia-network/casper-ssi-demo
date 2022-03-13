# Installation Instructions Casper SSI Framework

## 1.	Unfolding Casper SSI Framework, 
-	Instal Visual Studio Code
-	Create account on Github
-	Connect developer repository …. (need invitation via git)
-	Run commands in terminal: 
-	npm install -E
-	npm run start
-	In Google Chrome: localhost:3000 
-	Run Chrome browser without CORS

## 2.
![2.](./screenshots/Picture1.png)

## 3. Create New Vault, Click  Casper Lab Singer, set password for Vault
![Create New Vault, Click  Casper Lab Singer, set password for Vault](./screenshots/Picture2.png)

## 4. Create new Account
![Create new Account](./screenshots/Picture3.png)
-	Add a name to a new account
-	Algorithm - select ED25515
-	Public Key - generated automatically
-	Push button [CREATE]
-	Download and save the key

## 5. Connect Vault to site Casper SSI Framework
![Connect Vault](./screenshots/Picture4.png)
-	After connecting, refresh the page (because the local version is used)

## 6. Add test token CSPR to Vault in order to be able to create-sign a document.
https://testnet.cspr.live/tools/faucet

## 7. Re-entry
-	after the account has expired, you must click the extension Casper Lab Singer or click the [Sign in] button on the Casper SSI Framework page, then enter your storage password (created during registration)

![Re-entry](./screenshots/Picture5.png)

## 8.
![8](./screenshots/Picture6.png)

## 9.	Create new document:
-	Open section ISSUER
-	Push button [Create Issuer VC]
-	In field “Enter receiver's DID” enter the DID of the person who will see the document and click [Check] to check, after verification press button  [Select template]

![Create new document](./screenshots/Picture7.png)
-	Enter date Valid until (optional)
-	Select the required document template and fill in the fields

![Create new document2](./screenshots/Picture8.png)
-	Sign the document by clicking the button [Sign] (1)
-	Sign a document in the Vault push the button [Sign] (2)

![Create new document3](./screenshots/Picture9.png)

## 10. Revoke document (page Issuer)
![Revoke document](./screenshots/Picture10.png)

## 11. Confirm and sign the transaction(page Issuer)
![Confirm and sign the transaction](./screenshots/Picture11.png)

## 12. View VC issued to you (page Holder)
On the "Holder" page, click any document template:
![View VC issued to you](./screenshots/Picture12.png)
-	If the document is created

![If the document is created](./screenshots/Picture13.png)
-	If the document does not exist

## 13. Approve document (page Holder)
  If you need to confirm a document:

![Push button Consider](./screenshots/Picture14.png)
-	Push button [Consider]

![select the desired action](./screenshots/Picture15.png)
-	select the desired action, Approve (1) or Reject Request (2)

![sign action in wallet](./screenshots/Picture16.png)
-	sign action in wallet

![after signing](./screenshots/Picture17.png)
-	after signing, the document is assigned one or another status

![For lock approved document need press button](./screenshots/Picture18.png)
-	For lock approved document need press button

## 14.	Request and verify third party VC (page Verifier)

![Create request click](./screenshots/Picture19.png)

Create request click [Create VC request]

![Select the fields to be validate](./screenshots/Picture20.png)
-	Select the fields to be validated (1). The selected element changes color to green.
-	Item not selected (2)
-	In the field "Holder's DID" enter the DID of the verifier (3)
-	Push button [Create]


![Press button](./screenshots/Picture21.png)
-	Press button [Save]

![Sign action in wallet](./screenshots/Picture22.png)
-	Sign action in wallet

![created request is displayed](./screenshots/Picture23.png)
-	The created request is displayed in the table with the status "Pending"

![Click the View button to view the verified document](./screenshots/Picture24.png)
-	Click the [View] button to view the verified document