const { ObjectId } = require('mongodb');

module.exports = { handleRequest };

const { readFileSync, promises: { readFile } } = require('fs');
const { buildRows } = require('../ssr/build-rows.js');

const styles = readFileSync('./ssr/style.css', 'utf8');
const script = readFileSync('./public/app.js', 'utf8');

async function handleRequest(request, response) {
  if (request.url === '/') {
    const students = await client.db('students').collection('students').find().toArray();

    const html = readFileSync('./ssr/index.html', 'utf8').replace(`<style></style>`, `<style>${ styles }</style>`).replace(`<script></script>`, `<script type="module">${ script }</script>`);

    response.end(html.replace(`<tbody></tbody>`, `<tbody>${ buildRows(students) }</tbody>`));
  } else if (request.url === '/favicon.ico') {
    response.end();
  } else if (request.url.startsWith('/api/')) {
    handleApi(request, response);
  } else {
    const path = `./public${ request.url }`;
    try {
      const content = await readFile(path);
      if (path.endsWith('.js')) {
        response.setHeader('Content-Type', 'application/javascript');
      }
      response.end(content);
    } catch {
      response.statusCode = 404;
      response.end('File not found ' + path);
    }
  }
}

function handleApi(request, response) {
  const { method, url } = request;
  const route = url.slice(5);
  const chunks = [];

  request.on('data', (chunk) => {
    chunks.push(chunk);
  }).on('end', async () => {
    const body = Buffer.concat(chunks).toString();
    const data = JSON.parse(body);

    if (method === 'POST' && route === 'student') {
      const student = data;
      await client.db('students').collection('students').insertOne(student);

      const studentId = student._id.toString();

      response.end(JSON.stringify({ studentId }));
    } else if (method === 'DELETE' && route === 'student') {

      const { studentId } = data;
      await client.db('students').collection('students').deleteOne({ _id: new ObjectId(studentId) });

      response.end();
    } else if (method === 'PUT' && route === 'student') {

      const { studentId, name, age } = data;
      await client.db('students').collection('students').updateOne({ _id: new ObjectId(studentId) }, { $set: { name, age } });

      response.end(JSON.stringify({ studentId }));
    }
  });
}
