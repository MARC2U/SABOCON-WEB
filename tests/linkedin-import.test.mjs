import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePost } from '../src/lib/import-linkedin.ts';
import { matchesSecret } from '../src/lib/secret.ts';
const input={id:'urn:li:share:123',text:'Hello SABOCON\n\nSecond paragraph',language:'en',publishedAt:'2026-10-01T12:00:00Z',url:'https://www.linkedin.com/feed/update/urn:li:share:123'};
test('stable source identity prevents duplicate IDs despite edited text',()=>{assert.equal(normalizePost(input)._id,normalizePost({...input,text:'Edited'})._id);assert.notEqual(normalizePost(input)._id,normalizePost({...input,id:'other'})._id)});
test('plain text remains text and original language is preserved',()=>{const p=normalizePost({...input,text:'<script>example</script>\n\nSecond'});assert.equal(p.body.en[0].children[0].text,'<script>example</script>');assert.equal(p.body.en.length,2);assert.equal(p.body.de,undefined)});
test('reject invalid dates, languages, source hosts and empty text',()=>{for(const changed of [{publishedAt:'bad'},{language:'es'},{url:'https://linkedin.com.attacker.example/post'},{url:'http://linkedin.com/post'},{text:' '}])assert.throws(()=>normalizePost({...input,...changed}))});
test('disabled or incorrect secrets are rejected',()=>{assert.equal(matchesSecret(null,undefined),false);assert.equal(matchesSecret('wrong','right'),false);assert.equal(matchesSecret('right','right'),true)});

test('French import preserves French content',()=>{const p=normalizePost({...input,language:'fr',text:'Bonjour SABOCON'});assert.equal(p.body.fr[0].children[0].text,'Bonjour SABOCON');assert.equal(p.body.en,undefined)});
