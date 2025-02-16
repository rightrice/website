#!/bin/bash

# Define the target domain
TARGET="example.com"

# Define output directory
OUTPUT_DIR="bbot_recon_results"
mkdir -p $OUTPUT_DIR

# Run BBOT with subdomains, ports, and breach modules
echo "[*] Starting BBOT recon for $TARGET..."
bbot -t $TARGET --modules subdomains,ports,breaches --output $OUTPUT_DIR/recon.json

# Extract useful data from JSON results
echo "[*] Extracting important findings..."
jq '.subdomains[]' $OUTPUT_DIR/recon.json > $OUTPUT_DIR/subdomains.txt
jq '.ips[]' $OUTPUT_DIR/recon.json > $OUTPUT_DIR/ips.txt
jq '.breaches[]' $OUTPUT_DIR/breaches.txt

# Perform additional port scanning on discovered subdomains
echo "[*] Running Nmap scan on discovered subdomains..."
nmap -iL $OUTPUT_DIR/ips.txt -p 80,443,8080,8443 -oN $OUTPUT_DIR/nmap_results.txt

# Display final output
echo "[*] Recon Complete! Results saved in $OUTPUT_DIR"
ls -l $OUTPUT_DIR
