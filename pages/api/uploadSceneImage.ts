import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const PUBLIC_IMAGE_DIR = path.join(process.cwd(), 'public', 'scene-images');
const SCENES_FILE = path.join(process.cwd(), 'lib', 'scenes.ts');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!fs.existsSync(PUBLIC_IMAGE_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGE_DIR, { recursive: true });
  }

  const form = formidable({ multiples: false, uploadDir: PUBLIC_IMAGE_DIR, keepExtensions: true });

  form.parse(req, (err: unknown, fields: formidable.Fields, files: formidable.Files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form' });
    }

    const sceneId = fields.sceneId as string;
    const file = files.image as File;

    if (!sceneId || !file) {
      return res.status(400).json({ error: 'Missing sceneId or image' });
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

    return res.status(200).json({ imageUrl });
  });
}
