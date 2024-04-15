import http from 'http';

const server = http.createServer((req, res) => {
    console.log('Se recibió una solicitud');
    res.end('Este es el mensaje de respuesta nuevo');
});

server.listen(8080, () => {
    console.log('Servidor activo en puerto 8080');
});