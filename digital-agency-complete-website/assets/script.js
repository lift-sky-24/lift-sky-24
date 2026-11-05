
const menu=document.querySelector('.menu'), links=document.querySelector('.links');
if(menu&&links){menu.addEventListener('click',()=>{let o=links.classList.toggle('open');menu.textContent=o?'×':'☰';menu.setAttribute('aria-expanded',String(o));});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false')}))}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const form=document.querySelector('[data-contact-form]');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent('Project enquiry — '+(d.get('service')||'Digital services'));const body=encodeURIComponent('Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nService: '+d.get('service')+'\nBudget: '+(d.get('budget')||'Not specified')+'\n\nProject details:\n'+d.get('message'));window.location.href='mailto:hello@example.com?subject='+subject+'&body='+body;const status=form.querySelector('[data-form-status]');if(status)status.textContent='Your email app should open with your enquiry. Update hello@example.com before publishing.'})}
