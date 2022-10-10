### CONSTANTS ###

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


print(add_work("https://github.com/Frikallo/MISST/raw/main/src/Assets/showcaseimage1.jpeg", "https://video-hover-1.superhi.com/1-island.mp4", "MISST", "https://github.com/", "A local GUI music source separation tool built on Tkinter and public Facebook models serving as a free and open source Stem Player", "Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et des modèles Facebook publics servant de lecteur Stem gratuit et à code source ouvert.", "Github", "misst"))