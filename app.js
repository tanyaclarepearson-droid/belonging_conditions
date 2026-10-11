const STORAGE_KEY='songbridgeBelongingArchiveV02';
const DRAFT_KEY='songbridgeBelongingDraftV01';
const SONG_LIBRARY=window.SONG_LIBRARY||{};

const contextOptions=['One learner','Partners or small group','Whole class','Adult or learning team','Another context'];
const signalData=[
  {name:'Peer invitation',description:'People make room for one another.'},
  {name:'Voice enters',description:'More people contribute or make thinking visible.'},
  {name:'Language inclusion',description:'Home languages and varied expression are welcomed.'},
  {name:'Shared ease',description:'Relaxed participation and unguarded presence appear.'},
  {name:'Risk-taking',description:'Someone tries, wonders, or disagrees without certainty.'},
  {name:'Recognition',description:'Names, strengths, histories, or growth are remembered.'},
  {name:'Contribution',description:'People experience themselves as useful to the group.'},
  {name:'Withdrawal / edge',description:'Someone remains peripheral, guarded, or hard to enter.'}
];
const signalNames=signalData.map(signal=>signal.name);
const stateOptions=['Strengthening','Uneven','Fragile','Unclear'];
const categories=[
  {id:'all',label:'All moves'},
  {id:'relationship',label:'Relationship'},
  {id:'participation',label:'Participation'},
  {id:'identity',label:'Identity & language'},
  {id:'environment',label:'Environment'},
  {id:'music',label:'Music'}
];
const categoryLabels={relationship:'Relationship',participation:'Participation',identity:'Identity & language',environment:'Environment',music:'Music',custom:'Field-created'};

const moves=[
  {title:'I Am Me',kind:'Song',cat:'music',songKey:'iAmMe',audio:'audio/i-am-me.mp3',listenFor:'Listen for the places where identity is affirmed without requiring sameness—and for forms of participation that feel available beyond singing aloud.',why:'Reinforce identity and the felt sense that belonging does not require becoming someone else.',how:'Use the song before a shared transition or reflection, then invite one line, gesture, or quiet connection that feels personally true.',guard:'Participation can be listening; no one has to perform identity publicly.',watch:'Notice whether self-expression, ease, or recognition travels beyond the song.'},
  {title:'Every Voice Belongs',kind:'Song',cat:'music',songKey:'everyVoice',audio:'audio/every-voice-belongs.mp3',listenFor:'Listen for the many ways a voice can enter—not only through singing—and for moments when difference becomes part of the shared sound rather than something to smooth away.',why:'Widen the doorway for language, expression, and participation.',how:'Offer several ways to join—voice, rhythm, movement, signing, drawing, or listening—and make each form visibly legitimate.',guard:'Do not treat audible singing as the measure of belonging.',watch:'Notice who enters, how they enter, and whether peers begin inviting one another.'},
  {title:'Brighter Than Before',kind:'Song',cat:'music',songKey:'brighter',audio:'audio/brighter-than-before.mp3',listenFor:'Listen for how ordinary places become gathering places—and how hope and joy travel through contribution rather than individual optimism alone.',why:'Invite a shared sense that hope, joy, and possibility can be carried and enlarged through community.',how:'Listen before a community-building moment, shared project, or reflection; invite people to notice one image or possibility they want to help make more real.',guard:'Do not use hope to skip over grief, conflict, exclusion, or material barriers; let brightness coexist with what still needs tending.',watch:'Notice whether people name collective possibilities, recognize one another’s contributions, or initiate something that extends beyond the song.'},
  {title:'Witnessing',kind:'Practice',cat:'relationship',why:'Reflect emerging strengths back honestly without putting someone on display.',how:'Name one specific act, contribution, or change you observed and the difference it made.',guard:'Keep recognition accurate, proportionate, and free from comparison.',watch:'Notice whether the person takes another risk or begins recognizing others.'},
  {title:'Name & Story Invitation',kind:'Connection',cat:'identity',why:'Make room for names, languages, histories, interests, and family knowledge.',how:'Create an optional invitation that lets people offer the part of a name or story they want others to know.',guard:'Never require disclosure or ask someone to represent a culture or group.',watch:'Notice what people choose to share and what peers remember later.'},
  {title:'Specific Welcome',kind:'Relationship',cat:'relationship',why:'Communicate that a person’s arrival was noticed rather than merely permitted.',how:'Greet the person by name and connect their arrival to something real: a remembered interest, role, question, or contribution.',guard:'Keep welcome genuine; scripted intensity can create exposure rather than ease.',watch:'Notice changes in entry, orientation, eye contact, or readiness to join.'},
  {title:'Peer Invitation',kind:'Relationship',cat:'relationship',why:'Create a field in which participants invite one another rather than relying only on the adult.',how:'Give peers a simple, authentic way to make room: ask, orient, share materials, or bring another idea into the exchange.',guard:'Do not assign one learner permanent responsibility for another’s inclusion.',watch:'Notice whether invitations spread and whether they are received as genuine.'},
  {title:'Notice a Contribution',kind:'Recognition',cat:'relationship',why:'Make visible how a specific contribution mattered to shared work.',how:'Name what was contributed, what it changed, and where it now lives in the group’s thinking or product.',guard:'Recognize impact without ranking people or praising compliance.',watch:'Notice whether contributions become more frequent, varied, or self-initiated.'},
  {title:'Repair & Re-entry',kind:'Return',cat:'relationship',why:'Make it possible to return after conflict, rupture, absence, or a difficult moment without carrying a permanent label.',how:'Offer a clear path back: acknowledge what happened, name what is needed now, and reopen a meaningful role or connection.',guard:'Repair should not demand public apology, premature closeness, or erased accountability.',watch:'Notice whether re-entry becomes real in peer response, access, and participation.'},
  {title:'Multiple Ways In',kind:'Participation',cat:'participation',why:'Reduce the chance that one dominant form of participation defines who belongs.',how:'Offer speaking, writing, drawing, movement, partner, and quiet-entry options that can all shape the work.',guard:'Do not quietly privilege the most conventional option in evaluation or attention.',watch:'Notice which pathways people choose and whether they shift with growing ease.'},
  {title:'Low-risk First Turn',kind:'Participation',cat:'participation',why:'Lower the threshold for an early contribution before asking for public risk.',how:'Begin with a brief pair exchange, annotation, private rehearsal, or one-word contribution that carries forward.',guard:'Low-risk should still be meaningful—not a disposable warm-up.',watch:'Notice whether early entry changes participation later in the gathering.'},
  {title:'Choice With Meaning',kind:'Agency',cat:'participation',why:'Offer a real choice that changes how someone participates or contributes.',how:'Name two or three viable routes, roles, sequences, or products and clarify what remains fixed.',guard:'Avoid pseudo-choice or making one option visibly more valued.',watch:'Notice ownership, persistence, and whether less permission is needed next time.'},
  {title:'Make Space Before Filling It',kind:'Pause',cat:'participation',why:'Allow enough time for faster voices and adult speed to stop defining the whole field.',how:'Choose one recurring moment to pause, silently count, and let another contribution form before prompting or solving.',guard:'Silence must remain supported rather than becoming a test or withdrawal of care.',watch:'Notice what emerges, who enters, and who may need another access route.'},
  {title:'Home Language Welcome',kind:'Identity & language',cat:'identity',why:'Position home languages as resources for thinking, connection, and expression.',how:'Invite people to think, annotate, rehearse, translate, or contribute in a language that supports meaning.',guard:'Do not require translation labor or public language performance from multilingual participants.',watch:'Notice changes in complexity, confidence, connection, and peer curiosity.'},
  {title:'Identity in the Materials',kind:'Identity & language',cat:'identity',why:'Increase the chance that people encounter lives, languages, and experiences that resonate with their own.',how:'Review one text, example, image, name, or case and add or change something that widens who can recognize themselves.',guard:'Avoid token examples, stereotypes, or presenting one story as representative.',watch:'Notice who leans in, makes connections, questions, or contributes new knowledge.'},
  {title:'Pronounce & Remember',kind:'Identity & language',cat:'identity',why:'Treat names as meaningful identity rather than administrative labels.',how:'Ask, listen, practice, record a helpful cue with permission, and repair mistakes without making the person manage your discomfort.',guard:'Accuracy matters, but do not turn a name into a public lesson or spectacle.',watch:'Notice whether names are used more confidently and respectfully across the group.'},
  {title:'Shared Knowledge Invitation',kind:'Identity & language',cat:'identity',why:'Invite knowledge from family, culture, interests, neighborhood, and lived experience into the work.',how:'Ask a question with multiple legitimate sources of knowing and let contributed knowledge alter the next step.',guard:'Do not require personal disclosure or treat lived experience as less rigorous evidence.',watch:'Notice whose knowledge changes the discussion, product, or direction.'},
  {title:'Reconfigure the Space',kind:'Environment',cat:'environment',why:'Change seating, grouping, or physical distance when the current arrangement creates edges.',how:'Adjust one feature—proximity, sight line, group size, mobility, sensory load—and say that the arrangement is revisable.',guard:'Do not isolate someone under the language of support or belonging.',watch:'Notice entry, interaction, attention, and whether the edge moves or softens.'},
  {title:'Visible Invitation',kind:'Environment',cat:'environment',why:'Use the room, materials, and entry experience to signal who and what is welcome.',how:'Choose one threshold—doorway, opening slide, materials, wall, or first instruction—and make the invitation concrete and usable.',guard:'Representation without access, voice, or consequence can become decorative.',watch:'Notice what people approach, use, mention, or help reshape.'},
  {title:'Small-group Bridge',kind:'Environment',cat:'environment',why:'Use a smaller social field when whole-group participation carries too much exposure.',how:'Let a pair or small group develop something that can later travel into the larger space with permission.',guard:'A bridge should widen access, not permanently separate people from the shared field.',watch:'Notice whether ideas, confidence, or relationships cross into the larger group.'},
  {title:'Shared Making',kind:'Environment',cat:'environment',why:'Allow connection to grow alongside purposeful activity rather than requiring intimacy first.',how:'Create a consequential object, display, solution, performance, or resource that needs varied contributions.',guard:'Protect against one person controlling the meaningful work while others receive peripheral tasks.',watch:'Notice interdependence, spontaneous exchange, and whose contribution leaves a visible trace.'}
];

