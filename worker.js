const SHOW_CONFIG = {
  showName: "Battle for a Hotel",
  codename: "BFAHVSC",

  episode: 1,
  episodeTitle: "Episode 1",

  losingTeamId: "idnk",

  teams: {
    idnk: {
      name: 'Team "I Do Not Know😂✌️"',
      image: "idnk.png",

      members: [
        "pinkfedora",
        "brownfedora",
        "firey2",
        "maple",
        "telephone",
        "gamecontroller",
        "greenushanka",
        "dvd",
        "amiiboredslushcup",
        "doubletophat",
        "bfb"
      ]
    },

    stupidity: {
      name: "Stupidity",
      image: "stupidity.png",

      members: [
        "redslushcup",
        "pinkslushcup",
        "mintslushcup",
        "pumpkinspicelatte",
        "toothbrush",
        "crayon",
        "mousepants",
        "goldcoinckel",
        "scarfy",
        "nutellajar",
        "rtb"
      ]
    }
  }
};


// ============================================================
// CONSTANTS
// ============================================================

const IMAGE_BASE =
  "https://lptwzgames.neocities.org/images/voting/";

const DISCORD_URL =
  "https://discord.gg/85fwDny8J9";

// Restored Discord logo constant
const discord_logo =
  IMAGE_BASE + "bfahvslogo.png";

const DISCORD_LOGO =
  discord_logo;


// ============================================================
// FONT
// ============================================================
//
// CHANGE THIS to the actual URL of your Shag Lounge font.
//
// Example:
//
// const FONT_URL =
//   "https://lptwzgames.neocities.org/fonts/ShagLounge.ttf";
//
// If you don't have the font uploaded yet, leave it empty.
// The website will fall back to Arial.
//

const FONT_URL =
  "https://lptwzgames.neocities.org/fonts/ShagLounge.ttf";


// ============================================================
// AUDIO
// ============================================================

const AUDIO = {

  music:
    "https://www.dropbox.com/scl/fi/vxeppt603dn8puyjp5ewz/bfahquietautumn.wav?rlkey=0phw0tch3x8h4lmiazi0xx46p&st=c1friwll&raw=1",

  recommendFinish:
    "https://www.dropbox.com/scl/fi/ydcvqygyrfeydlc80k1bc/pod_search_ping_01.wav?rlkey=z0n4ivn1uw618khmqh3jyudds&st=48othi0q&raw=1",

  hover:
    "https://www.dropbox.com/scl/fi/1xw02icxgy2fuq2jngn3c/pod_cursor_move.wav?rlkey=6wbpnj0e73hooss1qb2dkm1nk&st=3kcd686f&raw=1",

  click:
    "https://www.dropbox.com/scl/fi/hz8si2ox8ydh9pohpn4t3/pod_select.wav?rlkey=5ny9eqz6jo5uopouwmglmbsuf&st=6jlqi2cx&raw=1",

  voteFinish:
    "https://www.dropbox.com/scl/fi/lulto3ccfy9hevqpsoez6/pod_appear_01.wav?rlkey=e2rtrtya4ve3tg3f2zsonbz7r&st=owe08b49&raw=1",

  favicon:
    "https://www.dropbox.com/scl/fi/38ehjsfppt07nbhgzjbn7/favicon.ico?rlkey=pafe0irs0zdvo529olanu7okn&st=sglifux9&raw=1"
};


// ============================================================
// CHARACTERS
// ============================================================

const CHARACTERS = {

  pinkfedora: {
    name: "Pink Fedora",
    image: "pinkfedora.png"
  },

  brownfedora: {
    name: "Brown Fedora",
    image: "brownfedora.png"
  },

  firey2: {
    name: "Firey 2.0",
    image: "firey2.png"
  },

  maple: {
    name: "Maple",
    image: "maple.png"
  },

  telephone: {
    name: "Telephone",
    image: "telephone.png"
  },

  gamecontroller: {
    name: "Game Controller",
    image: "gamecontroller.png"
  },

  greenushanka: {
    name: "Green Ushanka",
    image: "greenushanka.png"
  },

  dvd: {
    name: "DVD",
    image: "dvd.png"
  },

  amiiboredslushcup: {
    name: "Amiibo Red Slush Cup",
    image: "amiiboredslushcup.png"
  },

  doubletophat: {
    name: "Double Tophat",
    image: "doubletophat.png"
  },

  redslushcup: {
    name: "Red Slush Cup",
    image: "redslushcup.png"
  },

  pinkslushcup: {
    name: "Pink Slush Cup",
    image: "pinkslushcup.png"
  },

  mintslushcup: {
    name: "Mint Slush Cup",
    image: "mintslushcup.png"
  },

  pumpkinspicelatte: {
    name: "Pumpkin Spice Latte",
    image: "pumpkinspicelatte.png"
  },

  toothbrush: {
    name: "Toothbrush",
    image: "toothbrush.png"
  },

  crayon: {
    name: "Crayon",
    image: "crayon.png"
  },

  mousepants: {
    name: "Mouse Pants",
    image: "mousepants.png"
  },

  goldcoinckel: {
    name: "Gold Coinckel",
    image: "goldcoinckel.png"
  },

  scarfy: {
    name: "Scarfy",
    image: "scarfy.png"
  },

  nutellajar: {
    name: "Nutella Jar",
    image: "nutellajar.png"
  },

  rtb: {
    name: "Red Tennis Ball",
    image: "rtb.png"
  },

  bfb: {
    name: "Brazilian Furry Blocky",
    image: "bfb.png"
  }
};


// ============================================================
// FIREBASE
// ============================================================

function getDatabaseURL(env) {

  return (
    env.FIREBASE_DATABASE_URL ||
    "https://bfah-8d469-default-rtdb.firebaseio.com"
  ).replace(/\/+$/, "");

}


async function getFirebaseData(env, path) {

  const response = await fetch(
    `${getDatabaseURL(env)}/${path}.json`
  );

  if (!response.ok) {
    throw new Error(
      `Firebase read failed: ${response.status}`
    );
  }

  return response.json();

}


