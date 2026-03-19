#!/bin/bash

SERVICE=$1              # service/container name
START_DELAY=10          # seconds before failure
DOWNTIME=20             # how long the service stays down

if [ -z "$SERVICE" ]; then
  echo "Usage: ./chaos.sh <container_name>"
  exit 1
fi

echo "----------------------------------------"
echo "Chaos test for: $SERVICE"
echo "Start delay: ${START_DELAY}s"
echo "Downtime: ${DOWNTIME}s"
echo "----------------------------------------"

echo "[`date`] Waiting before injecting failure..."
sleep $START_DELAY

echo "[`date`] Stopping $SERVICE..."
docker stop $SERVICE

echo "[`date`] $SERVICE is DOWN"
sleep $DOWNTIME

echo "[`date`] Restarting $SERVICE..."
docker start $SERVICE

echo "[`date`] $SERVICE is BACK UP"
echo "----------------------------------------"