const defaults={context:'',signals:[],note:'',interpretation:'',hypothesis:'',practice:'',practiceCategory:'',practiceWhy:'',adaptation:'',returnWhen:'Tomorrow',lookFor:'Who enters participation more easily',goal:'',frequency:'Daily',customFrequency:'',timeframe:'3',checkInDate:'',guardrail:'',entryId:'',created:'',lastStep:'notice'};
const state={...defaults,signals:[]};
let activeFilter='all';
let currentPractice=null;
let currentSongKey='';
let activeProjectionKey='';
let lyricFrameId=0;
let activeLyricLineIndex=-1;

const $=id=>document.getElementById(id);
const escapeHtml=(value='')=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

function categoryIcon(id){
  const icons={
    all:'<svg viewBox="0 0 48 48"><circle cx="15" cy="17" r="5"/><circle cx="33" cy="14" r="5"/><circle cx="28" cy="34" r="5"/><path d="m19 17 9-2M18 21l7 9M32 19l-3 10"/></svg>',
    relationship:'<svg viewBox="0 0 48 48"><path d="M6 29c7-12 14-12 21 0s14 12 17 0M6 19c7 12 14 12 21 0s14-12 17 0"/><circle cx="25" cy="24" r="3"/></svg>',
    participation:'<svg viewBox="0 0 48 48"><path d="M7 37V12M7 24h27"/><path d="m28 16 8 8-8 8"/><circle cx="41" cy="24" r="3"/></svg>',
    identity:'<svg viewBox="0 0 48 48"><path d="M9 38c2-17 9-28 15-28s13 11 15 28"/><path d="M15 34c1-10 5-17 9-17s8 7 9 17"/><circle cx="24" cy="9" r="3"/></svg>',
    environment:'<svg viewBox="0 0 48 48"><path d="M7 38V13l17-7 17 7v25"/><path d="M14 38V20h20v18M24 20v18M14 29h20"/></svg>',
    music:'<svg viewBox="0 0 48 48"><path d="M19 35V11l20-4v24M19 17l20-4"/><circle cx="13" cy="36" r="6"/><circle cx="33" cy="32" r="6"/></svg>',
    custom:'<svg viewBox="0 0 48 48"><path d="M8 35c7-20 18-25 31-18"/><path d="m33 10 7 7-8 5M10 40c9-6 19-7 29-3"/></svg>'
  };
  return icons[id]||icons.custom;
}

