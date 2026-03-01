#!/bin/bash

URL="https://pharmacy-fastapi-backend.onrender.com/inventory/"

med_names=("Paracetamol" "Ibuprofen" "Amoxicillin" "Azithromycin" "Cetirizine" "Metformin" "Aspirin" "Dolo" "Pantoprazole" "Atorvastatin")
categories=("Tablet" "Capsule" "Syrup" "Injection")
suppliers=("HealthCare Distributors" "Medico Supplies Ltd" "Wellness Pharma" "City Medical Agency" "Prime Pharma Traders")

random_date() {
  start=$(date -d "2023-01-01" +%s)
  end=$(date -d "2028-12-31" +%s)
  rand=$((RANDOM % (end - start) + start))
  date -d "@$rand" +%Y-%m-%d
}

for i in {1..20}
do
  med=${med_names[$RANDOM % ${#med_names[@]}]}
  strength=$(( (RANDOM % 5 + 1) * 100 ))
  med_name="$med ${strength}mg"
  gen_name="$med"
  category=${categories[$RANDOM % ${#categories[@]}]}
  supplier=${suppliers[$RANDOM % ${#suppliers[@]}]}

  batch_no="$(echo $med | cut -c1-3 | tr '[:lower:]' '[:upper:]')$RANDOM"

  expiry_date=$(random_date)

  quantity=$((RANDOM % 500 + 1))   # 1–500
  cost_price=$((RANDOM % 200 + 1)) # 1–200
  mrp=$((cost_price + RANDOM % 50))

  # Determine status
  today=$(date +%Y-%m-%d)
  if [[ "$expiry_date" < "$today" ]]; then
    status="Expired"
  elif [ $quantity -lt 20 ]; then
    status="Low Stock"
  else
    status="Active"
  fi

  curl -s -X 'POST' "$URL" \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d "{
      \"med_name\": \"$med_name\",
      \"gen_name\": \"$gen_name\",
      \"category\": \"$category\",
      \"batch_no\": \"$batch_no\",
      \"expiry_date\": \"$expiry_date\",
      \"quantity\": $quantity,
      \"cost_price\": $cost_price,
      \"mrp\": $mrp,
      \"supplier\": \"$supplier\",
      \"status\": \"$status\"
    }"

  echo " -> Sent $med_name"
done

echo "Finished sending 20 records."
