/** Tests the self-contained downloader without npm dependencies or a browser. */
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
const js = readFileSync(new URL('../public/assets/german/pdf-downloads.js',import.meta.url),'utf8');
const listeners = {};
const state = {status:'',cancelHidden:true,disabled:false,downloadFilename:''};
const blobUrls=[];
const item={querySelector(query){return query==='[data-pdf-status]'?status:query==='[data-pdf-cancel]'?cancel:null;}};
const status={set textContent(value){state.status=value;},get textContent(){return state.status;}};
const cancel={closest(){return item;},set hidden(value){state.cancelHidden=value;}};
const link={href:'https://ramzunalanguages.org/resources/pdfs/german-lesson-6-study-sheet.pdf',
 closest(selector){return selector==='[data-pdf-resource]'?item:null;},
 getAttribute(name){return name==='download'?'german-lesson-6-study-sheet.pdf':null;},
 setAttribute(name,value){if(name==='aria-disabled')state.disabled=value==='true';},
 removeAttribute(name){if(name==='aria-disabled')state.disabled=false;}};
const document={addEventListener(type,cb){(listeners[type]??=[]).push(cb);},createElement(){return {style:{},set download(name){state.downloadFilename=name;},click(){state.downloadClicked=true;},remove(){}};},body:{append(){}}};
const nativeURL=class extends URL{};
nativeURL.createObjectURL=blob=>{const url='blob:local-test';blobUrls.push(blob);return url;};
nativeURL.revokeObjectURL=()=>{};
const nativeFetch=async (url,opts)=>new Response(new Uint8Array([37,80,68,70,45,49,46,52,10,37,37,69,79,70]),{headers:{'Content-Type':'application/pdf','Content-Length':'14'}});
const context={document,location:{origin:'https://ramzunalanguages.org'},URL:nativeURL,window:{fetch:nativeFetch,AbortController,URL:nativeURL},
 fetch:nativeFetch,AbortController,Blob,Response,setTimeout(fn){ /* no need to wait for revoke */ }};
runInNewContext(js,context);
assert.equal(listeners.click.length,2);
const click={target:{closest(sel){return sel==='a[data-async-pdf]'?link:null;}},defaultPrevented:false,button:0,metaKey:false,ctrlKey:false,shiftKey:false,altKey:false,preventDefault(){this.defaultPrevented=true;}};
await listeners.click[0](click);
assert.equal(click.defaultPrevented,true);
assert.equal(state.downloadFilename,'german-lesson-6-study-sheet.pdf');
assert.equal(state.downloadClicked,true);
assert.match(state.status,/download has started/);
assert.equal(blobUrls[0].type,'application/pdf');
assert.equal(state.cancelHidden,true);
assert.equal(state.disabled,false);
console.log('Asynchronous PDF download JS: success-path test passed.');