function makeChoice(container,group,value,type){
  const label=document.createElement('label');label.className='choice-option';
  const input=document.createElement('input');input.type=type;input.name=group;input.value=value;
  const text=document.createElement('span');text.textContent=value;
  label.append(input,text);container.append(label);return input;
}

function renderChoices(){
  contextOptions.forEach(value=>{
    const input=makeChoice($('contexts'),'context',value,'radio');
    input.addEventListener('change',()=>{
      const other=value==='Another context';$('otherContext').hidden=!other;
      state.context=other?($('otherContext').value.trim()||value):value;
      if(other)$('otherContext').focus();saveDraft();
    });
  });
  signalData.forEach((signal,index)=>{
    const button=document.createElement('button');button.type='button';button.className='signal';button.dataset.i=index;button.setAttribute('aria-pressed','false');
    button.innerHTML=`<i class="signal-node" aria-hidden="true"></i><b>${escapeHtml(signal.name)}</b><span class="signal-description">${escapeHtml(signal.description)}</span>`;
    button.addEventListener('click',()=>{
      const on=button.classList.toggle('on');button.setAttribute('aria-pressed',String(on));
      state.signals=[...document.querySelectorAll('.signal.on')].map(item=>signalNames[Number(item.dataset.i)]);updateField();saveDraft();
    });
    $('signals').append(button);
  });
  stateOptions.forEach(value=>{
    const input=makeChoice($('states'),'interpretation',value,'radio');
    input.addEventListener('change',()=>{state.interpretation=value;saveDraft();});
  });
}

function renderFilters(){
  categories.forEach(category=>{
    const button=document.createElement('button');button.type='button';button.className=`move-filter${category.id==='all'?' on':''}`;button.dataset.filter=category.id;
    button.innerHTML=`<span class="filter-symbol" aria-hidden="true">${categoryIcon(category.id)}</span>${escapeHtml(category.label)}`;
    button.addEventListener('click',()=>{activeFilter=category.id;document.querySelectorAll('.move-filter').forEach(item=>item.classList.toggle('on',item===button));renderMoves();});
    $('moveFilters').append(button);
  });
}

function renderMoves(){
  const container=$('practiceGrid');container.replaceChildren();
  moves.filter(move=>activeFilter==='all'||move.cat===activeFilter).forEach(move=>{
    const card=document.createElement('article');card.className='practice-card';
    card.innerHTML=`<div class="practice-topline"><span class="category-symbol" aria-hidden="true">${categoryIcon(move.cat)}</span><span class="practice-kind">${escapeHtml(move.kind)}</span></div><h3>${escapeHtml(move.title)}</h3>${move.audio?'<span class="audio-pill"><span aria-hidden="true">▶</span> Recording included</span>':''}<p>${escapeHtml(move.why)}</p>`;
    const button=document.createElement('button');button.type='button';button.className='secondary-button compact-button';button.textContent='Explore →';button.addEventListener('click',()=>openPractice(move));
    card.append(button);container.append(card);
  });
}

function stopAudio(){
  const audio=$('songAudio');if(!audio)return;audio.pause();audio.removeAttribute('src');audio.load();$('songExperience').hidden=true;currentSongKey='';
}

function stopCompassAudio(){
  const audio=$('compassAudio');if(audio)audio.pause();
}

function renderSongUses(song){
  const container=$('songUses');container.replaceChildren();
  song.uses.forEach(([title,description])=>{
    const card=document.createElement('article');const heading=document.createElement('strong');const copy=document.createElement('span');
    heading.textContent=title;copy.textContent=description;card.append(heading,copy);container.append(card);
  });
}

function configurePracticeSong(songKey){
  const song=SONG_LIBRARY[songKey];if(!song)return;
  currentSongKey=songKey;$('songTitle').textContent=song.title;$('listenFor').textContent=currentPractice?.listenFor||song.invitation;
  $('songTrackTitle').textContent=song.title;$('songTrackNote').textContent=song.note;$('songAudio').src=song.audio;$('songAudio').load();
  $('downloadPracticeSong').href=song.audio;$('downloadPracticeLyrics').href=song.sheet;$('downloadPracticeGuide').href=song.guide;$('songNoticePrompt').textContent=song.notice;renderSongUses(song);$('songExperience').hidden=false;
}

function activeProjectionAudio(){return activeProjectionKey==='compass'?$('compassAudio'):$('songAudio');}

function makeLyricLine(line){
  const row=document.createElement('span');
  if(!line){row.setAttribute('aria-hidden','true');row.innerHTML='&nbsp;';}
  else{row.textContent=line;if(/^(Leader:|All:)/.test(line))row.classList.add('role');if(/^All together:/.test(line))row.classList.add('together');}
  return row;
}

function renderLyricsFlow(){
  const song=SONG_LIBRARY[activeProjectionKey];if(!song)return;
  const container=$('lyricsFlow');container.replaceChildren();
  const track=document.createElement('div');track.className='lyrics-flow-track';
  song.sections.forEach(([section,lines])=>{
    const block=document.createElement('section');block.className='lyrics-flow-section';
    const label=document.createElement('p');label.className='lyrics-section';label.textContent=section.toUpperCase();
    const copy=document.createElement('div');copy.className='lyrics-flow-lines';lines.forEach(line=>copy.append(makeLyricLine(line)));
    block.append(label,copy);track.append(block);
  });
  container.append(track);
}

function updateLyricWindowStatus(){
  const audio=activeProjectionAudio();
  let message='Ready — scroll to preview, or play to follow the song.';
  if(audio?.ended)message='Song complete — scroll freely and linger with any line.';
  else if(audio&&!audio.paused)message='Playing — lyrics advance gently with each phrase.';
  else if(audio?.currentTime>0)message='Paused — scroll to preview or revisit a line.';
  $('lyricsWindowStatus').textContent=message;
}

