echo "Installing template views"
VIEWS=$(dirname "$0")
VIEW_PATH="ch1_person"
COUCH_URL="http://localhost:5084"

curl -X PUT "$COUCH_URL/$VIEW_PATH/_design/cartellaclinica" \
  --upload-file $VIEWS//cartellaclinica.json

echo "Installed template views"