echo "Creating personale: Big Government"
npx hurl invoke cartellaclinica personale_register gov "Big Government" -u admin

echo "Creating personale: MIT"
npx hurl invoke cartellaclinica personale_register mit "MIT" -u user1 -o org1

echo "Creating personale: National Bank"
npx hurl invoke cartellaclinica personale_register naba "National Bank" -u user1 -o org2

echo "Creating cartellaclinica: John Doe"
npx hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"1-100-100\", \"firstname\": \"John\", \"lastname\": \"Doe\", \"username\": \"johndoe\", \"password\": \"12345678\", \"email\": \"john.doe@mail.com\"}" -u admin

echo "Adding attribute 'birth-year' as the Big Government identity"
npx hurl invoke cartellaclinica cartellaclinica_addAttribute "1-100-100" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin

npx hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"1-100-101\", \"firstname\": \"Jane\", \"lastname\": \"Doe\", \"username\": \"janedoe\", \"password\": \"12345678\", \"email\": \"jane.doe@mail.com\"}" -u admin
npx hurl invoke cartellaclinica cartellaclinica_addAttribute "1-100-101" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin

npx hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"1-100-102\", \"firstname\": \"Dick\", \"lastname\": \"Doe\", \"username\": \"dickdoe\", \"password\": \"12345678\", \"email\": \"dick.doe@mail.com\"}" -u admin
npx hurl invoke cartellaclinica cartellaclinica_addAttribute "1-100-102" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1988\", \"issuedDate\": 1554239270 }" -u admin





l
hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot1\", \"firstname\": \"Mario\", \"lastname\": \"Rossi\", \"username\": \"mr1976\", \"password\": \"mario123\", \"email\": \"didiid@email.com\", \"roles\": [\"DOC\"] }" -u dottore1
hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz1\", \"firstname\": \"Andrea\", \"lastname\": \"Bianchi\", \"username\": \"ab1996\", \"password\": \"andrea123\",  \"email\": \"gttrghtrh@email.com\" }" -u paziente1