function syncLyricProgress(forceScroll=false){
  const audio=activeProjectionAudio();if(!audio)return;
  const song=SONG_LIBRARY[activeProjectionKey];const duration=Number.isFinite(audio.duration)?audio.duration:0;const current=Number.isFinite(audio.currentTime)?audio.currentTime:0;
  if((audio.paused&&!forceScroll)||!song||!duration)return;
  const lines=[...$('lyricsFlow').querySelectorAll('.lyrics-flow-lines span:not([aria-hidden="true"])')];if(!lines.length)return;
  const start=Math.max(0,Number(song.lyricsStart)||0);const end=Math.min(duration,Number(song.lyricsEnd)||duration);const progress=Math.min(1,Math.max(0,(current-start)/Math.max(1,end-start)));
  const lineIndex=Math.min(lines.length-1,Math.floor(progress*lines.length));
  if(!forceScroll&&lineIndex===activeLyricLineIndex)return;
  activeLyricLineIndex=lineIndex;
  const flow=$('lyricsFlow');const line=lines[lineIndex];const target=Math.max(0,Math.min(flow.scrollHeight-flow.clientHeight,line.offsetTop+(line.offsetHeight/2)-(flow.clientHeight*.46)));
  if(forceScroll||window.matchMedia('(prefers-reduced-motion: reduce)').matches)flow.scrollTop=target;
  else flow.scrollTo({top:target,behavior:'smooth'});
}

function stopLyricAnimation(){if(lyricFrameId){cancelAnimationFrame(lyricFrameId);lyricFrameId=0;}}

function startLyricAnimation(){
  stopLyricAnimation();
  const tick=()=>{const audio=activeProjectionAudio();syncLyricProgress();if(audio&&!audio.paused&&$('lyricsDialog').open)lyricFrameId=requestAnimationFrame(tick);else lyricFrameId=0;};
  lyricFrameId=requestAnimationFrame(tick);
}

function openProjectedLyrics(songKey){
  const song=SONG_LIBRARY[songKey];if(!song)return;activeProjectionKey=songKey;activeLyricLineIndex=-1;$('lyricsTitle').textContent=song.title;$('lyricsSubtitle').textContent=song.subtitle;$('lyricsInvitation').textContent=song.invitation;renderLyricsFlow();const dialog=$('lyricsDialog');if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');syncProjectionPlayback();requestAnimationFrame(()=>syncLyricProgress(true));if(!activeProjectionAudio()?.paused)startLyricAnimation();
}

function syncProjectionPlayback(){
  const audio=activeProjectionAudio();const playing=Boolean(audio&&!audio.paused);$('lyricsPlayback').textContent=playing?'Pause song':'Play song';$('lyricsPlayback').classList.toggle('is-playing',playing);updateLyricWindowStatus();syncLyricProgress();
}

function openPractice(move){
  stopAudio();
  currentPractice=move;$('practiceKind').textContent=`${categoryLabels[move.cat]} · ${move.kind}`.toUpperCase();$('practiceName').textContent=move.title;$('practiceDescription').textContent=move.why;
  $('practiceWhy').textContent=move.why;$('practiceHow').textContent=move.how;$('practiceGuard').textContent=move.guard;$('practiceWatch').textContent=move.watch;$('adaptation').value=state.practice===move.title?state.adaptation:'';
  if(move.songKey)configurePracticeSong(move.songKey);
  $('practiceDetail').hidden=false;$('practiceDetail').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function selectMove(move,adaptation=''){
  state.practice=move.title;state.practiceCategory=move.cat;state.practiceWhy=move.why;state.adaptation=adaptation;
  $('choice').textContent=move.title;$('choiceWhy').textContent=adaptation||move.why;$('selectedPractice').classList.remove('needs-attention');updateSummary();saveDraft();
}

function updateField(screen){
  if(screen){$('app').dataset.screen=screen;$('belongingField').dataset.screen=screen;}
  const active=new Set(state.signals.map(name=>signalNames.indexOf(name)).filter(index=>index>=0));
  document.querySelectorAll('[data-signal]').forEach(node=>node.classList.toggle('is-active',active.has(Number(node.dataset.signal))));
  document.querySelectorAll('.connection[data-signals]').forEach(path=>{
    const ends=path.dataset.signals.split(' ').map(Number);const count=ends.filter(index=>active.has(index)).length;
    path.classList.toggle('is-related',count===1);path.classList.toggle('is-connected',count===2);
  });
}

function hasDraftContent(){return Boolean(state.context||state.signals.length||state.note||state.interpretation||state.hypothesis||state.practice||state.goal||state.guardrail);}
function getDraft(){try{return JSON.parse(localStorage.getItem(DRAFT_KEY)||'null');}catch{return null;}}
function saveDraft(message=false){
  if(!hasDraftContent()){localStorage.removeItem(DRAFT_KEY);updateDraftNotice();return;}
  if(!state.created)state.created=new Date().toISOString();
  localStorage.setItem(DRAFT_KEY,JSON.stringify({...state,updated:new Date().toISOString()}));
  if(message)$('draftStatus').textContent='Draft saved privately on this device.';updateDraftNotice();
}
function updateDraftNotice(){
  const draft=getDraft();$('draftNotice').hidden=!draft;
  if(draft){const updated=draft.updated?new Date(draft.updated).toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'';const description=[draft.context,(draft.signals||[]).slice(0,2).join(', '),updated?`Last tended ${updated}`:''].filter(Boolean).join(' · ');$('draftDescription').textContent=description||'An unfinished observation is ready to continue.';const excerpt=(draft.note||draft.hypothesis||draft.goal||'').trim();$('draftExcerpt').textContent=excerpt?`${excerpt.slice(0,150)}${excerpt.length>150?'…':''}`:'';$('draftExcerpt').hidden=!excerpt;}
}

function collectInputs(){
  state.note=$('note').value.trim();state.hypothesis=$('hyp').value.trim();state.adaptation=$('adaptation').value.trim();state.returnWhen=$('when').value;state.lookFor=$('look').value;state.goal=$('goal').value.trim();state.frequency=$('frequency').value;state.customFrequency=$('customFrequency').value.trim();state.timeframe=$('timeframe').value;state.checkInDate=$('checkInDate').value;state.guardrail=$('guardrail').value.trim();updateSummary();saveDraft();
}

function show(id){
  collectInputs();if(['notice','interpret','tend','return'].includes(id))state.lastStep=id;saveDraft();
  if(id!=='tend')stopAudio();
  if(id!=='interpret')stopCompassAudio();
  document.querySelectorAll('.screen').forEach(section=>section.classList.toggle('on',section.id===id));document.querySelectorAll('[data-id]').forEach(button=>button.classList.toggle('on',button.dataset.id===id));
  if(id==='archive')renderArchive();if(id==='patterns')renderPatterns();updateField(id);window.scrollTo({top:0,behavior:'smooth'});
}

function formatDate(value){if(!value)return'';return new Date(`${value}T12:00:00`).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});}
function timeframeLabel(item=state){return item.timeframe==='3'?'Three days':item.timeframe==='7'?'One week':item.timeframe==='14'?'Two weeks':'Chosen return date';}
function rhythmLabel(item=state){return[item.frequency==='Custom'?(item.customFrequency||'Custom rhythm'):item.frequency,formatDate(item.checkInDate)||timeframeLabel(item)].filter(Boolean).join(' · ');}
function setSuggestedDate(){if(state.timeframe==='custom')return;const date=new Date();date.setDate(date.getDate()+Number(state.timeframe));state.checkInDate=date.toISOString().slice(0,10);$('checkInDate').value=state.checkInDate;updateSummary();saveDraft();}
function updateSummary(){$('summary').textContent=`Try ${state.practice||'one selected practice'}. ${state.adaptation||state.practiceWhy||''} Return ${state.returnWhen.toLowerCase()} and notice ${state.lookFor.toLowerCase()}.${state.goal?` You hope to make this more possible: ${state.goal}`:''}`;}

