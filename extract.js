const fs = require('fs');
const html = fs.readFileSync('ji_le_zara_premium_website (1).html', 'utf8');

const imgMatch = html.match(/src="data:image\/(jpeg|png|jpg);base64,([^"]+)"/);
if (imgMatch) {
  const b64 = imgMatch[2];
  fs.writeFileSync('frontend/public/dr_nilambari_portrait.jpg', Buffer.from(b64, 'base64'));
  console.log('Saved portrait to frontend/public/dr_nilambari_portrait.jpg');
} else {
  console.log('No image matched');
}

const clean = html.replace(/src="data:image\/[^"]+"/g, 'src="[PORTRAIT_IMAGE]"');
fs.writeFileSync('extracted_content.html', clean);
console.log('Clean HTML written to extracted_content.html');
