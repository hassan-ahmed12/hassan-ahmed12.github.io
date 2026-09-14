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
if(all){window.portfolioProjects.forEach(p=>all.append(projectCard(p)));document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;all.querySelectorAll('.project-card').forEach(card=>{card.hidden=filter!=='All'&&card.dataset.platform!==filter;if(!card.hidden)count++;});document.getElementById('filter-status').textContent=`Showing ${count} ${filter==='All'?'':filter+' '}project${count===1?'':'s'}.`;}));}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