function planText(){collectInputs();return `BELONGING CONDITIONS PRACTICE\n\nContext: ${state.context||'Not yet selected'}\nSignals: ${state.signals.join(', ')||'None selected'}\nField note: ${state.note||'Not yet added'}\nWorking interpretation: ${[state.interpretation,state.hypothesis].filter(Boolean).join(' — ')||'Not yet added'}\nPractice: ${state.practice||'Not yet selected'}\nAdaptation: ${state.adaptation||state.practiceWhy||'Not yet added'}\nWhat I hope becomes more possible: ${state.goal||'Not yet added'}\nRhythm: ${rhythmLabel()}\nWhat must remain true: ${state.guardrail||'Not yet added'}\nLook for: ${state.lookFor}\n\nBelonging is not proof gathered once. Tend one part of the invitation, then return with curiosity.`;}
async function copyPlan(){const text=planText();try{await navigator.clipboard.writeText(text);}catch{const temp=document.createElement('textarea');temp.value=text;document.body.append(temp);temp.select();document.execCommand('copy');temp.remove();}$('saved').textContent='Carry-forward plan copied.';}

function normalizeRecord(item,index=0){const practice=item.practice&&item.practice!=='Not selected'?item.practice:'';return{id:item.id||`legacy-${item.saved||index}`,condition:'Belonging',context:item.context||'',signals:Array.isArray(item.signals)?item.signals:[],note:item.note||'',interpretation:item.interpretation||item.state||'Unclear',hypothesis:item.hypothesis||'',practice,practiceCategory:item.practiceCategory||inferCategory(practice),practiceWhy:item.practiceWhy||'',adaptation:item.adaptation||'',returnWhen:item.returnWhen||'Tomorrow',lookFor:item.lookFor||'Who enters participation more easily',goal:item.goal||'',frequency:item.frequency||'Once',customFrequency:item.customFrequency||'',timeframe:item.timeframe||'3',checkInDate:item.checkInDate||'',guardrail:item.guardrail||'',status:item.status||(practice?'active':'developing'),saved:item.saved||item.created||new Date().toISOString(),updated:item.updated||item.saved||new Date().toISOString(),lastStep:item.lastStep||(practice?'return':'notice'),reflection:item.reflection||{actualTry:'',changed:'',surprise:'',next:''},sample:Boolean(item.sample)};}
function archive(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]').map(normalizeRecord).sort((a,b)=>new Date(a.saved)-new Date(b.saved));}catch{return[];}}
function saveArchive(records){localStorage.setItem(STORAGE_KEY,JSON.stringify(records));}
function archiveRecord(status){const now=new Date().toISOString();return normalizeRecord({...state,id:state.entryId||`belonging-${Date.now()}`,saved:state.created||now,updated:now,status,reflection:{actualTry:'',changed:'',surprise:'',next:''}});}
function upsertArchive(record){const records=archive();const index=records.findIndex(item=>item.id===record.id);if(index>=0)records[index]={...records[index],...record,reflection:records[index].reflection||record.reflection};else records.push(record);saveArchive(records);state.entryId=record.id;state.created=record.saved;saveDraft();}

function saveFieldNote(){collectInputs();if(!state.context&&!state.signals.length&&!state.note){$('draftStatus').textContent='Add a context, signal, or field note before saving this entry.';return;}state.lastStep='notice';const existing=archive().find(item=>item.id===state.entryId);upsertArchive(archiveRecord(existing?.status==='active'?'active':'developing'));$('draftStatus').textContent='Field note saved. Continue now or return from My Entries.';show('archive');}
function saveCycle(){collectInputs();if(!state.practice){show('tend');$('selectedPractice').classList.add('needs-attention');$('choice').textContent='Choose one practice before beginning';$('choiceWhy').textContent='Explore a suggested practice or create one small move that fits.';return;}state.lastStep='return';upsertArchive(archiveRecord('active'));$('saved').textContent='Your tending cycle has begun and is saved privately in this browser.';renderArchive();updateDraftNotice();}

