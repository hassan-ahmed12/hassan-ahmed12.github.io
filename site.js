const base = document.body.dataset.page === 'work' ? '../' : './';
function projectCard(project) {
 const article = document.createElement('article');
 article.className = 'project-card'; article.id = project.id; article.dataset.platform = project.platform;
 const link = document.createElement('a'); link.className = 'project-visual'; link.href = project.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label', `Visit ${project.name} (opens in a new tab)`); link.style.setProperty('--card-bg', project.color);
 if (project.image) { const image = document.createElement('img'); image.src = base + project.image; image.alt = `${project.name} website imagery`; image.loading = 'lazy'; image.width = 1200; image.height = 800; link.append(image); }
 else { const title = document.createElement('span'); title.className = 'project-brand-fallback'; title.textContent = project.name; link.append(title); }
 const overlay = document.createElement('span'); overlay.className = 'project-overlay'; overlay.setAttribute('aria-hidden','true'); link.append(overlay);
 const platform = document.createElement('span'); platform.className='project-platform'; platform.textContent=project.platform; link.append(platform);
 const arrow = document.createElement('span'); arrow.className='project-arrow'; arrow.textContent='↗'; arrow.setAttribute('aria-hidden','true'); link.append(arrow);
 const caption=document.createElement('div'); caption.className='project-caption'; const name=document.createElement('h3'); name.textContent=project.name; const category=document.createElement('p'); category.textContent=project.category; caption.append(name,category); article.append(link,caption); return article;
}
const featured=document.getElementById('featured-projects');
if(featured) ['ronin','on-holiday','black-jacket-suiting'].forEach(id=>featured.append(projectCard(window.portfolioProjects.find(p=>p.id===id))));
const all=document.getElementById('all-projects');
if(all){window.portfolioProjects.forEach(p=>all.append(projectCard(p)));document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;all.querySelectorAll('.project-card').forEach(card=>{card.hidden=filter!=='All'&&card.dataset.platform!==filter;if(!card.hidden)count++;});document.getElementById('filter-status').textContent=`Showing ${count} ${filter==='All'?'':filter+' '}project${count===1?'':'s'}.`;animateFilteredProjects();}));}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());


// Motion is progressive enhancement: content stays visible if it is unavailable.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const activeEntrances = new Map();
function enter(element, delay = 0, distance = 16) {
 if (motionPreference.matches || !element.animate || element.contains(document.activeElement)) return;
 activeEntrances.get(element)?.cancel();
 const animation = element.animate([
  { opacity: 0, transform: `translateY(${distance}px)` },
  { opacity: 1, transform: 'translateY(0)' }
 ], { duration: 650, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' });
 activeEntrances.set(element, animation);
 const cleanup = () => { if (activeEntrances.get(element) === animation) activeEntrances.delete(element); };
 animation.onfinish = cleanup;
 animation.oncancel = cleanup;
}
const introduction = document.querySelectorAll('.header, .hero > .eyebrow, .hero h1, .hero-bottom, .work-hero > .eyebrow, .work-hero h1, .work-intro');
introduction.forEach((element, index) => enter(element, index * 75, index === 0 ? 6 : 14));
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
  const arriving = entries.filter(entry => entry.isIntersecting);
  arriving.forEach((entry, index) => {
   enter(entry.target, Math.min(index, 2) * 70);
   observer.unobserve(entry.target);
  });
 }, { threshold: 0.08 });
 document.querySelectorAll('.section-heading, .project-card, .services-grid article, .about-grid > div, .contact > .eyebrow, .contact-row, .contact-bottom').forEach(element => observer.observe(element));
}
function animateFilteredProjects() {
 document.querySelectorAll('#all-projects .project-card:not([hidden])').forEach((card, index) => enter(card, Math.min(index, 2) * 55, 10));
}
// Never leave keyboard focus inside a fading or delayed element.
document.addEventListener('focusin', event => {
 for (const [element, animation] of activeEntrances) {
  if (element.contains(event.target)) animation.cancel();
 }
});
motionPreference.addEventListener('change', event => {
 if (event.matches) for (const animation of activeEntrances.values()) animation.cancel();
});
