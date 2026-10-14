import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const dist=path.resolve('apps/web/dist');
http.createServer(async(req,res)=>{
 try{
 const pathname=new URL(req.url,'http://localhost').pathname;
 let file=pathname==='/'?'docs/source-recovery/candidate-home.html':pathname==='/term/leverage'?'docs/source-recovery/candidate-term.html':path.join(dist,pathname);
 if(!file.startsWith(dist)&&!file.startsWith('docs/source-recovery/'))throw Error();
 const data=await fs.readFile(file);const ext=path.extname(file);
 res.writeHead(200,{'content-type':({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'})[ext]||'application/octet-stream', 'content-security-policy':"connect-src 'none'; script-src 'self'; img-src 'self' data:;"});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(8894,'127.0.0.1',()=>console.log('Frozen SSR preview http://127.0.0.1:8894 (external network blocked)'));
