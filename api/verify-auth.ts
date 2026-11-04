import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {}
    } else if (!body) {
      // Read stream if body parser did not run
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const dataStr = Buffer.concat(buffers).toString();
      if (dataStr) {
        body = JSON.parse(dataStr);
      }
    }

    const { answer1, birthdate } = body || {};

    const cleanAns1 = String(answer1 || '').trim().toLowerCase();
    const isAns1Valid = cleanAns1 === 'amriiiiinnnnn';

    const cleanDate = String(birthdate || '').trim().toLowerCase();
    let isDateValid = cleanDate === '2002-08-29';

    if (!isDateValid) {
      const parts = cleanDate.split(/[-/.]/);
      if (parts.length === 3 && parts[2] === '2002') {
        const p0 = parts[0].padStart(2, '0');
        const p1 = parts[1].padStart(2, '0');
        if ((p0 === '08' && p1 === '29') || (p0 === '29' && p1 === '08')) {
          isDateValid = true;
        }
      }
    }

    res.setHeader('Content-Type', 'application/json');

    if (isAns1Valid && isDateValid) {
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, token: 'auth_verified' }));
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ success: false, message: 'Sorry, you are not allowed. This is confidential 🔒🚫' }));
    }
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Sorry, you are not allowed. This is confidential 🔒🚫' }));
  }
}