function applyStateToForm(){
  const contextValue=contextOptions.includes(state.context)?state.context:state.context?'Another context':'';document.querySelectorAll('input[name="context"]').forEach(input=>input.checked=input.value===contextValue);$('otherContext').hidden=contextValue!=='Another context';$('otherContext').value=contextValue==='Another context'?state.context:'';
  document.querySelectorAll('.signal').forEach(button=>{const on=state.signals.includes(signalNames[Number(button.dataset.i)]);button.classList.toggle('on',on);button.setAttribute('aria-pressed',String(on));});document.querySelectorAll('input[name="interpretation"]').forEach(input=>input.checked=input.value===state.interpretation);
  $('note').value=state.note||'';$('hyp').value=state.hypothesis||'';$('adaptation').value=state.adaptation||'';$('when').value=state.returnWhen||'Tomorrow';$('look').value=state.lookFor||'Who enters participation more easily';$('goal').value=state.goal||'';$('frequency').value=state.frequency||'Daily';$('customFrequency').value=state.customFrequency||'';const custom=state.frequency==='Custom';$('customFrequency').hidden=!custom;$('customFrequencyLabel').hidden=!custom;$('timeframe').value=state.timeframe||'3';$('checkInDate').value=state.checkInDate||'';$('guardrail').value=state.guardrail||'';$('choice').textContent=state.practice||'None yet';$('choiceWhy').textContent=state.practice?(state.adaptation||state.practiceWhy||'Return later to notice what becomes different.'):'Explore a practice above or create one that fits the field.';updateSummary();updateField(state.lastStep);
}
function loadEntry(item){Object.assign(state,{...defaults,signals:[]},normalizeRecord(item),{entryId:item.id,created:item.saved});applyStateToForm();saveDraft();show(['notice','interpret','tend','return'].includes(state.lastStep)?state.lastStep:item.status==='active'?'return':'notice');}
function restoreDraft(){const draft=getDraft();if(!draft)return false;Object.assign(state,{...defaults,signals:[]},draft);applyStateToForm();updateDraftNotice();return true;}
function resetPractice(){stopAudio();stopCompassAudio();Object.assign(state,{...defaults,signals:[]});localStorage.removeItem(DRAFT_KEY);currentPractice=null;activeFilter='all';document.querySelectorAll('.move-filter').forEach(button=>button.classList.toggle('on',button.dataset.filter==='all'));$('customTitle').value='';$('customWhy').value='';$('practiceDetail').hidden=true;$('selectedPractice').classList.remove('needs-attention');applyStateToForm();setSuggestedDate();updateDraftNotice();show('notice');}

function addArchiveField(dl,label,value){const wrap=document.createElement('div');const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=value||'Not recorded';wrap.append(dt,dd);dl.append(wrap);}
function renderArchive(){
  const records=archive();$('archiveStats').innerHTML=`<div class="stat"><strong>${records.length}</strong><span>field notes</span></div><div class="stat"><strong>${records.filter(item=>item.practice).length}</strong><span>practice trials</span></div><div class="stat"><strong>${new Set(records.flatMap(item=>item.signals)).size}</strong><span>distinct signals</span></div><div class="stat"><strong>${records.length?new Date(records.at(-1).updated).toLocaleDateString():'—'}</strong><span>most recent return</span></div>`;
  const active=$('activeCycles');const timeline=$('timeline');active.replaceChildren();timeline.replaceChildren();
  const cycles=records.filter(item=>item.status==='active');if(cycles.length){const heading=document.createElement('div');heading.className='active-heading';heading.innerHTML='<p class="step-kicker">ACTIVE PRACTICES</p><h3>Ready whenever you are to return</h3><p>No streaks or scores—only another chance to notice what the field taught you.</p>';active.append(heading);[...cycles].reverse().forEach(item=>active.append(makeCheckInCard(item)));}
  if(!records.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='No Belonging field notes have been saved on this device yet.';timeline.append(empty);return;}
  [...records].reverse().forEach(item=>{
    const article=document.createElement('article');article.className='entry';const header=document.createElement('header');const titleWrap=document.createElement('div');titleWrap.className='entry-title';const title=document.createElement('h3');title.textContent=item.practice||item.goal||(item.context?`${item.context} field note`:'Belonging field note');const time=document.createElement('time');time.dateTime=item.saved;time.textContent=new Date(item.saved).toLocaleString();titleWrap.append(title,time);
    const meta=document.createElement('div');meta.className='entry-meta';const status=document.createElement('span');status.className=`entry-status ${item.status}`;status.textContent=item.status==='developing'?'Developing':item.status==='active'?'Active cycle':'Remembered';const open=document.createElement('button');open.type='button';open.className='secondary-button compact-button';open.textContent=item.status==='developing'?'Continue developing':'Open entry';open.addEventListener('click',()=>loadEntry(item));meta.append(status,open);header.append(titleWrap,meta);
    const excerptText=(item.note||item.hypothesis||item.goal||'').trim();const excerpt=document.createElement('p');excerpt.className='entry-excerpt';excerpt.textContent=excerptText?`${excerptText.slice(0,180)}${excerptText.length>180?'…':''}`:'A field note ready to be revisited.';
    const chips=document.createElement('div');chips.className='chips';[item.sample?'Sample':null,item.context,item.interpretation,...item.signals].filter(Boolean).forEach(value=>{const chip=document.createElement('span');chip.textContent=value;chips.append(chip);});
    const dl=document.createElement('dl');addArchiveField(dl,'Working hypothesis',item.hypothesis);addArchiveField(dl,'Practice',item.practice);addArchiveField(dl,'Adaptation',item.adaptation||item.practiceWhy);addArchiveField(dl,'Possibility goal',item.goal);addArchiveField(dl,'Rhythm',rhythmLabel(item));addArchiveField(dl,'Look for',item.lookFor);addArchiveField(dl,'What must remain true',item.guardrail);
    if(Object.values(item.reflection||{}).some(Boolean)){addArchiveField(dl,'What I tried',item.reflection.actualTry);addArchiveField(dl,'What changed',item.reflection.changed);addArchiveField(dl,'What surprised me',item.reflection.surprise);addArchiveField(dl,'Carry forward',item.reflection.next);}
    article.append(header,excerpt,chips,dl);timeline.append(article);
  });
}

function makeCheckInCard(item){
  const card=document.createElement('article');card.className='check-in-card';const title=document.createElement('div');title.innerHTML=`<p class="step-kicker">RETURN ${item.checkInDate?`· ${escapeHtml(formatDate(item.checkInDate))}`:''}</p><h3>${escapeHtml(item.practice||'Tending practice')}</h3><p>${escapeHtml(item.goal||'Notice what became possible.')}</p>`;
  const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Check in with this practice';details.append(summary);const form=document.createElement('div');form.className='check-in-form';form.innerHTML=`<label>What did I actually try?<textarea data-reflection="actualTry">${escapeHtml(item.reflection?.actualTry||'')}</textarea></label><label>What became easier, harder, or different?<textarea data-reflection="changed">${escapeHtml(item.reflection?.changed||'')}</textarea></label><label>What surprised me?<textarea data-reflection="surprise">${escapeHtml(item.reflection?.surprise||'')}</textarea></label><label>What do I want to do next?<select data-reflection="next"><option value="">Choose when ready</option>${['Keep','Adapt','Release','Begin another cycle'].map(value=>`<option${item.reflection?.next===value?' selected':''}>${value}</option>`).join('')}</select></label><button type="button" class="primary-button">Save this return</button><p class="status-message" role="status"></p>`;
  form.querySelector('button').addEventListener('click',()=>{const records=archive();const target=records.find(record=>record.id===item.id);if(!target)return;target.reflection={};form.querySelectorAll('[data-reflection]').forEach(field=>target.reflection[field.dataset.reflection]=field.value.trim());target.status=['Keep','Adapt','Begin another cycle'].includes(target.reflection.next)?'active':'remembered';target.updated=new Date().toISOString();saveArchive(records);form.querySelector('.status-message').textContent='Your return is saved privately.';setTimeout(()=>{renderArchive();renderPatterns();},450);});details.append(form);card.append(title,details);return card;
}

