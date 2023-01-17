#!/bin/bash
set -e
dir=$(dirname "${BASH_SOURCE[0]}")
cd $dir
test -f .env && source .env

cd /workspace/openmage
chmod 777 app/etc media var

HOST_PORT_PART=":${HOST_PORT:-80}"
test "$HOST_PORT_PART" = ":80" && HOST_PORT_PART=""
BASE_URL=${BASE_URL:-"http://${HOST_NAME:-openmage-7f000001.nip.io}${HOST_PORT_PART}/"}
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@example.com}"
ADMIN_USERNAME="${ADMIN_USERNAME:-admin}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-veryl0ngpassw0rd}"

echo "Running composer install..."
composer install

echo "Installing OpenMage LTS..."
php install.php \
  --license_agreement_accepted yes \
  --locale en_US \
  --timezone America/New_York \
  --default_currency USD \
  --db_host mysql \
  --db_name openmage \
  --db_user openmage \
  --db_pass openmage \
  --url "$BASE_URL" \
  --use_rewrites yes \
  --use_secure no \
  --secure_base_url "$BASE_URL" \
  --use_secure_admin no \
  --skip_url_validation \
  --admin_firstname OpenMage  \
  --admin_lastname User \
  --admin_email "$ADMIN_EMAIL" \
  --admin_username "$ADMIN_USERNAME" \
  --admin_password "$ADMIN_PASSWORD"

echo ""
echo "Setup is complete!"
echo "Visit ${BASE_URL}admin and login with '$ADMIN_USERNAME' : '$ADMIN_PASSWORD'"