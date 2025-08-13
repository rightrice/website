const fs = require('fs');
const fetch = require('node-fetch');

const COUNT = parseInt(process.argv[2] || process.env.CVE_COUNT || 30, 10);
const API_URL = `https://cve.circl.lu/api/last/${COUNT}`;
const OUTPUT_FILE = 'cve_data.json';

(async () => {
  try {
    console.log(`Fetching ${COUNT} latest CVEs from CIRCL...`);
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const list = await response.json();

    const output = list.map(c => ({
      id:          c.id,
      description: c.summary,
      severity:    (c.cvss >= 7   ? 'High'
                  : c.cvss >= 4 ? 'Medium'
                  :               'Low'),
      link:        `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${c.id}`
    }));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
    console.log(`✔ Wrote ${output.length} CVEs to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('✖ Error updating CVEs:', err);
    process.exit(1);
  }
})();