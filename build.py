import os
import cv2
import datetime
from subprocess import call

github_disabled = """<a v-else class="github disabled" href="#" aria-label="No repository"><img src="src/medias/misc/svg/github-no-repo.svg" alt="" /></a>"""
def add_work(IMGLINK, VIDLINK, WORKTITLE, GITHUBLINK, DESCRIPTIONEN, DESCRIPTIONFR, NAMEOFLINKEN, NAMEOFLINKFR, REPO, ARCHIVED=False, INDEVELOPMENT=False, EXPERIMENTAL=False, LINK2=None, LINK2TITLEEN=None, LINK2TITLEFR=None):
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
                    <div class="notes">
                        {"<span class='warning'>Project archived</span>" if ARCHIVED else ""}
                        {"<span class='secondary'>In development</span>" if INDEVELOPMENT else ""}
                        {"<span class='secondary'>Experimental</span>" if EXPERIMENTAL else ""}
                    </div>
                    <div class="links"><a href="{GITHUBLINK}">
                        <span id="en">{NAMEOFLINKEN}</span><span id="fr">{NAMEOFLINKFR}</span></a>
                    """
    if LINK2:
            link2 = f"""    <div class="links"><a href="{LINK2}">
                        <span id="en">{LINK2TITLEEN}</span><span id="fr">{LINK2TITLEFR}</span></a>
                </div>
                    <div class="status"><img :src="work.status" alt=""></div>
                </figcaption>
                </figure>"""
            work += link2
    else:
        work += """</div>
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

works = []
announcement_list = []
for _ in os.listdir("./projects"):
    configs = []
    project_title = _
    with open(f"./projects/{project_title}/config.toml", "r") as f:
        config = f.read()
    config = config.splitlines()
    for line in config:
        configs.append(line.split("=")[1].strip())

    IMGLINK = configs[0]
    VIDLINK = configs[1]
    WORKTITLE = configs[2]
    GITHUBLINK = configs[3]
    DESCRIPTIONEN = configs[4]
    DESCRIPTIONFR = configs[5]
    NAMEOFLINKEN = configs[6]
    NAMEOFLINKFR = configs[7]
    REPO = configs[8]
    ARCHIVED = configs[9]
    if ARCHIVED == "True":
        ARCHIVED = True
    else:
        ARCHIVED = False
    INDEVELOPMENT = configs[10]
    if INDEVELOPMENT == "True":
        INDEVELOPMENT = True
    else:
        INDEVELOPMENT = False
    EXPERIMENTAL = configs[11]
    if EXPERIMENTAL == "True":
        EXPERIMENTAL = True
    else:
        EXPERIMENTAL = False
    LINK2 = configs[12]
    if LINK2 == "None":
        LINK2 = None
    LINK2TITLEEN = configs[13]
    LINK2TITLEFR = configs[14]
    
    vidcap = cv2.VideoCapture(os.path.abspath(VIDLINK))
    success,image = vidcap.read()
    cv2.imwrite(os.path.abspath(IMGLINK), image)

    works.append(add_work(IMGLINK, VIDLINK, WORKTITLE, GITHUBLINK, DESCRIPTIONEN, DESCRIPTIONFR, NAMEOFLINKEN, NAMEOFLINKFR, REPO, ARCHIVED, INDEVELOPMENT, EXPERIMENTAL, LINK2, LINK2TITLEEN, LINK2TITLEFR))

for _ in os.listdir("./announcements"):
    announcments = []
    with open(os.path.abspath(f"./announcements/{_}/"), "r") as f:
        announcment = f.read()
    announcment = announcment.splitlines()
    for line in announcment:
        announcments.append(line.split("=")[1].strip())
    DATE = announcments[0]
    ANNOUNCMENT = announcments[1]
    ANNOUNCMENTFR = announcments[2]
    LINK = announcments[3]
    LINKTITLE = announcments[4]
    LINKTITLEFR = announcments[5]
    TITLE = announcments[6]
    TITLEFR = announcments[7]
    announcement_list.append(add_announcment(DATE, ANNOUNCMENT, ANNOUNCMENTFR, LINK, LINKTITLE, LINKTITLEFR, TITLE, TITLEFR))

works = ("\n").join(works)

with open("./templates/north.html", "r") as f:
    north = f.read()

with open("./templates/center.html", "r") as f:
    center = f.read()

with open("./templates/south.html", "r") as f:
    south = f.read()
    south = south.replace("varDATE", str(datetime.datetime.now().strftime("%Y-%m-%d")))

index = north + works + center + ("\n").join(announcement_list) + south

with open("./index.html", "w") as f:
    f.write(index)

commit_message = "Updated Build {}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

call('git add .', shell = True)
call('git commit -m "'+ commit_message +'"', shell = True)
call('git push origin main', shell = True)