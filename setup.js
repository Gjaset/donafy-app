const fs = require('fs');
const path = require('path');
require('dotenv').config();

const provider = process.env.DATABASE_PROVIDER || 'sqlite';
const rootDir = __dirname;

const envFiles = {
  '.env.development': `DATABASE_PROVIDER=sqlite\nDATABASE_URL=file:./dev.db\nNODE_ENV=development\n\nNEXTAUTH_URL=http://localhost:3000\nNEXTAUTH_SECRET=development-secret-key-change-in-production\n\nAPI_URL=http://localhost:3000/api\n\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=\nNEXT_PUBLIC_WOMPI_PUBLIC_KEY=\nWOMPI_PRIVATE_KEY=`,
  '.env.production': `DATABASE_PROVIDER=postgresql\nDATABASE_URL=postgresql://user:password@host:5432/donafy\nNODE_ENV=production\n\nNEXTAUTH_URL=https://donafy.vercel.app\nNEXTAUTH_SECRET=<change-to-random-string>\n\nAPI_URL=https://api.donafy.com\n\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=\nNEXT_PUBLIC_WOMPI_PUBLIC_KEY=\nWOMPI_PRIVATE_KEY=`,
  '.env.example': `DATABASE_PROVIDER=sqlite\nDATABASE_URL=file:./dev.db\nNODE_ENV=development\n\nNEXTAUTH_URL=http://localhost:3000\nNEXTAUTH_SECRET=change-me\n\nAPI_URL=http://localhost:3000/api\n\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=\nNEXT_PUBLIC_WOMPI_PUBLIC_KEY=\nWOMPI_PRIVATE_KEY=`,
};

for (const [fileName, content] of Object.entries(envFiles)) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
}

const schemaPath = path.join(rootDir, 'prisma', 'schema.prisma');
const schema = fs.readFileSync(schemaPath, 'utf8');
const updatedSchema = schema.replace(
  /datasource db \{[\s\S]*?\}/,
  `datasource db {\n  provider = "${provider}"\n  url      = "file:./dev.db"\n}`
);

fs.writeFileSync(schemaPath, updatedSchema);
console.log(`✓ Prisma schema configured for ${provider}`);