async function firebasePush(env, path, data) {

  const response = await fetch(
    `${getDatabaseURL(env)}/${path}.json`,
    {
      method: "POST",

      headers: {
        "content-type": "application/json"
      },

      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {

    const text =
      await response.text();

    throw new Error(
      `Firebase write failed: ${response.status} ${text}`
    );

  }

  return response.json();

}


// ============================================================
// UTILITIES
// ============================================================

function escapeHTML(value) {

  return String(value ?? "").replace(
    /[&<>"']/g,

    char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char])
  );

}


function normalizeName(value) {

  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

}


function objectValues(data) {

  return data &&
    typeof data === "object"
      ? Object.values(data)
      : [];

}


// ============================================================
// DEBUT TRACKING
// ============================================================

function getDebutedCharacterIds() {

  const ids = new Set();

  for (
    const team of Object.values(SHOW_CONFIG.teams)
  ) {

    for (const id of team.members) {

      ids.add(id);

    }

  }

  return ids;

}


function findCharacterIdByName(name) {

  const normalized =
    normalizeName(name);

  for (
    const [id, character]
    of Object.entries(CHARACTERS)
  ) {

    if (
      normalizeName(character.name)
      === normalized
    ) {

      return id;

    }

  }

  return null;

}


// ============================================================
// TEAM HELPERS
// ============================================================

function getLosingTeam() {

  return SHOW_CONFIG.teams[
    SHOW_CONFIG.losingTeamId
  ];

}


// ============================================================
// VOTE RESULTS
// ============================================================

function buildResults(votes) {

  const team =
    getLosingTeam();

  const allowed =
    new Set(team.members);

  const rows =
    objectValues(votes)
      .filter(
        v =>
          Number(v.episode)
          === SHOW_CONFIG.episode
      )
      .filter(
        v =>
          v.teamId
          === SHOW_CONFIG.losingTeamId
      )
      .filter(
        v =>
          allowed.has(v.characterId)
      );


  const counts = {};

  for (const id of team.members) {

    counts[id] = 0;

  }


  for (const vote of rows) {

    counts[vote.characterId] =
      (counts[vote.characterId] || 0) + 1;

  }


  return {

    total: rows.length,

    counts,

    recent:
      rows
        .sort(
          (a, b) =>
            Number(b.createdAt || 0)
            -
            Number(a.createdAt || 0)
        )
        .slice(0, 20)

  };

}


// ============================================================
// RECOMMENDATIONS
// ============================================================

function buildRecommendationResults(
  recommendations
) {

  const debuted =
    getDebutedCharacterIds();

  const rows =
    objectValues(recommendations)
      .filter(
        r =>
          Number(r.episode)
          === SHOW_CONFIG.episode
      );


  const unused = [];
  const debutedRows = [];


  for (const row of rows) {

    const id =
      findCharacterIdByName(
        row.characterName
      );


    if (
      id &&
      debuted.has(id)
    ) {

      debutedRows.push(row);

    } else {

      unused.push(row);

    }

  }


  const sorter =
    (a, b) =>
      Number(b.createdAt || 0)
      -
      Number(a.createdAt || 0);


  return {

    total: rows.length,

    unused:
      unused.sort(sorter),

    debuted:
      debutedRows.sort(sorter)

  };

}


// ============================================================
// VOTE HANDLER
// ============================================================

async function handleVote(
  request,
  env
) {

  const form =
    await request.formData();


  if (form.get("website")) {

    throw new Error(
      "Spam detected."
    );

  }


  const characterId =
    String(
      form.get("characterId") || ""
    ).trim();


  const nickname =
    String(
      form.get("nickname") || ""
    ).trim();


  const reason =
    String(
      form.get("reason") || ""
    ).trim();


  const team =
    getLosingTeam();


  if (
    !CHARACTERS[characterId] ||
    !team.members.includes(characterId)
  ) {

    throw new Error(
      "Please choose a character from the current losing team."
    );

  }


  if (
    !nickname ||
    nickname.length > 30
  ) {

    throw new Error(
      "Nickname is required and must be 30 characters or less."
    );

  }


  if (
    !reason ||
    reason.length > 500
  ) {

    throw new Error(
      "A reason is required and must be 500 characters or less."
    );

  }


  await firebasePush(
    env,
    "votes",

    {
      episode:
        SHOW_CONFIG.episode,

      teamId:
        SHOW_CONFIG.losingTeamId,

      characterId,

      characterName:
        CHARACTERS[characterId].name,

      nickname,

      reason,

      createdAt:
        Date.now()
    }
  );


  return json({

    ok: true,

    type: "vote",

    message:
      `Vote submitted for ${CHARACTERS[characterId].name}!`

  });

}


// ============================================================
// RECOMMENDATION HANDLER
// ============================================================

async function handleRecommendation(
  request,
  env
) {

  const form =
    await request.formData();


  if (form.get("website")) {

    throw new Error(
      "Spam detected."
    );

  }


  const characterName =
    String(
      form.get("characterName") || ""
    ).trim();


  const nickname =
    String(
      form.get("nickname") || ""
    ).trim();


  const reason =
    String(
      form.get("reason") || ""
    ).trim();


  if (
    !characterName ||
    characterName.length > 60
  ) {

    throw new Error(
      "Character name is required and must be 60 characters or less."
    );

  }


  if (
    !nickname ||
    nickname.length > 30
  ) {

    throw new Error(
      "Nickname is required and must be 30 characters or less."
    );

  }


  if (
    !reason ||
    reason.length > 500
  ) {

    throw new Error(
      "A reason is required and must be 500 characters or less."
    );

  }


  await firebasePush(
    env,
    "recommendations",

    {
      episode:
        SHOW_CONFIG.episode,

      characterName,

      nickname,

      reason,

      createdAt:
        Date.now()
    }
  );


  return json({

    ok: true,

    type: "recommendation",

    message:
      `${characterName} was recommended!`

  });

}


// ============================================================
// JSON
// ============================================================

function json(
  data,
  status = 200
) {

  return new Response(
    JSON.stringify(data),

    {
      status,

      headers: {
        "content-type":
          "application/json; charset=utf-8",

        "cache-control":
          "no-store"
      }
    }
  );

}


// ============================================================
// CHARACTER VOTING CARD
// ============================================================

function renderCharacterCard(
  id,
  checked = false
) {

  const c =
    CHARACTERS[id];


  return `

    <label class="character-card">

      <input
        type="radio"
        name="characterId"
        value="${escapeHTML(id)}"
        ${checked ? "checked" : ""}
        required
      >

      <span class="character-card-inner">

        <img
          src="${IMAGE_BASE}${escapeHTML(c.image)}"
          alt="${escapeHTML(c.name)}"
        >

        <span class="character-name">
          ${escapeHTML(c.name)}
        </span>

      </span>

    </label>

  `;

}


// ============================================================
// RESULTS HTML
// ============================================================

function renderResultsHTML(
  results
) {

  const team =
    getLosingTeam();


  const max =
    Math.max(
      1,

      ...team.members.map(
        id =>
          results.counts[id] || 0
      )
    );


  return team.members.map(
    id => {

      const c =
        CHARACTERS[id];

      const count =
        results.counts[id] || 0;

      const width =
        Math.round(
          (count / max) * 100
        );


      return `

        <div class="result-row">

          <div class="result-head">

            <span>
              ${escapeHTML(c.name)}
            </span>

            <strong>
              ${count}
            </strong>

          </div>

          <div class="bar">

            <i
              style="width:${width}%"
            ></i>

          </div>

        </div>

      `;

    }
  ).join("");

}


// ============================================================
// RECENT VOTES
// ============================================================

function renderRecentVotes(
  votes
) {

  if (!votes.length) {

    return `
      <p class="muted">
        No votes have been submitted yet.
      </p>
    `;

  }


  return votes.map(
    v => `

      <div class="recent-item">

        <b>
          ${escapeHTML(v.nickname)}
        </b>

        voted for

        <b>
          ${escapeHTML(v.characterName)}
        </b>

        <div>
          ${escapeHTML(v.reason)}
        </div>

      </div>

    `
  ).join("");

}


// ============================================================
// RECOMMENDATION LIST
// ============================================================

function renderRecommendationList(
  rows,
  emptyText
) {

  if (!rows.length) {

    return `
      <p class="muted">
        ${emptyText}
      </p>
    `;

  }


  return rows.map(
    r => `

      <div class="recommendation-item">

        <div class="recommendation-title">
          ${escapeHTML(r.characterName)}
        </div>

        <div>
          Recommended by
          <b>
            ${escapeHTML(r.nickname)}
          </b>
        </div>

        <div>
          ${escapeHTML(r.reason)}
        </div>

      </div>

    `
  ).join("");

}


// ============================================================
// TEAMS
// ============================================================
//
// IMPORTANT:
// This loops through EVERY team.
//
// Therefore contestant icons are shown even if that
// team is NOT currently up for elimination.
//

function renderTeams() {

  return Object.entries(
    SHOW_CONFIG.teams
  ).map(
    ([id, team]) => `

      <article class="team-card">

        <div class="team-heading">

          <img
            class="team-image"
            src="${IMAGE_BASE}${escapeHTML(team.image)}"
            alt="${escapeHTML(team.name)}"
          >

          <div>

            <h3>
              ${escapeHTML(team.name)}
            </h3>

            <p>
              ${team.members.length}
              contestant${team.members.length === 1 ? "" : "s"}
            </p>

          </div>

        </div>


        <div class="team-contestants">

          ${team.members.map(
            memberId => {

              const character =
                CHARACTERS[memberId];


              if (!character) {

                return "";

              }


              return `

                <div
                  class="contestant-icon"
                  title="${escapeHTML(character.name)}"
                >

                  <img
                    src="${IMAGE_BASE}${escapeHTML(character.image)}"
                    alt="${escapeHTML(character.name)}"
                  >

                  <span>
                    ${escapeHTML(character.name)}
                  </span>

                </div>

              `;

            }
          ).join("")}

        </div>

      </article>

    `
  ).join("");

}


// ============================================================
// MAIN PAGE
// ============================================================

function renderVotingPage(
  results,
  recommendations
) {

  const team =
    getLosingTeam();


  return `<!doctype html>

<html lang="en">

<head>

<meta charset="utf-8">

<meta
  name="viewport"
  content="width=device-width,initial-scale=1"
>

<title>
  ${escapeHTML(SHOW_CONFIG.showName)}
  — BFAHVSC
</title>


<link
  rel="icon"
  href="${AUDIO.favicon}"
>


<style>

/* ==========================================================
   SHAG LOUNGE FONT
   ========================================================== */

@font-face {

  font-family: "Shag Lounge";

  src:
    url("${FONT_URL}")
    format("truetype");

  font-weight: normal;

  font-style: normal;

  font-display: swap;

}


/* ==========================================================
   GENERAL
   ========================================================== */

* {
  box-sizing: border-box;
}


html {
  scroll-behavior: smooth;
}


body {

  margin: 0;

  font-family:
    "Shag Lounge",
    Arial,
    Helvetica,
    sans-serif;

  color: white;

  min-height: 100vh;

  background:

    radial-gradient(
      circle at 12% 18%,
      rgba(90,50,255,.42),
      transparent 28%
    ),

    radial-gradient(
      circle at 88% 20%,
      rgba(255,45,210,.28),
      transparent 27%
    ),

    radial-gradient(
      circle at 52% 88%,
      rgba(0,150,255,.30),
      transparent 35%
    ),

    linear-gradient(
      135deg,
      #01010a 0%,
      #080021 45%,
      #020817 100%
    );

  overflow-x: hidden;

}


/* ==========================================================
   STAR FIELD
   ========================================================== */

.starfield,
.starfield::before,
.starfield::after {

  position: fixed;

  inset: 0;

  pointer-events: none;

  content: "";

  z-index: 0;

}


.starfield {

  opacity: .9;

  background-image:

    radial-gradient(
      1px 1px at 4% 8%,
      #fff,
      transparent
    ),

    radial-gradient(
      2px 2px at 12% 72%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 19% 34%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 27% 91%,
      #fff,
      transparent
    ),

    radial-gradient(
      2px 2px at 35% 16%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 43% 61%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 51% 29%,
      #fff,
      transparent
    ),

    radial-gradient(
      2px 2px at 58% 83%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 66% 45%,
      #fff,
      transparent
    ),

    radial-gradient(
      2px 2px at 73% 9%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 81% 70%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 89% 38%,
      #fff,
      transparent
    ),

    radial-gradient(
      2px 2px at 96% 88%,
      #fff,
      transparent
    );

  background-size: 180px 180px;

  animation:
    drift 38s linear infinite;

}


.starfield::before {

  opacity: .6;

  background-image:

    radial-gradient(
      1px 1px at 8% 45%,
      #fff,
      transparent
    ),

    radial-gradient(
      2px 2px at 22% 12%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 31% 65%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 48% 94%,
      #fff,
      transparent
    ),

    radial-gradient(
      2px 2px at 63% 23%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 77% 56%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 94% 18%,
      #fff,
      transparent
    );

  background-size: 260px 260px;

  animation:
    drift2 55s linear infinite;

}


.starfield::after {

  opacity: .35;

  background-image:

    radial-gradient(
      2px 2px at 14% 26%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 39% 48%,
      #fff,
      transparent
    ),

    radial-gradient(
      2px 2px at 69% 76%,
      #fff,
      transparent
    ),

    radial-gradient(
      1px 1px at 86% 62%,
      #fff,
      transparent
    );

  background-size: 340px 340px;

  animation:
    twinkle 4s ease-in-out infinite alternate;

}


@keyframes drift {

  to {
    transform:
      translateY(180px);
  }

}


@keyframes drift2 {

  to {
    transform:
      translateY(-260px);
  }

}


@keyframes twinkle {

  from {
    opacity: .18;
  }

  to {
    opacity: .55;
  }

}


/* ==========================================================
   CONTENT LAYER
   ========================================================== */

header,
main,
.music-button,
.discord-button {

  position: relative;

  z-index: 1;

}


/* ==========================================================
   HEADER
   ========================================================== */

header {

  text-align: center;

  padding:
    48px
    18px
    30px;

  background:
    linear-gradient(
      180deg,
      rgba(7,3,30,.78),
      rgba(7,3,30,.05)
    );

}


header h1 {

  margin: 0;

  font-size:
    clamp(
      2rem,
      7vw,
      4rem
    );

  text-shadow:
    0 0 22px #8b5cff;

}


header p {

  margin:
    10px 0;

  color:
    #cfd5ff;

}


/* ==========================================================
   MAIN
   ========================================================== */

main {

  width:
    min(
      1050px,
      calc(100% - 24px)
    );

  margin:
    auto;

  padding-bottom:
    100px;

}


/* ==========================================================
   PANELS
   ========================================================== */

.panel {

  background:
    linear-gradient(
      145deg,
      rgba(24,14,65,.92),
      rgba(7,10,34,.94)
    );

  border:
    2px solid
    rgba(255,255,255,.72);

  border-radius:
    18px;

  padding:
    24px;

  margin-bottom:
    26px;

  box-shadow:

    0 0 28px
    rgba(100,70,255,.28),

    7px 7px 0
    rgba(0,0,0,.7);

  backdrop-filter:
    blur(9px);

}


h2 {

  margin-top:
    0;

}


h3 {

  margin:
    4px 0 8px;

}


.muted {

  color:
    #aeb6dd;

}


/* ==========================================================
   TEAMS
   ========================================================== */

.team-grid {

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(300px, 1fr)
    );

  gap:
    18px;

}


.team-card {

  padding:
    15px;

  border-radius:
    14px;

  background:
    rgba(255,255,255,.06);

  border:
    1px solid
    rgba(255,255,255,.15);

}


.team-heading {

  display:
    flex;

  gap:
    16px;

  align-items:
    center;

  margin-bottom:
    15px;

}


.team-image {

  width:
    120px;

  height:
    90px;

  object-fit:
    contain;

}


.team-card p {

  color:
    #cbd0ee;

  line-height:
    1.45;

}


/* ==========================================================
   ALL CONTESTANT ICONS
   ========================================================== */

.team-contestants {

  display:
    grid;

  grid-template-columns:
    repeat(
      auto-fill,
      minmax(82px, 1fr)
    );

  gap:
    10px;

  border-top:
    1px solid
    rgba(255,255,255,.12);

  padding-top:
    14px;

}


.contestant-icon {

  text-align:
    center;

  padding:
    7px 4px;

  border-radius:
    10px;

  background:
    rgba(0,0,0,.2);

  border:
    1px solid
    rgba(255,255,255,.08);

  transition:
    transform .15s ease,
    background .15s ease,
    border-color .15s ease;

}


.contestant-icon:hover {

  transform:
    translateY(-3px);

  background:
    rgba(120,80,255,.18);

  border-color:
    rgba(170,140,255,.6);

}


.contestant-icon img {

  display:
    block;

  width:
    64px;

  height:
    64px;

  margin:
    0 auto 5px;

  object-fit:
    contain;

}


.contestant-icon span {

  display:
    block;

  font-size:
    .72rem;

  line-height:
    1.1;

  word-break:
    break-word;

  color:
    #e3e6ff;

}


/* ==========================================================
   VOTING CHARACTERS
   ========================================================== */

.character-grid {

  display:
    grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(150px, 1fr)
    );

  gap:
    12px;

}


.character-card {

  cursor:
    pointer;

}


.character-card input {

  position:
    absolute;

  opacity:
    0;

}


.character-card-inner {

  min-height:
    165px;

  display:
    flex;

  flex-direction:
    column;

  align-items:
    center;

  justify-content:
    center;

  text-align:
    center;

  padding:
    12px;

  border:
    2px solid
    rgba(255,255,255,.15);

  border-radius:
    14px;

  background:
    rgba(255,255,255,.055);

  transition:
    .15s;

}


.character-card-inner:hover {

  transform:
    translateY(-3px);

  border-color:
    #a88cff;

  background:
    rgba(130,90,255,.18);

}


.character-card input:checked
+ .character-card-inner {

  border-color:
    #8effc4;

  background:
    rgba(45,210,130,.18);

  box-shadow:
    0 0 18px
    rgba(90,255,180,.2);

}


.character-card img {

  width:
    105px;

  height:
    105px;

  object-fit:
    contain;

}


.character-name {

  font-weight:
    bold;

  margin-top:
    6px;

}


/* ==========================================================
   FORMS
   ========================================================== */

label.field {

  display:
    block;

  margin:
    14px 0;

}


.field span {

  display:
    block;

  margin-bottom:
    6px;

  font-weight:
    bold;

}


input[type=text],
textarea {

  width:
    100%;

  border:
    2px solid
    rgba(255,255,255,.18);

  border-radius:
    10px;

  padding:
    11px;

  background:
    rgba(0,0,0,.3);

  color:
    white;

  font:
    inherit;

  outline:
    none;

}


input[type=text]:focus,
textarea:focus {

  border-color:
    #9d7cff;

}


textarea {

  min-height:
    110px;

  resize:
    vertical;

}


/* ==========================================================
   BUTTONS
   ========================================================== */

button,
.music-button {

  border:
    0;

  border-radius:
    10px;

  padding:
    12px 18px;

  font-weight:
    bold;

  cursor:
    pointer;

  background:
    linear-gradient(
      135deg,
      #7c5cff,
      #c34cff
    );

  color:
    #fff;

  box-shadow:
    0 5px 0
    rgba(0,0,0,.35);

}


button:hover,
.music-button:hover {

  filter:
    brightness(1.15);

  transform:
    translateY(-1px);

}


button:active,
.music-button:active {

  transform:
    translateY(2px);

  box-shadow:
    0 2px 0
    rgba(0,0,0,.35);

}


button:disabled {

  opacity:
    .6;

  cursor:
    wait;

}


/* ==========================================================
   RESULTS
   ========================================================== */

.results-total {

  font-size:
    1.1rem;

  margin-bottom:
    18px;

}


.result-row {

  margin:
    13px 0;

}


.result-head {

  display:
    flex;

  justify-content:
    space-between;

  margin-bottom:
    5px;

}


.bar {

  height:
    15px;

  border-radius:
    99px;

  background:
    rgba(255,255,255,.1);

  overflow:
    hidden;

}


.bar i {

  display:
    block;

  height:
    100%;

  border-radius:
    99px;

  background:
    linear-gradient(
      90deg,
      #6e4dff,
      #ff5bcf
    );

}


/* ==========================================================
   RECENT / RECOMMENDATIONS
   ========================================================== */

.recent-item,
.recommendation-item {

  margin:
    10px 0;

  padding:
    12px;

  border-left:
    4px solid
    #8b6cff;

  background:
    rgba(255,255,255,.055);

  border-radius:
    8px;

}


.recent-item div,
.recommendation-item div {

  margin-top:
    5px;

  color:
    #cbd0ee;

}


.recommendation-title {

  font-size:
    1.15rem;

  font-weight:
    bold;

  color:
    #fff;

}


.split {

  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    18px;

}


/* ==========================================================
   FIXED BUTTONS
   ========================================================== */

.music-button {

  position:
    fixed;

  bottom:
    18px;

  left:
    18px;

  z-index:
    20;

}


.discord-button {

  position:
    fixed;

  bottom:
    18px;

  right:
    18px;

  z-index:
    20;

  width:
    58px;

  height:
    58px;

  border-radius:
    50%;

  padding:
    5px;

  background:
    #5865f2;

  box-shadow:
    0 0 20px
    rgba(88,101,242,.55);

}


.discord-button img {

  width:
    100%;

  height:
    100%;

  object-fit:
    contain;

  border-radius:
    50%;

}



/* ==========================================================
   WIIMOTE MII POPUP
   ========================================================== */

.wiimote-button {
  position: fixed;
  right: 88px;
  bottom: 18px;
  z-index: 20;
  width: 64px;
  height: 64px;
  padding: 3px;
  border: 2px solid rgba(255,255,255,.75);
  border-radius: 15px;
  background: rgba(15,10,40,.92);
  box-shadow: 0 0 20px rgba(130,100,255,.45);
  display: grid;
  place-items: center;
}

.wiimote-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
}

.wiimote-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(0,0,10,.82);
  backdrop-filter: blur(8px);
}

.wiimote-modal.open {
  display: flex;
  animation: wiimote-backdrop-in .28s ease-out both;
}

@keyframes wiimote-backdrop-in {
  from { opacity: 0; backdrop-filter: blur(0); }
  to { opacity: 1; backdrop-filter: blur(8px); }
}

@keyframes wiimote-panel-in {
  0% { opacity: 0; transform: translateY(28px) scale(.88) rotateX(7deg); }
  70% { opacity: 1; transform: translateY(-4px) scale(1.015) rotateX(0); }
  100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); }
}

@keyframes wiimote-card-in {
  from { opacity: 0; transform: translateY(18px) scale(.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes wiimote-render-float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
}

@keyframes wiimote-qr-glow {
  0%, 100% { box-shadow: 0 0 0 rgba(190,170,255,0); }
  50% { box-shadow: 0 0 22px rgba(190,170,255,.38); }
}

@keyframes wiimote-soul-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: .8; }
  50% { transform: translateY(-12px) scale(1.12); opacity: 1; }
}

.wiimote-modal-panel {
  animation: wiimote-panel-in .48s cubic-bezier(.2,.8,.2,1) both;
  transform-origin: center;
}

.wiimote-mii-card {
  animation: wiimote-card-in .5s ease-out both;
}
.wiimote-mii-card:nth-child(2) {
  animation-delay: .12s;
}

.wiimote-mii-card .mii-render {
  animation: wiimote-render-float 3.2s ease-in-out infinite;
  filter: drop-shadow(0 0 9px rgba(180,160,255,.28));
}

.wiimote-mii-card .mii-qr {
  animation: wiimote-qr-glow 2.8s ease-in-out infinite;
  border: 2px solid rgba(210,200,255,.35);
  background: white;
  padding: 7px;
}

.wiimote-soul {
  position: absolute;
  top: 17px;
  left: 22px;
  width: 25px;
  height: 25px;
  color: #ff526e;
  font-size: 25px;
  line-height: 1;
  filter: drop-shadow(0 0 8px rgba(255,65,100,.9));
  pointer-events: none;
  animation: wiimote-soul-float 1.65s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .wiimote-modal.open,
  .wiimote-modal-panel,
  .wiimote-mii-card,
  .wiimote-mii-card .mii-render,
  .wiimote-mii-card .mii-qr,
  .wiimote-soul {
    animation: none !important;
  }
}

.wiimote-modal-panel {
  position: relative;
  width: min(900px, 100%);
  max-height: min(90vh, 900px);
  overflow-y: auto;
  padding: 24px;
  border: 2px solid rgba(255,255,255,.65);
  border-radius: 20px;
  color: white;
  background: linear-gradient(145deg, rgba(24,14,65,.98), rgba(7,10,34,.99));
  box-shadow: 0 0 38px rgba(120,80,255,.4);
}

.wiimote-modal-panel h2 {
  padding-right: 42px;
  margin-bottom: 8px;
}

.wiimote-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 42px;
  height: 42px;
  padding: 0;
  font-size: 1.4rem;
}

.wiimote-mii-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.wiimote-mii-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 14px;
  background: rgba(255,255,255,.055);
  text-align: center;
}

.wiimote-mii-card h3 {
  margin-top: 0;
}

.wiimote-mii-card img {
  display: block;
  width: 100%;
  max-width: 320px;
  max-height: 320px;
  object-fit: contain;
  margin: 12px auto;
  border-radius: 8px;
}

.wiimote-mii-card .mii-render {
  max-height: 260px;
}

.wiimote-mii-card p {
  color: #cbd0ee;
  overflow-wrap: anywhere;
}

.wiimote-mii-link {
  color: #c9baff;
  font-weight: bold;
}

@media (max-width: 650px) {
  .wiimote-button {
    right: 88px;
    bottom: 18px;
    width: 58px;
    height: 58px;
  }
  .wiimote-modal-panel {
    padding: 18px;
  }
  .wiimote-mii-grid {
    grid-template-columns: 1fr;
  }
}

.pronoun-cycle {
  display: inline-block;
  min-width: 2.1em;
  text-align: center;
  transition: opacity .16s ease;
}

/* ==========================================================
   TOP-LEFT NOTIFICATION
   ========================================================== */

.toast {

  position:
    fixed;

  top:
    16px;

  left:
    16px;

  z-index:
    100;

  max-width:
    min(
      390px,
      calc(100vw - 32px)
    );

  padding:
    13px 16px;

  border-radius:
    12px;

  color:
    #fff;

  font-weight:
    bold;

  background:
    rgba(12,8,32,.95);

  border:
    2px solid
    #8d6cff;

  box-shadow:
    0 8px 30px
    rgba(0,0,0,.45);

  transform:
    translateX(-130%);

  opacity:
    0;

  transition:
    .25s;

  pointer-events:
    none;

}


.toast.show {

  transform:
    translateX(0);

  opacity:
    1;

}


.toast.success {

  border-color:
    #70ffb0;

}


.toast.error {

  border-color:
    #ff6b83;

}


/* ==========================================================
   SPAM HONEYPOT
   ========================================================== */

.hidden-spam {

  position:
    absolute;

  left:
    -10000px;

  opacity:
    0;

}


/* ==========================================================
   MOBILE
   ========================================================== */

@media (max-width: 700px) {

  .split {

    grid-template-columns:
      1fr;

  }


  .team-image {

    width:
      95px;

    height:
      75px;

  }


  .panel {

    padding:
      17px;

  }


  .character-grid {

    grid-template-columns:
      repeat(
        2,
        1fr
      );

  }


  .team-contestants {

    grid-template-columns:
      repeat(
        3,
        1fr
      );

  }

}

</style>

</head>


<body>


<!-- ========================================================
     STAR FIELD
     ======================================================== -->

<div class="starfield"></div>


<!-- ========================================================
     HEADER
     ======================================================== -->

<header>

  <h1>
    ${escapeHTML(SHOW_CONFIG.showName)}
  </h1>

  <p>
    ${escapeHTML(SHOW_CONFIG.codename)}
    •
    ${escapeHTML(SHOW_CONFIG.episodeTitle)}
  </p>

</header>


<main>


<!-- ========================================================
     TEAMS
     ======================================================== -->

<section class="panel">

  <h2>
    Teams
  </h2>

  <div class="team-grid">

    ${renderTeams()}

  </div>

</section>


<!-- ========================================================
     VOTING
     ======================================================== -->

<section
  class="panel"
  id="vote-panel"
>

  <h2>
    Vote to eliminate a character
  </h2>

  <p>

    Current losing team:

    <b>
      ${escapeHTML(team.name)}
    </b>

  </p>


  <form id="vote-form">


    <div class="character-grid">

      ${team.members
        .map(
          id =>
            renderCharacterCard(id)
        )
        .join("")}

    </div>


    <label class="field">

      <span>
        Your nickname
      </span>

      <input
        type="text"
        name="nickname"
        maxlength="30"
        required
      >

    </label>


    <label class="field">

      <span id="elimination-question">
        Why should <span id="elimination-pronoun">they</span> be eliminated?
      </span>

      <textarea
        name="reason"
        maxlength="500"
        required
      ></textarea>

    </label>


    <input
      class="hidden-spam"
      name="website"
      tabindex="-1"
      autocomplete="off"
    >


    <button
      type="submit"
    >
      Submit Vote
    </button>


  </form>

</section>


<!-- ========================================================
     RESULTS
     ======================================================== -->

<section class="panel">

  <h2>
    Current Results
  </h2>


  <div
    id="results-total"
    class="results-total"
  >

    <b>
      ${results.total}
    </b>

    vote(s)

  </div>


  <div id="results-list">

    ${renderResultsHTML(results)}

  </div>

</section>


<!-- ========================================================
     RECENT VOTES
     ======================================================== -->

<section class="panel">

  <h2>
    Recent Votes
  </h2>


  <div id="recent-votes">

    ${renderRecentVotes(results.recent)}

  </div>

</section>


<!-- ========================================================
     RECOMMENDATIONS
     ======================================================== -->

<section class="panel">

  <h2>
    Recommend a character
  </h2>


  <p>

    Recommend a character for BFAHotel.
    They do not have to be a current contestant.

  </p>


  <form id="recommend-form">


    <label class="field">

      <span>
        Character name
      </span>

      <input
        type="text"
        name="characterName"
        maxlength="60"
        required
      >

    </label>


    <label class="field">

      <span>
        Your nickname
      </span>

      <input
        type="text"
        name="nickname"
        maxlength="30"
        required
      >

    </label>


    <label class="field">

      <span>
        Why should they be recommended?
      </span>

      <textarea
        name="reason"
        maxlength="500"
        required
      ></textarea>

    </label>


    <input
      class="hidden-spam"
      name="website"
      tabindex="-1"
      autocomplete="off"
    >


    <button
      type="submit"
    >
      Recommend Character
    </button>


  </form>

</section>


<!-- ========================================================
     RECOMMENDATION RESULTS
     ======================================================== -->

<section class="panel">

  <h2>
    Recommended Characters
  </h2>


  <div class="split">


    <div>

      <h3>
        Unused Recommended Characters
      </h3>


      <div id="unused-recommendations">

        ${renderRecommendationList(
          recommendations.unused,
          "No unused recommendations yet."
        )}

      </div>

    </div>


    <div>

      <h3>
        Recommended Characters Who Have Debuted
      </h3>


      <div id="debuted-recommendations">

        ${renderRecommendationList(
          recommendations.debuted,
          "No recommended characters have debuted yet."
        )}

      </div>

    </div>


  </div>

</section>


</main>


<!-- ========================================================
     FIXED BUTTONS
     ======================================================== -->

<button
  class="music-button"
  id="music-button"
>
  ♫ Music: Off
</button>


<a
  class="discord-button"
  href="${DISCORD_URL}"
  target="_blank"
  rel="noopener"
  title="BFAH Discord"
>

  <img
    src="${DISCORD_LOGO}"
    alt="Discord"
  >

</a>


<!-- ========================================================
     WIIMOTE'S OFFICIAL MII POPUP
     ======================================================== -->

<button
  class="wiimote-button"
  id="wiimote-button"
  type="button"
  title="See Wiimote's official Mii from the episode"
  aria-label="See Wiimote's official Mii from the episode"
  aria-haspopup="dialog"
  aria-controls="wiimote-modal"
>
  <img
    src="${IMAGE_BASE}wiimote.gif"
    alt="Wiimote's Mii"
  >
</button>

<div
  class="wiimote-modal"
  id="wiimote-modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="wiimote-modal-title"
>
  <section class="wiimote-modal-panel">
    <span class="wiimote-soul" aria-hidden="true">♥</span>
    <button
      class="wiimote-close"
      id="wiimote-close"
      type="button"
      aria-label="Close Mii popup"
      title="Close"
    >×</button>

    <h2 id="wiimote-modal-title">Wiimote's Official Mii</h2>
    <p class="muted">
      The host Wiimote's official Mii seen in the episode. Scan the QR code for the version that matches your device or Mii creator.
    </p>

    <div class="wiimote-mii-grid">
      <article class="wiimote-mii-card">
        <h3>Mii Creator QR Code</h3>
        <p>For the Mii creator at <a class="wiimote-mii-link" href="https://mii.nxw.pw/" target="_blank" rel="noopener">mii.nxw.pw</a>.</p>
        <img class="mii-qr" src="${IMAGE_BASE}WiimoteMiiCreator.png" alt="QR code for Wiimote's Mii in the Mii creator">
        <img class="mii-render" src="${IMAGE_BASE}wiimotemcrender.png" alt="Render of Wiimote's Mii from the Mii creator">
      </article>

      <article class="wiimote-mii-card">
        <h3>Console QR Code</h3>
        <p>For supported consoles: 3DS, Wii U, and Switch 2.</p>
        <img class="mii-qr" src="${IMAGE_BASE}wiimotesw2.png" alt="QR code for Wiimote's Mii on consoles">
        <img class="mii-render" src="${IMAGE_BASE}wiimotesw2render.png" alt="Render of Wiimote's Mii on consoles">
      </article>
    </div>
  </section>
</div>


<!-- ========================================================
     TOAST
     ======================================================== -->

<div
  class="toast"
  id="toast"
></div>


<!-- ========================================================
     AUDIO
     ======================================================== -->

<audio
  id="music"
  loop
  preload="none"
  src="${AUDIO.music}"
></audio>


<audio
  id="hover-sound"
  preload="none"
  src="${AUDIO.hover}"
></audio>


<audio
  id="click-sound"
  preload="none"
  src="${AUDIO.click}"
></audio>


<audio
  id="vote-finish"
  preload="none"
  src="${AUDIO.voteFinish}"
></audio>


<audio
  id="recommend-finish"
  preload="none"
  src="${AUDIO.recommendFinish}"
></audio>


<!-- ========================================================
     JAVASCRIPT
     ======================================================== -->

<script>

const $ =
  selector =>
    document.querySelector(selector);


// ==========================================================
// CHARACTER-SPECIFIC VOTING PRONOUNS
// ==========================================================
// Default character genders/pronouns supplied for BFAHotel.
// Pink Fedora, Pink Slush Cup, Scarfy, and Crayon use she/her.
// Red Slush Cup, Amiibo Red Slush Cup, and Mint Slush Cup
// cycle only the pronoun word through they / he / she.

const SHE_PRONOUN_CHARACTERS = new Set([
  "pinkfedora",
  "pinkslushcup",
  "scarfy",
  "crayon"
]);

const ANY_PRONOUN_CHARACTERS = new Set([
  "redslushcup",
  "amiiboredslushcup",
  "mintslushcup"
]);

const ANY_PRONOUN_CYCLE = ["they", "he", "she"];
let pronounCycleTimer = null;
let pronounCycleIndex = 0;

function updateEliminationQuestion() {
  const selected = $('input[name="characterId"]:checked');
  const pronoun = $("#elimination-pronoun");
  if (!pronoun) return;

  if (pronounCycleTimer !== null) {
    clearInterval(pronounCycleTimer);
    pronounCycleTimer = null;
  }

  pronoun.classList.remove("pronoun-cycle");
  pronoun.style.opacity = "1";

  if (!selected) {
    pronoun.textContent = "they";
    return;
  }

  const id = selected.value;
  if (ANY_PRONOUN_CHARACTERS.has(id)) {
    pronounCycleIndex = 0;
    pronoun.textContent = ANY_PRONOUN_CYCLE[pronounCycleIndex];
    pronoun.classList.add("pronoun-cycle");

    pronounCycleTimer = setInterval(() => {
      pronoun.style.opacity = "0";
      window.setTimeout(() => {
        pronounCycleIndex = (pronounCycleIndex + 1) % ANY_PRONOUN_CYCLE.length;
        pronoun.textContent = ANY_PRONOUN_CYCLE[pronounCycleIndex];
        pronoun.style.opacity = "1";
      }, 160);
    }, 1150);
    return;
  }

  pronoun.textContent = SHE_PRONOUN_CHARACTERS.has(id) ? "she" : "he";
}

document.querySelectorAll('input[name="characterId"]').forEach(input => {
  input.addEventListener("change", updateEliminationQuestion);
});
updateEliminationQuestion();


// ==========================================================
// SOUND
// ==========================================================

function playSound(id) {

  const audio =
    document.getElementById(id);

  if (!audio) return;


  audio.currentTime = 0;

  audio
    .play()
    .catch(() => {});

}


// ==========================================================
// TOAST
// ==========================================================

function showToast(
  message,
  type = "success",
  soundId = null
) {

  const toast =
    $("#toast");


  toast.textContent =
    message;


  toast.className =
    "toast show " + type;


  if (soundId) {

    playSound(soundId);

  }


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(
      () =>
        toast.classList.remove(
          "show"
        ),

      4200
    );

}


// ==========================================================
// HOVER SOUND
// ==========================================================

document
  .querySelectorAll(
    "button,.character-card-inner,.contestant-icon,.discord-button,.wiimote-button"
  )
  .forEach(
    element => {

      element.addEventListener(
        "mouseenter",
        () =>
          playSound(
            "hover-sound"
          )
      );

    }
  );


// ==========================================================
// CLICK SOUND
// ==========================================================

document
  .querySelectorAll(
    "button"
  )
  .forEach(
    element => {

      element.addEventListener(
        "click",
        () =>
          playSound(
            "click-sound"
          )
      );

    }
  );


// ==========================================================
// MUSIC
// ==========================================================

$("#music-button")
  .addEventListener(
    "click",

    async () => {

      const music =
        $("#music");

      const button =
        $("#music-button");


      if (music.paused) {

        try {

          await music.play();

          button.textContent =
            "♫ Music: On";

        } catch {

          showToast(
            "Tap the music button again to allow music.",
            "error"
          );

        }

      } else {

        music.pause();

        button.textContent =
          "♫ Music: Off";

      }

    }
  );


// ==========================================================
// WIIMOTE MII POPUP
// ==========================================================

const wiimoteModal = $("#wiimote-modal");

function openWiimotePopup() {
  wiimoteModal.classList.add("open");
  $("#wiimote-close").focus();
}

function closeWiimotePopup() {
  wiimoteModal.classList.remove("open");
  $("#wiimote-button").focus();
}

$("#wiimote-button").addEventListener("click", openWiimotePopup);
$("#wiimote-close").addEventListener("click", closeWiimotePopup);

wiimoteModal.addEventListener("click", event => {
  if (event.target === wiimoteModal) {
    closeWiimotePopup();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && wiimoteModal.classList.contains("open")) {
    closeWiimotePopup();
  }
});


// ==========================================================
// REFRESH RESULTS
// ==========================================================

async function refreshData() {

  const [
    resultsResponse,
    recommendationsResponse
  ] = await Promise.all([

    fetch(
      "/results",
      {
        cache:
          "no-store"
      }
    ),

    fetch(
      "/recommendations",
      {
        cache:
          "no-store"
      }
    )

  ]);


  if (
    !resultsResponse.ok ||
    !recommendationsResponse.ok
  ) {

    throw new Error(
      "Could not refresh results."
    );

  }


  const results =
    await resultsResponse.json();


  const recommendations =
    await recommendationsResponse.json();


  $("#results-total")
    .innerHTML =
      "<b>" +
      results.total +
      "</b> vote(s)";


  $("#results-list")
    .innerHTML =
      results.html;


  $("#recent-votes")
    .innerHTML =
      results.recentHtml;


  $("#unused-recommendations")
    .innerHTML =
      recommendations.unusedHtml;


  $("#debuted-recommendations")
    .innerHTML =
      recommendations.debutedHtml;

}


// ==========================================================
// FORM SUBMISSION
// ==========================================================

async function submitForm(
  form,
  url,
  finishSound,
  successFallback
) {

  const button =
    form.querySelector(
      'button[type="submit"]'
    );


  button.disabled =
    true;


  const original =
    button.textContent;


  button.textContent =
    "Submitting...";


  try {

    const response =
      await fetch(
        url,

        {
          method:
            "POST",

          body:
            new FormData(form)
        }
      );


    const data =
      await response
        .json()
        .catch(
          () => ({
            ok: false,

            message:
              "Server returned an invalid response."
          })
        );


    if (
      !response.ok ||
      !data.ok
    ) {

      throw new Error(
        data.message ||
        "Submission failed."
      );

    }


    form.reset();


    showToast(
      data.message ||
      successFallback,

      "success",

      finishSound
    );


    await refreshData();


  } catch (error) {

    showToast(
      error.message ||
      "Something went wrong.",

      "error"
    );


  } finally {

    button.disabled =
      false;

    button.textContent =
      original;

  }

}


// ==========================================================
// VOTE FORM
// ==========================================================

$("#vote-form")
  .addEventListener(
    "submit",

    event => {

      event.preventDefault();


      submitForm(
        event.currentTarget,

        "/vote",

        "vote-finish",

        "Vote submitted!"
      );

    }
  );


// ==========================================================
// RECOMMENDATION FORM
// ==========================================================

$("#recommend-form")
  .addEventListener(
    "submit",

    event => {

      event.preventDefault();


      submitForm(
        event.currentTarget,

        "/recommend",

        "recommend-finish",

        "Recommendation submitted!"
      );

    }
  );

</script>


</body>

</html>`;

}


// ============================================================
// STATUS API
// ============================================================

async function handleStatus(env) {

  try {

    const [
      votes,
      recommendations
    ] = await Promise.all([

      getFirebaseData(
        env,
        "votes"
      ),

      getFirebaseData(
        env,
        "recommendations"
      )

    ]);


    return json({

      ok: true,

      episode:
        SHOW_CONFIG.episode,

      episodeTitle:
        SHOW_CONFIG.episodeTitle,

      voteCount:
        buildResults(votes).total,

      recommendationCount:
        buildRecommendationResults(
          recommendations
        ).total

    });


  } catch (error) {

    return json(
      {
        ok: false,
        error: error.message
      },
      500
    );

  }

}


// ============================================================
// RESULTS API
// ============================================================

async function handleResultsAPI(env) {

  const votes =
    await getFirebaseData(
      env,
      "votes"
    );


  const results =
    buildResults(votes);


  return json({

    ok: true,

    total:
      results.total,

    counts:
      results.counts,

    html:
      renderResultsHTML(
        results
      ),

    recentHtml:
      renderRecentVotes(
        results.recent
      )

  });

}


// ============================================================
// RECOMMENDATIONS API
// ============================================================

async function handleRecommendationsAPI(
  env
) {

  const recommendations =
    await getFirebaseData(
      env,
      "recommendations"
    );


  const results =
    buildRecommendationResults(
      recommendations
    );


  return json({

    ok: true,

    total:
      results.total,

    unusedCount:
      results.unused.length,

    debutedCount:
      results.debuted.length,

    unusedHtml:
      renderRecommendationList(
        results.unused,
        "No unused recommendations yet."
      ),

    debutedHtml:
      renderRecommendationList(
        results.debuted,
        "No recommended characters have debuted yet."
      )

  });

}


// ============================================================
// CLOUDFLARE WORKER
// ============================================================

export default {

  async fetch(
    request,
    env
  ) {

    const url =
      new URL(request.url);


    const method =
      request.method.toUpperCase();


    try {


      // ------------------------------------------------------
      // MAIN PAGE
      // ------------------------------------------------------

      if (
        method === "GET" &&
        url.pathname === "/"
      ) {

        const [
          votes,
          recommendations
        ] = await Promise.all([

          getFirebaseData(
            env,
            "votes"
          ),

          getFirebaseData(
            env,
            "recommendations"
          )

        ]);


        return new Response(

          renderVotingPage(
            buildResults(votes),

            buildRecommendationResults(
              recommendations
            )
          ),

          {

            headers: {

              "content-type":
                "text/html; charset=utf-8",

              "cache-control":
                "no-store"

            }

          }

        );

      }


      // ------------------------------------------------------
      // VOTE
      // ------------------------------------------------------

      if (
        method === "POST" &&
        url.pathname === "/vote"
      ) {

        return await handleVote(
          request,
          env
        );

      }


      // ------------------------------------------------------
      // RECOMMENDATION
      // ------------------------------------------------------

      if (
        method === "POST" &&
        url.pathname === "/recommend"
      ) {

        return await handleRecommendation(
          request,
          env
        );

      }


      // ------------------------------------------------------
      // RESULTS
      // ------------------------------------------------------

      if (
        method === "GET" &&
        url.pathname === "/results"
      ) {

        return await handleResultsAPI(
          env
        );

      }


      // ------------------------------------------------------
      // RECOMMENDATIONS
      // ------------------------------------------------------

      if (
        method === "GET" &&
        url.pathname === "/recommendations"
      ) {

        return await handleRecommendationsAPI(
          env
        );

      }


      // ------------------------------------------------------
      // STATUS
      // ------------------------------------------------------

      if (
        method === "GET" &&
        url.pathname === "/status"
      ) {

        return await handleStatus(
          env
        );

      }


      return new Response(
        "Not Found",
        {
          status: 404
        }
      );


    } catch (error) {

      return json(

        {
          ok: false,

          message:
            error.message ||
            "Something went wrong."
        },

        500

      );

    }

  }

};
