import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Backend Authentication API:
  // Answers are kept strictly secure on the server, never exposed in client bundles or placeholders
  app.post('/api/verify-auth', (req, res) => {
    try {
      const { answer1, birthdate } = req.body || {};

      if (!answer1 || !birthdate) {
        return res.status(400).json({
          success: false,
          message: 'Sorry, you are not allowed. This is confidential 🔒🚫',
        });
      }

      // Check Question 1: "amriiiiinnnnn" (a m r + 5 i's + 5 n's)
      const cleanAns1 = String(answer1).trim().toLowerCase();
      const isAns1Valid = cleanAns1 === 'amriiiiinnnnn';

      // Check Question 2: Birthdate - 29th August 2002
      // HTML date input sends "YYYY-MM-DD" e.g. "2002-08-29"
      const cleanDate = String(birthdate).trim().toLowerCase();
      let isDateValid = false;

      if (cleanDate === '2002-08-29') {
        isDateValid = true;
      } else {
        // Also support flexible parsing just in case
        const parsed = new Date(cleanDate);
        if (!isNaN(parsed.getTime())) {
          const y = parsed.getUTCFullYear();
          const m = parsed.getUTCMonth(); // 7 is August (0-indexed)
          const d = parsed.getUTCDate();
          if (y === 2002 && m === 7 && d === 29) {
            isDateValid = true;
          }
        }
      }

      if (isAns1Valid && isDateValid) {
        const sessionToken = crypto.randomBytes(32).toString('hex');
        return res.json({
          success: true,
          token: sessionToken,
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Sorry, you are not allowed. This is confidential 🔒🚫',
      });
    } catch (err) {
      console.error('Auth verification error:', err);
      return res.status(500).json({
        success: false,
        message: 'Sorry, you are not allowed. This is confidential 🔒🚫',
      });
    }
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
