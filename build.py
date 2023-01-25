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
                        <video preload="metadata" loop playsinline muted webkit-playsinline="true">
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

works = []
announcement_list = []
for _ in os.listdir("./projects"):
    configs = []
    project_title = _
    with open(f"./projects/{project_title}/config.toml", "r", encoding="utf-8") as f:
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
    if vidcap.isOpened():
        success,image = vidcap.read()
        if success:
            cv2.imwrite(os.path.abspath(IMGLINK), image)
    vidcap.release()

    works.append(add_work(IMGLINK, VIDLINK, WORKTITLE, GITHUBLINK, DESCRIPTIONEN, DESCRIPTIONFR, NAMEOFLINKEN, NAMEOFLINKFR, REPO, ARCHIVED, INDEVELOPMENT, EXPERIMENTAL, LINK2, LINK2TITLEEN, LINK2TITLEFR))

works = ("\n").join(works)

with open("./templates/north.html", "r", encoding="utf-8") as f:
    north = f.read()

with open("./templates/south.html", "r", encoding="utf-8") as f:
    south = f.read()
    south = south.replace("varDATE", str(datetime.datetime.now().strftime("%Y-%m-%d")))

index = north + works + south

with open("./index.html", "w", encoding="utf-8") as f:
    f.write(index)

commit_message = "Updated Build {}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

call('git add .', shell = True)
call('git commit -m "'+ commit_message +'"', shell = True)
call('git push origin main', shell = True)