function inferCategory(title=''){const move=moves.find(item=>item.title===title);if(move)return move.cat;if(!title||title==='Not selected')return'none';return'custom';}
function renderPatterns(){
  const records=archive();const counts={};signalNames.forEach(name=>counts[name]=0);records.forEach(item=>item.signals.forEach(name=>counts[name]=(counts[name]||0)+1));const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  $('seedDemo').textContent=records.some(item=>item.sample)?'Remove sample notes':'Preview with sample notes';
  const catCounts={relationship:0,participation:0,identity:0,environment:0,music:0,custom:0};const usedMoves=new Set();records.forEach(item=>{if(item.practice&&item.practice!=='Not selected'){const category=item.practiceCategory||inferCategory(item.practice);if(catCounts[category]!==undefined)catCounts[category]+=1;usedMoves.add(item.practice);}});const totalMoves=Object.values(catCounts).reduce((sum,count)=>sum+count,0);const explored=Object.entries(catCounts).filter(([,count])=>count>0).map(([id])=>categoryLabels[id]);const unexplored=Object.entries(catCounts).filter(([id,count])=>count===0&&id!=='custom').map(([id])=>categoryLabels[id]);const topCategory=Object.entries(catCounts).sort((a,b)=>b[1]-a[1])[0];
  $('repertoireBars').innerHTML=totalMoves?Object.entries(catCounts).map(([id,count])=>`<div class="bar-row"><div class="bar-label"><span>${escapeHtml(categoryLabels[id])}</span><b>${count}</b></div><div class="bar"><i style="width:${Math.round(count/totalMoves*100)}%"></i></div></div>`).join(''):'<div class="empty">Select moves across several cycles to see a tending repertoire emerge.</div>';
  $('repertoireNote').textContent=totalMoves?(topCategory[1]>1?`Recent tending has concentrated most in ${categoryLabels[topCategory[0]]}. That may fit the context. It may also be worth noticing whether another part of the ecology has remained mostly untouched.`:`The current repertoire is distributed across ${explored.join(', ')}.`):'No tending pattern yet.';
  $('moveVariety').innerHTML=totalMoves?`<div class="pair"><strong>Categories explored</strong><br>${explored.length?explored.map(value=>`<span class="move-chip used">${escapeHtml(value)}</span>`).join(''):'None yet'}</div><div class="pair"><strong>Categories not yet explored</strong><br>${unexplored.length?unexplored.map(value=>`<span class="move-chip unused">${escapeHtml(value)}</span>`).join(''):'All listed categories have appeared.'}</div><div class="pair"><strong>Distinct moves tried</strong><br>${usedMoves.size} across ${totalMoves} recorded tending cycle${totalMoves===1?'':'s'}.</div>`:'<div class="empty">Move variety will appear after tending cycles are saved.</div>';
  $('trajectory').innerHTML=records.length?records.map(item=>`<span class="traj ${escapeHtml(item.interpretation)}">${escapeHtml(item.interpretation)}</span>`).join(''):'<span class="traj">No observations yet</span>';
  if(records.length<2){$('patternRead').textContent='Not enough observations yet.';$('patternReadNote').textContent='Two or more field notes will begin to make recurrence visible.';}else{const prior=records.at(-2).interpretation;const recent=records.at(-1).interpretation;$('patternRead').textContent=prior===recent?`${recent} is recurring.`:`The read shifted from ${prior.toLowerCase()} to ${recent.toLowerCase()}.`;$('patternReadNote').textContent='Treat this as a reason to look closer, not as a conclusion.';}
  $('recurrence').innerHTML=records.length?sorted.map(([name,count])=>`<div class="bar-row"><div class="bar-label"><span>${escapeHtml(name)}</span><b>${count}/${records.length}</b></div><div class="bar"><i style="width:${Math.round(count/records.length*100)}%"></i></div></div>`).join(''):'<div class="empty">No recurrence data yet.</div>';
  const pairs=[];for(let index=0;index<records.length-1;index+=1){const item=records[index];if(item.practice&&item.practice!=='Not selected'){const next=records[index+1];const newSignals=next.signals.filter(name=>!item.signals.includes(name));pairs.push(`<div class="pair"><strong>${escapeHtml(item.practice)}</strong><br>Next observation: ${newSignals.length?`new signal(s): ${newSignals.map(escapeHtml).join(', ')}`:'no new selected signals.'}</div>`);}}$('practiceResponse').innerHTML=pairs.length?pairs.slice(-4).reverse().join(''):'<div class="empty">A practice needs a later observation before a pairing can be surfaced.</div>';
  const questions=[];if(records.length){if(sorted[0][1]>1)questions.push(`${sorted[0][0]} is recurring. Is it broadly available, or mostly present for particular people or moments?`);const absent=sorted.filter(([,count])=>count===0).slice(0,2);if(absent.length)questions.push(`${absent.map(([name])=>name).join(' and ')} ${absent.length>1?'have':'has'} not yet appeared in the record. Absent, unnoticed, or simply not relevant?`);if(counts['Withdrawal / edge']>0)questions.push('Withdrawal / edge has appeared. Who is experiencing the boundary of belonging, and when?');if(totalMoves>=3&&topCategory[1]/totalMoves>=.67)questions.push(`Most recorded moves have been ${categoryLabels[topCategory[0]].toLowerCase()} moves. Is that where the leverage truly is, or simply the most familiar part of the repertoire?`);}$('openQuestions').innerHTML=questions.length?questions.map(question=>`<div class="question">${escapeHtml(question)}</div>`).join(''):'<div class="empty">Open questions will appear as patterns accumulate.</div>';
  if(records.length&&sorted[0][1]>0){const positive=signalNames.filter(name=>name!=='Withdrawal / edge').map(name=>[name,counts[name]]).sort((a,b)=>a[1]-b[1]);const nudge=unexplored.length?` ${unexplored[0]} moves have not yet appeared in the tending record. That does not mean one is needed, but it may be worth scanning that part of the ecology before choosing the next move.`:'';$('nextPrompt').textContent=`${sorted[0][0]} is currently most visible. ${positive[0][0]} is less visible. On the next return, notice when ${positive[0][0].toLowerCase()} becomes possible, for whom, and what seems to precede it.${nudge}`;}else if(records.length)$('nextPrompt').textContent='The record does not yet include selected signals. On the next return, notice one concrete sign of who can enter, contribute, or remain at the edge.';else $('nextPrompt').textContent='Save repeated field notes to generate a gentle next-noticing prompt.';
}

