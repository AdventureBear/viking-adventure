import { NextResponse } from 'next/server';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export const dynamic = 'force-dynamic';

const PUBLIC_IMAGE_DIR = path.join(process.cwd(), 'public', 'scene-images');
const SCENES_FILE = path.join(process.cwd(), 'lib', 'scenes.ts');

function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

async function parseForm(request: Request): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const buffer = Buffer.from(await request.arrayBuffer());
  const stream = bufferToStream(buffer);

  // Extract headers from the Next.js Request
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, uploadDir: PUBLIC_IMAGE_DIR, keepExtensions: true });
    form.parse(
      // @ts-ignore
      { ...stream, headers },
      (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      }
    );
  });
}

export async function POST(request: Request) {
  if (!fs.existsSync(PUBLIC_IMAGE_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGE_DIR, { recursive: true });
  }

  const { fields, files } = await parseForm(request);

  const sceneId = fields.sceneId as string;
  const file = files.image as File;

  if (!sceneId || !file) {
    return NextResponse.json({ error: 'Missing sceneId or image' }, { status: 400 });
  }

  const ext = path.extname(file.originalFilename || file.newFilename);
  const fileName = `${sceneId}-${Date.now()}${ext}`;
  const destPath = path.join(PUBLIC_IMAGE_DIR, fileName);
  fs.renameSync(file.filepath, destPath);

  const imageUrl = `/scene-images/${fileName}`;

  let scenesSrc = fs.readFileSync(SCENES_FILE, 'utf-8');
  const sceneRegex = new RegExp(`(id:\\s*['"\`]${sceneId}['"\`][\\s\\S]*?)(imageUrl:\\s*['"\`][^'"\`]*['"\`]\\s*,?)?([\\s\\S]*?choices:)`, 'm');
  scenesSrc = scenesSrc.replace(sceneRegex, (match, before, imageLine, after) => {
    const newImageLine = `imageUrl: '${imageUrl}',\n    `;
    if (imageLine) {
      return before + newImageLine + after;
    } else {
      return before + newImageLine + after;
    }
  });
  fs.writeFileSync(SCENES_FILE, scenesSrc, 'utf-8');

  return NextResponse.json({ imageUrl });
}