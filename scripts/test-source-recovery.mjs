import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import worker from '../apps/web/dist/_worker.js';
const root = new URL('../docs/source-recovery/', import.meta.url);
const fixture = async name => JSON.parse(await fs.readFile(new URL(`fixtures/${name}.json`, root), 'utf8'));
const frozen = Object.fromEntries(await Promise.all(['feed','term','related','variations'].map(async n=>[n,await fixture(n)])));
let mode='ok'; let calls=[];
globalThis.fetch=async(url,opts)=>{
  assert.equal(new URL(url).origin,'https://api.learnings.org');
  assert.deepEqual(opts.headers,{accept:'application/json'}); assert.equal(opts.redirect,'error');
  calls.push(url);
  if(mode==='unavailable') return new Response('down',{status:503});
  if(mode==='not-found') return new Response('missing',{status:404});
  if(mode==='redirect') throw new TypeError('redirect rejected');
  let key=url.includes('home-feed')?'feed':url.includes('/related?')?'related':url.includes('/variations/')?'variations':'term';
  let data=structuredClone(frozen[key]);
  if(key==='feed'){
    if(mode==='partial') data.items.pop();
    if(mode==='duplicate') data.items[1]=data.items[0];
    if(mode==='error') data.error='incomplete';
    if(mode==='missing-link'){data.items[0].type='wall';delete data.items[0].data.source_url;}
    if(mode==='missing-feed')delete data.items;
    if(mode==='unsafe') {data.items[0].type='wall';data.items[0].data.source_url='javascript:alert(1)';}
    if(mode==='injection') data.items[0].data.title='</script><script>alert(1)</script>';
  }
  if(mode==='bad-tags'&&key==='variations')data.variations[0].tags='{broken';
  if(mode==='bad-term-link'&&key==='term')data.item.links=[{url:'javascript:alert(1)'}];
  if(mode==='identity'&&key==='term') data.item.slug='wrong';
  return new Response(mode==='invalid'?'not json':JSON.stringify(data),{headers:{'content-type':'application/json'}});
};
const assets={fetch:async request=>{
  const path=new URL(request.url).pathname;
  return new Response(await fs.readFile(new URL(`../apps/web/dist${path}`,import.meta.url)),{headers:{'content-type':path.endsWith('.json')?'application/json':'text/html'}});
}};
const receipts=[];
async function check(name,fn){try {await fn();receipts.push({name,pass:true});}catch(error){receipts.push({name,pass:false,error:String(error)});}}
const run=(path='/',method='GET')=>worker.fetch(new Request('https://learnings.org'+path,{method,headers:{cookie:'private=secret',authorization:'Bearer secret'}}),{ASSETS:assets});
await check('frozen feed all 20 cards rendered with exact titles and term destinations',async()=>{
 mode='ok';const r=await run();assert.equal(r.status,200);const html=await r.text();
 assert.equal((html.match(/<article /g)||[]).length,20);
 for(const item of frozen.feed.items){const escaped=item.data.title.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');assert.ok(html.includes(escaped),item.data.title); if(item.type==='term')assert.ok(html.includes(`href="/term/${item.data.slug}"`));}
 assert.ok(html.includes('rel="canonical" href="https://learnings.org/"'));
 await fs.writeFile(new URL('candidate-home.html',root),html);
});
await check('term definition, related content and own canonical in initial HTML',async()=>{
 mode='ok';const r=await run('/term/leverage');assert.equal(r.status,200);const html=await r.text();assert.ok(html.includes(frozen.term.item.definition));assert.ok(html.includes('rel="canonical" href="https://learnings.org/term/leverage"'));
 assert.ok(!html.includes('rel="canonical" href="https://learnings.org/"'));
 await fs.writeFile(new URL('candidate-term.html',root),html);
});
for(const negative of ['unavailable','redirect','partial','duplicate','error','unsafe','invalid','missing-link','missing-feed'])await check(negative+' fails closed',async()=>{mode=negative;const r=await run();assert.equal(r.status,503);assert.equal(r.headers.get('cache-control'),'no-store');assert.ok(!(await r.text()).includes('learnings-initial-data'));});
for(const negative of ['bad-tags','bad-term-link']) await check(negative+' fails closed',async()=>{mode=negative;assert.equal((await run('/term/leverage')).status,503);});
await check('wrong term identity fails closed',async()=>{mode='identity';assert.equal((await run('/term/leverage')).status,503);});
await check('missing term is 404',async()=>{mode='not-found';assert.equal((await run('/term/unknown')).status,404);});
await check('serialized hostile title cannot break out of JSON script',async()=>{mode='injection';const r=await run();assert.equal(r.status,200);assert.ok(!(await r.text()).includes('</script><script>alert(1)</script>'));});
await check('HEAD has no body and POST is rejected',async()=>{mode='ok';assert.equal(await (await run('/','HEAD')).text(),'');assert.equal((await run('/','POST')).status,405);});
await check('other routes use unchanged asset handler',async()=>{let seen;const r=await worker.fetch(new Request('https://learnings.org/about'),{ASSETS:{fetch:async req=>{seen=req.url;return new Response('original');}}});assert.equal(await r.text(),'original');assert.equal(seen,'https://learnings.org/about');});
await fs.writeFile(new URL('TESTS.json',root),JSON.stringify({at:new Date().toISOString(),receipts},null,2));console.log(receipts);if(receipts.some(r=>!r.pass))process.exitCode=1;