function exportArchive(){const records=archive();if(!records.length)return;const blob=new Blob([JSON.stringify(records,null,2)],{type:'application/json'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`songbridge-belonging-field-notes-${new Date().toISOString().slice(0,10)}.json`;link.click();URL.revokeObjectURL(link.href);}
function toggleSampleNotes(){const existing=archive();if(existing.some(item=>item.sample)){saveArchive(existing.filter(item=>!item.sample));renderArchive();renderPatterns();return;}const now=Date.now(),day=86400000;const demo=[['Uneven',['Recognition','Shared ease'],'Witnessing','relationship'],['Uneven',['Recognition','Voice enters','Shared ease'],'Witnessing','relationship'],['Strengthening',['Recognition','Voice enters','Peer invitation','Risk-taking'],'Every Voice Belongs','music'],['Strengthening',['Recognition','Voice enters','Peer invitation','Contribution'],'I Am Me','music']].map((item,index)=>normalizeRecord({id:`sample-belonging-${index}`,context:'Sample · partners or small group',interpretation:item[0],signals:item[1],practice:item[2],practiceCategory:item[3],note:`Sample observation ${index+1}`,returnWhen:'Tomorrow',lookFor:'Who enters participation more easily',saved:new Date(now-(4-index)*day).toISOString(),updated:new Date(now-(4-index)*day).toISOString(),status:'remembered',sample:true}));saveArchive([...existing,...demo]);renderArchive();renderPatterns();}

renderChoices();renderFilters();renderMoves();
document.querySelectorAll('[data-id]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.id)));document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.go)));
$('showPatterns').addEventListener('click',()=>show('patterns'));$('newCycle').addEventListener('click',resetPractice);$('beginNewEntry').addEventListener('click',resetPractice);$('resumeDraft').addEventListener('click',()=>show(['notice','interpret','tend','return'].includes(state.lastStep)?state.lastStep:'notice'));
$('otherContext').addEventListener('input',()=>{if(document.querySelector('input[name="context"]:checked')?.value==='Another context'){state.context=$('otherContext').value.trim()||'Another context';saveDraft();}});
['note','hyp','adaptation','goal','customFrequency','guardrail'].forEach(id=>$(id).addEventListener('input',collectInputs));['when','look','checkInDate'].forEach(id=>$(id).addEventListener('change',collectInputs));
$('frequency').addEventListener('change',()=>{const custom=$('frequency').value==='Custom';$('customFrequency').hidden=!custom;$('customFrequencyLabel').hidden=!custom;collectInputs();});$('timeframe').addEventListener('change',()=>{collectInputs();if($('timeframe').value!=='custom')setSuggestedDate();else $('checkInDate').focus();});
$('addCustom').addEventListener('click',()=>{const title=$('customTitle').value.trim(),why=$('customWhy').value.trim();if(!title)return;selectMove({title,why:why||'A field-created move chosen for this moment.',cat:'custom'},'');$('customTitle').value='';$('customWhy').value='';});
$('choosePractice').addEventListener('click',()=>{if(currentPractice)selectMove(currentPractice,$('adaptation').value.trim());});$('closeDetail').addEventListener('click',()=>{stopAudio();$('practiceDetail').hidden=true;});$('saveFieldNote').addEventListener('click',saveFieldNote);$('save').addEventListener('click',saveCycle);$('copyPlan').addEventListener('click',copyPlan);
$('projectPracticeLyrics').addEventListener('click',()=>openProjectedLyrics(currentSongKey));
document.querySelectorAll('[data-project-song]').forEach(button=>button.addEventListener('click',()=>openProjectedLyrics(button.dataset.projectSong)));
$('closeLyrics').addEventListener('click',()=>{stopLyricAnimation();const dialog=$('lyricsDialog');if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');});
$('lyricsPlayback').addEventListener('click',async()=>{const audio=activeProjectionAudio();if(!audio)return;if(audio.paused){activeLyricLineIndex=-1;syncLyricProgress(true);try{await audio.play();}catch{}}else audio.pause();});
const pauseForLyricPreview=()=>{const audio=activeProjectionAudio();if(audio&&!audio.paused)audio.pause();};
$('lyricsFlow').addEventListener('wheel',pauseForLyricPreview,{passive:true});$('lyricsFlow').addEventListener('touchmove',pauseForLyricPreview,{passive:true});
$('lyricsFlow').addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End'].includes(event.key))pauseForLyricPreview();});
[$('songAudio'),$('compassAudio')].forEach(audio=>{
  audio.addEventListener('loadedmetadata',()=>syncLyricProgress(true));audio.addEventListener('seeked',()=>syncLyricProgress(true));
  audio.addEventListener('pause',()=>{stopLyricAnimation();syncProjectionPlayback();});audio.addEventListener('ended',()=>{stopLyricAnimation();syncProjectionPlayback();syncLyricProgress(true);});
});
$('songAudio').addEventListener('play',()=>{$('compassAudio').pause();syncProjectionPlayback();startLyricAnimation();});
$('compassAudio').addEventListener('play',()=>{$('songAudio').pause();syncProjectionPlayback();startLyricAnimation();});
$('lyricsDialog').addEventListener('close',stopLyricAnimation);
$('exportBtn').addEventListener('click',exportArchive);$('clearBtn').addEventListener('click',()=>{if(archive().length&&window.confirm('Clear every Belonging field note saved in this browser? This cannot be undone unless you exported a backup.')){localStorage.removeItem(STORAGE_KEY);renderArchive();renderPatterns();}});$('seedDemo').addEventListener('click',toggleSampleNotes);

if(!restoreDraft())setSuggestedDate();
updateSummary();updateDraftNotice();updateField('notice');renderArchive();renderPatterns();
