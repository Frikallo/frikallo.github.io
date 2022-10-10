github_disabled = """<a v-else class="github disabled" href="#" aria-label="No repository"><img src="src/medias/misc/svg/github-no-repo.svg" alt="" /></a>"""
def add_work(IMGLINK, VIDLINK, WORKTITLE, GITHUBLINK, DESCRIPTIONEN, DESCRIPTIONFR, NAMEOFLINKEN, NAMEOFLINKFR, REPO):
    work = f"""    
                <figure key="work.name" @mouseover="preview($event)" @click="preview($event)">
                    <div class="figimg">
                        <div class="sprite">
                            <img src="{IMGLINK}" alt="" loading="lazy">
                        </div>
                        <video preload="none" loop playsinline muted webkit-playsinline="true">
                            <source src="{VIDLINK}">
                        </video>
                    </div>
                <figcaption>
                    <h2>{WORKTITLE}</h2>
                    <a class="github" href="{GITHUBLINK}" target="_blank" aria-label="{GITHUBLINK}"><img src="https://img.shields.io/github/stars/frikallo/{REPO}?style=social" alt="" /></a>
                    <a class="github" href="{GITHUBLINK}" target="_blank" aria-label="{GITHUBLINK}"><img src="https://img.shields.io/github/forks/frikallo/{REPO}?style=social" alt="" /></a>
                    <p><span><span id="en">{DESCRIPTIONEN}</span><span id="fr">{DESCRIPTIONFR}</span></span></p>
                    <div class="notes"></div>
                    <div class="links"><a href="{GITHUBLINK}"><span id="en">{NAMEOFLINKEN}</span><span id="fr">{NAMEOFLINKFR}</span></a></div>
                    <div class="status"><img :src="work.status" alt=""></div>
                </figcaption>
                </figure>"""
    return work

def add_announcment(DATE, ANNOUNCMENT, ANNOUNCMENTFR, LINK, LINKTITLE, LINKTITLEFR, TITLE, TITLEFR):
    announcment = f"""            
                <article class="announcement">
                    <header>
                        <h3><span id="en">{TITLE}</span><span id="fr">{TITLEFR}</span></h3>
                        <div class="archive-meta">
                            <time>{DATE}</time>
                        </div>
                    </header>
                    <div class="archive-entry post-content ">
                        <p><span id="en">{ANNOUNCMENT}</span><span id="fr">{ANNOUNCMENTFR}</span></p>
        
                        <a href="{LINK}"><span id="en">{LINKTITLE} &gt;</span><span id="fr">{LINKTITLEFR} &gt;</span></a>
                    </div>
                </article>"""
    return announcment