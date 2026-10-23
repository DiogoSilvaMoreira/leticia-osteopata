/* =========================================================
   npm run imagens
   Gera as versões otimizadas das imagens do site (WebP + JPG em
   vários tamanhos) a partir dos originais, além dos ícones e da
   imagem de compartilhamento (assets/og-image.jpg).

   Para trocar uma foto:
   1. Substitua o original (veja a lista FOTOS abaixo):
      - foto de perfil:  assets/leticia-retrato.jpg
      - demais fotos:    assets/originais/NOME.jpg
   2. Rode:  npm install   (só na primeira vez)
             npm run imagens
   3. Confira no navegador e publique.
   ========================================================= */
import sharp from 'sharp';
import { mkdirSync, writeFileSync, statSync } from 'node:fs';

const OUT = 'assets/img';
mkdirSync(OUT, { recursive: true });

// origem, nome de saída e larguras usadas nos srcset das páginas
const FOTOS = [
  { origem: 'assets/leticia-retrato.jpg', nome: 'leticia-retrato', larguras: [400, 800] },
  { origem: 'assets/originais/atendimento-bebe.jpg', nome: 'atendimento-bebe', larguras: [480, 736] },
  { origem: 'assets/originais/atendimento-adulto.jpg', nome: 'atendimento-adulto', larguras: [480, 771] },
  { origem: 'assets/originais/bebe-bola.jpg', nome: 'bebe-bola', larguras: [320, 471] },
  { origem: 'assets/originais/sala-atendimento.jpg', nome: 'sala-atendimento', larguras: [480, 800, 1200] },
  { origem: 'assets/originais/consultorio.jpg', nome: 'consultorio', larguras: [480, 800, 1200] },
  { origem: 'assets/originais/recepcao.jpg', nome: 'recepcao', larguras: [480, 800, 1200] },
  { origem: 'assets/originais/depoimento-poster.jpg', nome: 'depoimento-poster', larguras: [540], soWebp: true }
];
const LOGOS = [
  { origem: 'assets/logo-osteopata.png', nome: 'logo-osteopata', larguras: [260, 400] },
  { origem: 'assets/originais/logo-osteopata-branco.png', nome: 'logo-osteopata-branco', larguras: [400] }
];

const kb = f => (statSync(f).size / 1024).toFixed(1) + ' KB';

for (const f of FOTOS) {
  for (const w of f.larguras) {
    const base = sharp(f.origem).rotate().resize({ width: w, withoutEnlargement: true });
    await base.clone().webp({ quality: 74, effort: 6 }).toFile(`${OUT}/${f.nome}-${w}.webp`);
    if (!f.soWebp) await base.clone().jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(`${OUT}/${f.nome}-${w}.jpg`);
    console.log(`${f.nome}-${w}: webp ${kb(`${OUT}/${f.nome}-${w}.webp`)}`);
  }
}
for (const l of LOGOS) {
  for (const w of l.larguras) {
    const base = sharp(l.origem).resize({ width: w });
    await base.clone().webp({ quality: 86, effort: 6 }).toFile(`${OUT}/${l.nome}-${w}.webp`);
    await base.clone().png({ compressionLevel: 9, palette: true }).toFile(`${OUT}/${l.nome}-${w}.png`);
  }
  console.log(`${l.nome}: ok`);
}

/* ---------- ícones (a partir de assets/favicon.svg) ---------- */
const svg = 'assets/favicon.svg';
// apple-touch-icon: símbolo centralizado em fundo creme, 180x180
const simbolo = await sharp(svg, { density: 600 }).resize({ height: 120 }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#FCEFEC' } })
  .composite([{ input: simbolo, gravity: 'center' }]).png({ compressionLevel: 9, palette: true }).toFile('assets/apple-touch-icon.png');
// favicon.ico com imagens PNG de 16 e 32 px
const pngs = await Promise.all([16, 32].map(s => sharp(svg, { density: 300 }).resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()));
const cab = Buffer.alloc(6 + 16 * pngs.length);
cab.writeUInt16LE(0, 0); cab.writeUInt16LE(1, 2); cab.writeUInt16LE(pngs.length, 4);
let pos = cab.length;
pngs.forEach((p, n) => {
  const s = [16, 32][n], o = 6 + 16 * n;
  cab.writeUInt8(s, o); cab.writeUInt8(s, o + 1); cab.writeUInt8(0, o + 2); cab.writeUInt8(0, o + 3);
  cab.writeUInt16LE(1, o + 4); cab.writeUInt16LE(32, o + 6); cab.writeUInt32LE(p.length, o + 8); cab.writeUInt32LE(pos, o + 12);
  pos += p.length;
});
writeFileSync('favicon.ico', Buffer.concat([cab, ...pngs]));
console.log('ícones: apple-touch-icon', kb('assets/apple-touch-icon.png'), '| favicon.ico', kb('favicon.ico'));

/* ---------- imagem de compartilhamento 1200x630 ---------- */
// base (fundo, logo e texto) em assets/originais/og-base.png + foto de perfil na moldura
const FX = 742, FY = 62, FW = 392, FH = 506, R = 44;
const meta = await sharp('assets/leticia-retrato.jpg').rotate().metadata();
const alturaRed = Math.round(meta.height * FW / meta.width);
const topo = Math.max(0, Math.round((alturaRed - FH) * 0.22)); // mesmo enquadramento do site (rosto no terço de cima)
const foto = await sharp('assets/leticia-retrato.jpg').rotate()
  .resize({ width: FW, height: Math.max(FH, alturaRed), fit: 'cover' })
  .extract({ left: 0, top: Math.min(topo, Math.max(0, alturaRed - FH)), width: FW, height: FH })
  .composite([{ input: Buffer.from(`<svg width="${FW}" height="${FH}"><rect width="${FW}" height="${FH}" rx="${R}" ry="${R}"/></svg>`), blend: 'dest-in' }])
  .png().toBuffer();
await sharp('assets/originais/og-base.png').composite([{ input: foto, left: FX, top: FY }])
  .jpeg({ quality: 84, progressive: true, mozjpeg: true }).toFile('assets/og-image.jpg');
console.log('og-image.jpg', kb('assets/og-image.jpg'));
console.log('Pronto.');
