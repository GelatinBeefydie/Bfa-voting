// ============================================================
// BFAHVSC - Battle For a Hotel Voting System (and) Counter
// Cloudflare Worker + Firebase Realtime Database
// ============================================================

// =========================
// CONFIGURATION / EDITOR
// =========================

const FIREBASE_DB_URL =
  "https://bfah-8d469-default-rtdb.firebaseio.com";

const IMAGE_BASE =
  "https://lptwzgames.neocities.org/images/voting/";

const EPISODE = 1;

// Discord
const discord_logo =
  IMAGE_BASE + "bfahvslogo.png";

const DISCORD_URL =
  "https://discord.gg/85fwDny8J9";

// ============================================================
// TEAM EDITOR
// ============================================================
//
// To change teams for a new episode, edit these arrays.
//
// IMPORTANT:
// Characters placed here are already debuted.
// They should NOT also be placed in
// UNUSED_RECOMMENDED_CHARACTERS.
//

const TEAMS = {

  stupidity: {
    name: 'Team Stupidity',
    image: IMAGE_BASE + 'stupidity.png',

    members: [

      {
        id: "redslushcup",
        name: "Red Slush Cup",
        image: IMAGE_BASE + "redslushcup.png"
      },

      {
        id: "pinkslushcup",
        name: "Pink Slush Cup",
        image: IMAGE_BASE + "pinkslushcup.png"
      },

      {
        id: "mintslushcup",
        name: "Mint Slush Cup",
        image: IMAGE_BASE + "mintslushcup.png"
      },

      {
        id: "pumpkinspicelatte",
        name: "Pumpkin Spice Latte",
        image: IMAGE_BASE + "pumpkinspicelatte.png"
      },

      {
        id: "toothbrush",
        name: "Toothbrush",
        image: IMAGE_BASE + "toothbrush.png"
      },

      {
        id: "crayon",
        name: "Crayon",
        image: IMAGE_BASE + "crayon.png"
      },

      {
        id: "mousepants",
        name: "Mouse Pants",
        image: IMAGE_BASE + "mousepants.png"
      },

      {
        id: "goldcoinckel",
        name: "Gold Coinckel",
        image: IMAGE_BASE + "goldcoinckel.png"
      },

      {
        id: "scarfy",
        name: "Scarfy",
        image: IMAGE_BASE + "scarfy.png"
      },

      {
        id: "nutellajar",
        name: "Nutella Jar",
        image: IMAGE_BASE + "nutellajar.png"
      },

      // NEW CHARACTER
      {
        id: "rtb",
        name: "Red Tennis Ball",
        image: IMAGE_BASE + "rtb.png"
      }

    ]
  },

  idnk: {
    name: 'Team "I Do Not Know😂✌️"',
    image: null,

    members: [

      {
        id: "pinkfedora",
        name: "Pink Fedora",
        image: IMAGE_BASE + "pinkfedora.png"
      },

      {
        id: "brownfedora",
        name: "Brown Fedora",
        image: IMAGE_BASE + "brownfedora.png"
      },

      {
        id: "firey20",
        name: "Firey 2.0",
        image: IMAGE_BASE + "firey20.png"
      },

      {
        id: "maple",
        name: "Maple",
        image: IMAGE_BASE + "maple.png"
      },

      {
        id: "telephone",
        name: "Telephone",
        image: IMAGE_BASE + "telephone.png"
      },

      {
        id: "gamecontroller",
        name: "Game Controller",
        image: IMAGE_BASE + "gamecontroller.png"
      },

      {
        id: "greenushanka",
        name: "Green Ushanka",
        image: IMAGE_BASE + "greenushanka.png"
      },

      {
        id: "dvd",
        name: "DVD",
        image: IMAGE_BASE + "dvd.png"
      },

      {
        id: "amiiboredslushcup",
        name: "Amiibo Red Slush Cup",
        image: IMAGE_BASE + "amiiboredslushcup.png"
      },

      {
        id: "doubletophat",
        name: "Double Tophat",
        image: IMAGE_BASE + "doubletophat.png"
      },

      // NEW CHARACTER
      {
        id: "bfb",
        name: "Brazilian Furry Blocky",
        image: IMAGE_BASE + "bfb.png"
      }

    ]
  }

};


// ============================================================
// UNUSED RECOMMENDED CHARACTERS
// ============================================================
//
// ONLY characters that have NOT debuted belong here.
//
// Once a character debuts, REMOVE them from this list and
// place them in one of the teams above.
//
// Existing Team Stupidity / IDNK members are NOT included.
//

const UNUSED_RECOMMENDED_CHARACTERS = [

  // Example:
  // {
  //   id: "example",
  //   name: "Example Character",
  //   image: IMAGE_BASE + "example.png"
  // }

];


// ============================================================
// AUDIO
// ============================================================

const MUSIC_URL =
  "https://www.dropbox.com/scl/fi/vxeppt603dn8puyjp5ewz/bfahquietautumn.wav?rlkey=0phw0tch3x8h4lmiazi0xx46p&st=c1friwll&dl=0";

const HOVER_SOUND =
  "https://www.dropbox.com/scl/fi/1xw02icxgy2fuq2jngn3c/pod_cursor_move.wav?rlkey=6wbpnj0e73hooss1qb2dkm1nk&st=3kcd686f&dl=0";

const CLICK_SOUND =
  "https://www.dropbox.com/scl/fi/hz8si2ox8ydh9pohpn4t3/pod_select.wav?rlkey=5ny0eqz6jo5uopouwmglmbsuf&st=6jlqi2cx&dl=0";

const VOTE_FINISH_SOUND =
  "https://www.dropbox.com/scl/fi/lulto3ccfy9hevqpsoez6/pod_appear_01.wav?rlkey=e2rtrtya4ve3tg3f2zsonbz7r&st=owe08b49&dl=0";

const RECOMMEND_FINISH_SOUND =
  "https://www.dropbox.com/scl/fi/ydcvqygyrfeydlc80k1bc/pod_search_ping_01.wav?rlkey=z0n4ivn1uw618khmqh3jyudds&st=48othi0q&dl=0";

const FAVICON_URL =
  "https://www.dropbox.com/scl/fi/38ehjsfppt07nbhgzjbn7/favicon.ico?rlkey=pafe0irs0zdvo529olanu7okn&st=sglifux9&dl=0";


// ============================================================
// FIREBASE HELPERS
// ============================================================

async function firebaseGet(path) {

  const response = await fetch(
    `${FIREBASE_DB_URL}/${path}.json`
  );

  if (!response.ok) {
    throw new Error(
      `Firebase GET failed: ${response.status}`
    );
  }

  return await response.json();
}


async function firebasePost(path, data) {

  const response = await fetch(
    `${FIREBASE_DB_URL}/${path}.json`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {

    const errorText = await response.text();

    throw new Error(
      `Firebase POST failed: ${response.status} ${errorText}`
    );
  }

  return await response.json();
}


// ============================================================
// GET ALL CURRENT EPISODE VOTES
// ============================================================

async function getVotes() {

  const data = await firebaseGet("votes");

  if (!data || typeof data !== "object") {
    return [];
  }

  return Object.values(data).filter(
    vote => vote && vote.episode === EPISODE
  );
}


// ============================================================
// GET RESULTS
// ============================================================

async function getResults() {

  const votes = await getVotes();

  const results = {};

  for (const teamKey of Object.keys(TEAMS)) {

    results[teamKey] = {
      name: TEAMS[teamKey].name,
      total: 0,
      contestants: {}
    };

    for (const contestant of TEAMS[teamKey].members) {

      results[teamKey].contestants[contestant.id] = {
        id: contestant.id,
        name: contestant.name,
        image: contestant.image,
        votes: 0
      };

    }
  }


  for (const vote of votes) {

    if (!vote.contestantId) {
      continue;
    }

    for (const teamKey of Object.keys(TEAMS)) {

      const contestant =
        TEAMS[teamKey].members.find(
          member => member.id === vote.contestantId
        );

      if (!contestant) {
        continue;
      }

      results[teamKey].contestants[
        contestant.id
      ].votes++;

      results[teamKey].total++;

      break;
    }
  }

  return results;
}


// ============================================================
// RECOMMENDATIONS
// ============================================================

async function getRecommendations() {

  const data =
    await firebaseGet("recommendations");

  if (!data || typeof data !== "object") {
    return [];
  }

  return Object.values(data);
}


// ============================================================
// CORS
// ============================================================

function corsHeaders() {

  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods":
      "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type"
  };

}


// ============================================================
// JSON RESPONSE
// ============================================================

function jsonResponse(data, status = 200) {

  return new Response(
    JSON.stringify(data),
    {
      status,

      headers: {
        "Content-Type": "application/json",
        ...corsHeaders()
      }
    }
  );

}


// ============================================================
// MAIN WORKER
// ============================================================

export default {

  async fetch(request, env) {

    const url =
      new URL(request.url);

    const pathname =
      url.pathname;


    // --------------------------------------------------------
    // OPTIONS / CORS
    // --------------------------------------------------------

    if (request.method === "OPTIONS") {

      return new Response(
        null,
        {
          status: 204,
          headers: corsHeaders()
        }
      );

    }


    // --------------------------------------------------------
    // VOTES API
    // --------------------------------------------------------

    if (
      pathname === "/votes" &&
      request.method === "GET"
    ) {

      try {

        const results =
          await getResults();

        return jsonResponse({
          success: true,
          episode: EPISODE,
          results
        });

      } catch (error) {

        return jsonResponse(
          {
            success: false,
            error: error.message
          },
          500
        );

      }

    }


    // --------------------------------------------------------
    // VOTE
    // --------------------------------------------------------

    if (
      pathname === "/vote" &&
      request.method === "POST"
    ) {

      try {

        const body =
          await request.json();


        const nickname =
          String(
            body.nickname || "Anonymous"
          ).trim().slice(0, 40);


        const contestantId =
          String(
            body.contestantId || ""
          ).trim();


        const reason =
          String(
            body.reason || ""
          ).trim().slice(0, 500);


        if (!contestantId) {

          return jsonResponse(
            {
              success: false,
              error: "No contestant selected."
            },
            400
          );

        }


        // Make sure contestant actually exists
        // on a current team.

        let contestantFound = null;
        let teamFound = null;

        for (
          const teamKey of Object.keys(TEAMS)
        ) {

          const contestant =
            TEAMS[teamKey].members.find(
              member =>
                member.id === contestantId
            );

          if (contestant) {

            contestantFound =
              contestant;

            teamFound =
              teamKey;

            break;
          }

        }


        if (!contestantFound) {

          return jsonResponse(
            {
              success: false,
              error: "Invalid contestant."
            },
            400
          );

        }


        const vote = {

          episode: EPISODE,

          nickname,

          reason,

          contestantId,

          contestantName:
            contestantFound.name,

          team:
            teamFound,

          timestamp:
            new Date().toISOString()

        };


        await firebasePost(
          "votes",
          vote
        );


        return jsonResponse({
          success: true,
          message: "Vote submitted!"
        });


      } catch (error) {

        return jsonResponse(
          {
            success: false,
            error:
              "Could not save vote: " +
              error.message
          },
          500
        );

      }

    }


    // --------------------------------------------------------
    // RECOMMENDATION LIST
    // --------------------------------------------------------

    if (
      pathname === "/recommendations" &&
      request.method === "GET"
    ) {

      try {

        const recommendations =
          await getRecommendations();

        return jsonResponse({
          success: true,
          recommendations
        });

      } catch (error) {

        return jsonResponse(
          {
            success: false,
            error: error.message
          },
          500
        );

      }

    }


    // --------------------------------------------------------
    // RECOMMEND A CHARACTER
    // --------------------------------------------------------

    if (
      pathname === "/recommend" &&
      request.method === "POST"
    ) {

      try {

        const body =
          await request.json();


        const name =
          String(
            body.name || ""
          ).trim().slice(0, 80);


        const reason =
          String(
            body.reason || ""
          ).trim().slice(0, 500);


        const nickname =
          String(
            body.nickname || "Anonymous"
          ).trim().slice(0, 40);


        if (!name) {

          return jsonResponse(
            {
              success: false,
              error:
                "Please enter a character name."
            },
            400
          );

        }


        const recommendation = {

          name,

          reason,

          nickname,

          episode: EPISODE,

          timestamp:
            new Date().toISOString()

        };


        await firebasePost(
          "recommendations",
          recommendation
        );


        return jsonResponse({
          success: true,
          message:
            "Character recommendation submitted!"
        });


      } catch (error) {

        return jsonResponse(
          {
            success: false,
            error:
              "Could not save recommendation: " +
              error.message
          },
          500
        );

      }

    }


    // --------------------------------------------------------
    // CONFIG API
    // --------------------------------------------------------

    if (
      pathname === "/config" &&
      request.method === "GET"
    ) {

      return jsonResponse({

        episode: EPISODE,

        teams: TEAMS,

        unusedRecommendedCharacters:
          UNUSED_RECOMMENDED_CHARACTERS

      });

    }


    // --------------------------------------------------------
    // MAIN WEBSITE
    // --------------------------------------------------------

    if (
      pathname === "/" ||
      pathname === "/index.html"
    ) {

      return new Response(
        HTML_PAGE,
        {
          headers: {
            "Content-Type":
              "text/html; charset=UTF-8"
          }
        }
      );

    }


    // --------------------------------------------------------
    // 404
    // --------------------------------------------------------

    return new Response(
      "BFAHVSC - Page not found.",
      {
        status: 404,
        headers: {
          "Content-Type":
            "text/plain; charset=UTF-8"
        }
      }
    );

  }

};


// ============================================================
// WEBSITE HTML
// ============================================================

const HTML_PAGE = `<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<title>
Battle for a Hotel - Voting
</title>

<link
  rel="icon"
  href="${FAVICON_URL}"
>

<style>

* {
  box-sizing: border-box;
}


html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}


body {

  font-family:
    "Trebuchet MS",
    Arial,
    sans-serif;

  color: white;

  min-height: 100vh;

  overflow-x: hidden;

  background:

    radial-gradient(
      circle at 20% 20%,
      rgba(98, 65, 180, 0.35),
      transparent 30%
    ),

    radial-gradient(
      circle at 80% 70%,
      rgba(0, 160, 255, 0.20),
      transparent 35%
    ),

    linear-gradient(
      135deg,
      #080014,
      #12002c 40%,
      #020b25 100%
    );

}


/* ==========================================================
   STAR FIELD
   ========================================================== */

body::before,
body::after {

  content: "";

  position: fixed;

  inset: 0;

  pointer-events: none;

  z-index: -1;

}


body::before {

  opacity: 0.9;

  background-image:

    radial-gradient(
      2px 2px at 10% 20%,
      white,
      transparent
    ),

    radial-gradient(
      1px 1px at 25% 70%,
      white,
      transparent
    ),

    radial-gradient(
      2px 2px at 40% 40%,
      white,
      transparent
    ),

    radial-gradient(
      1px 1px at 55% 15%,
      white,
      transparent
    ),

    radial-gradient(
      2px 2px at 70% 60%,
      white,
      transparent
    ),

    radial-gradient(
      1px 1px at 85% 25%,
      white,
      transparent
    ),

    radial-gradient(
      2px 2px at 95% 85%,
      white,
      transparent
    );

  background-size:
    260px 260px,
    180px 180px,
    330px 330px,
    220px 220px,
    300px 300px,
    190px 190px,
    270px 270px;

}


body::after {

  opacity: 0.55;

  background-image:

    radial-gradient(
      1px 1px at 15% 80%,
      white,
      transparent
    ),

    radial-gradient(
      2px 2px at 35% 10%,
      white,
      transparent
    ),

    radial-gradient(
      1px 1px at 50% 90%,
      white,
      transparent
    ),

    radial-gradient(
      1px 1px at 75% 35%,
      white,
      transparent
    ),

    radial-gradient(
      2px 2px at 90% 55%,
      white,
      transparent
    );

  background-size:
    200px 200px,
    320px 320px,
    240px 240px,
    180px 180px,
    300px 300px;

}


.container {

  width: min(1200px, 94%);

  margin: auto;

  padding:
    30px 0 100px;

}


/* ==========================================================
   HEADER
   ========================================================== */

header {

  text-align: center;

  margin-bottom: 30px;

}


header h1 {

  margin: 0;

  font-size: clamp(
    35px,
    7vw,
    72px
  );

  text-shadow:
    0 0 10px #8e5cff,
    0 0 25px #5e31ff;

}


header p {

  font-size: 18px;

  opacity: 0.9;

}


/* ==========================================================
   PANELS
   ========================================================== */

.panel {

  background:
    linear-gradient(
      145deg,
      rgba(30, 15, 65, 0.92),
      rgba(5, 20, 50, 0.88)
    );

  border:
    2px solid
    rgba(155, 115, 255, 0.55);

  border-radius: 22px;

  padding: 24px;

  margin-bottom: 28px;

  box-shadow:
    0 0 30px rgba(70, 30, 180, 0.28);

  backdrop-filter:
    blur(10px);

}


.panel h2 {

  margin-top: 0;

  text-align: center;

}


/* ==========================================================
   TEAM
   ========================================================== */

.team {

  margin-bottom: 35px;

}


.team-title {

  text-align: center;

  font-size: 30px;

  margin-bottom: 20px;

}


.team-members {

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(130px, 1fr)
    );

  gap: 15px;

}


.contestant {

  position: relative;

  cursor: pointer;

  padding: 10px;

  border-radius: 17px;

  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,0.12),
      rgba(255,255,255,0.04)
    );

  border:
    2px solid
    rgba(255,255,255,0.15);

  transition:
    transform 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;

}


.contestant:hover {

  transform:
    translateY(-5px)
    scale(1.03);

  border-color:
    rgba(180,140,255,0.9);

  box-shadow:
    0 0 18px
    rgba(130,90,255,0.45);

}


.contestant.selected {

  border-color:
    #ffffff;

  box-shadow:
    0 0 0 3px
    rgba(150,100,255,0.8),
    0 0 25px
    rgba(130,90,255,0.8);

}


.contestant img {

  display: block;

  width: 100%;

  aspect-ratio: 1;

  object-fit: contain;

  border-radius: 12px;

}


.contestant-name {

  text-align: center;

  font-weight: bold;

  margin-top: 8px;

  font-size: 14px;

}


.vote-count {

  text-align: center;

  margin-top: 5px;

  opacity: 0.8;

  font-size: 13px;

}


/* ==========================================================
   FORMS
   ========================================================== */

label {

  display: block;

  font-weight: bold;

  margin:
    14px 0 6px;

}


input,
textarea {

  width: 100%;

  border: 2px solid
    rgba(180,150,255,0.4);

  border-radius: 12px;

  padding: 13px;

  background:
    rgba(0,0,0,0.35);

  color: white;

  outline: none;

  font: inherit;

}


input:focus,
textarea:focus {

  border-color:
    #a982ff;

  box-shadow:
    0 0 12px
    rgba(130,90,255,0.35);

}


textarea {

  min-height: 110px;

  resize: vertical;

}


button {

  border: none;

  border-radius: 13px;

  padding:
    13px 22px;

  margin-top: 16px;

  font-weight: bold;

  font-size: 16px;

  color: white;

  cursor: pointer;

  background:
    linear-gradient(
      135deg,
      #7544ff,
      #b23dff
    );

  box-shadow:
    0 5px 15px
    rgba(100,40,200,0.35);

  transition:
    transform 0.12s,
    filter 0.12s;

}


button:hover {

  transform:
    translateY(-2px);

  filter:
    brightness(1.15);

}


button:active {

  transform:
    translateY(1px);

}


button:disabled {

  opacity: 0.5;

  cursor: not-allowed;

  transform: none;

}


/* ==========================================================
   RESULTS
   ========================================================== */

.results-grid {

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(220px, 1fr)
    );

  gap: 20px;

}


.result-card {

  padding: 18px;

  border-radius: 16px;

  background:
    rgba(0,0,0,0.25);

  border:
    1px solid
    rgba(255,255,255,0.12);

}


.result-name {

  font-weight: bold;

}


.result-bar {

  height: 12px;

  border-radius: 20px;

  overflow: hidden;

  background:
    rgba(255,255,255,0.12);

  margin-top: 8px;

}


.result-fill {

  height: 100%;

  width: 0%;

  background:
    linear-gradient(
      90deg,
      #7544ff,
      #dd61ff
    );

  transition:
    width 0.4s ease;

}


/* ==========================================================
   RECOMMENDATIONS
   ========================================================== */

.recommended-grid {

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(150px, 1fr)
    );

  gap: 15px;

}


.recommended-card {

  padding: 14px;

  border-radius: 15px;

  background:
    rgba(255,255,255,0.07);

  text-align: center;

}


.recommended-card img {

  width: 100%;

  aspect-ratio: 1;

  object-fit: contain;

}


/* ==========================================================
   NOTIFICATION
   ========================================================== */

#notification {

  position: fixed;

  top: 20px;

  left: 20px;

  z-index: 10000;

  padding:
    13px 18px;

  border-radius: 12px;

  background:
    rgba(18,8,40,0.96);

  border:
    2px solid
    rgba(180,130,255,0.7);

  box-shadow:
    0 0 20px
    rgba(130,80,255,0.45);

  transform:
    translateX(-130%);

  opacity: 0;

  transition:
    transform 0.25s,
    opacity 0.25s;

}


#notification.show {

  transform:
    translateX(0);

  opacity: 1;

}


/* ==========================================================
   DISCORD BUTTON
   ========================================================== */

.discord-button {

  position: fixed;

  right: 20px;

  bottom: 20px;

  width: 72px;

  height: 72px;

  z-index: 9999;

  border-radius: 50%;

  overflow: hidden;

  background:
    rgba(20,10,45,0.9);

  border:
    3px solid
    rgba(255,255,255,0.7);

  box-shadow:
    0 0 20px
    rgba(120,80,255,0.6);

}


.discord-button img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.discord-button:hover {

  transform:
    scale(1.1);

}


/* ==========================================================
   MUSIC BUTTON
   ========================================================== */

.music-button {

  position: fixed;

  right: 105px;

  bottom: 25px;

  z-index: 9999;

  width: 55px;

  height: 55px;

  border-radius: 50%;

  padding: 0;

  margin: 0;

}


.small {

  opacity: 0.7;

  font-size: 13px;

}


.empty {

  text-align: center;

  opacity: 0.7;

  padding: 20px;

}

</style>

</head>


<body>


<!-- ========================================================
     NOTIFICATION
     ======================================================== -->

<div id="notification"></div>


<!-- ========================================================
     AUDIO
     ======================================================== -->

<audio
  id="music"
  src="${MUSIC_URL}"
  loop
></audio>

<audio
  id="hoverSound"
  src="${HOVER_SOUND}"
></audio>

<audio
  id="clickSound"
  src="${CLICK_SOUND}"
></audio>

<audio
  id="voteFinishSound"
  src="${VOTE_FINISH_SOUND}"
></audio>

<audio
  id="recommendFinishSound"
  src="${RECOMMEND_FINISH_SOUND}"
></audio>


<!-- ========================================================
     DISCORD
     ======================================================== -->

<a
  class="discord-button"
  href="${DISCORD_URL}"
  target="_blank"
  rel="noopener noreferrer"
>

  <img
    src="${discord_logo}"
    alt="Discord"
  >

</a>


<button
  id="musicButton"
  class="music-button"
  title="Toggle music"
>
  🔊
</button>


<div class="container">


<header>

  <h1>
    Battle for a Hotel
  </h1>

  <p>
    BFAHVSC — Episode ${EPISODE} Voting
  </p>

</header>


<!-- ========================================================
     VOTING
     ======================================================== -->

<section class="panel">

  <h2>
    🗳️ Vote
  </h2>

  <p class="small">
    Select the contestant you want to vote for,
    then enter your nickname and reason.
  </p>

  <div id="teamsContainer"></div>


  <form id="voteForm">

    <label for="nickname">
      Voter nickname
    </label>

    <input
      id="nickname"
      maxlength="40"
      placeholder="Your nickname"
      autocomplete="nickname"
    >


    <label for="reason">
      Reason
    </label>

    <textarea
      id="reason"
      maxlength="500"
      placeholder="Why are you voting for this contestant?"
    ></textarea>


    <button
      type="submit"
      id="voteButton"
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
    📊 Current Results
  </h2>

  <div
    id="resultsContainer"
    class="results-grid"
  ></div>

</section>


<!-- ========================================================
     UNUSED RECOMMENDED CHARACTERS
     ======================================================== -->

<section class="panel">

  <h2>
    ⭐ Unused Recommended Characters
  </h2>

  <p>
    Characters in this section have been recommended
    but have <strong>not debuted yet</strong>.
  </p>

  <div
    id="recommendedCharacters"
    class="recommended-grid"
  ></div>

  <p id="recommendedCount"></p>

</section>


<!-- ========================================================
     RECOMMEND CHARACTER
     ======================================================== -->

<section class="panel">

  <h2>
    ➕ Recommend a Character
  </h2>

  <p>
    Recommend a character that could debut in a future
    Battle for a Hotel voting.
  </p>


  <form id="recommendForm">

    <label for="recommendName">
      Character name
    </label>

    <input
      id="recommendName"
      maxlength="80"
      required
      placeholder="Character name"
    >


    <label for="recommendNickname">
      Your nickname
    </label>

    <input
      id="recommendNickname"
      maxlength="40"
      placeholder="Your nickname"
    >


    <label for="recommendReason">
      Why should they be recommended?
    </label>

    <textarea
      id="recommendReason"
      maxlength="500"
      placeholder="Tell us about the character..."
    ></textarea>


    <button
      type="submit"
      id="recommendButton"
    >
      Recommend Character
    </button>

  </form>

</section>


</div>


<script>


// ============================================================
// ELEMENTS
// ============================================================

const teamsContainer =
  document.getElementById(
    "teamsContainer"
  );

const resultsContainer =
  document.getElementById(
    "resultsContainer"
  );

const recommendedCharacters =
  document.getElementById(
    "recommendedCharacters"
  );

const recommendedCount =
  document.getElementById(
    "recommendedCount"
  );

const voteForm =
  document.getElementById(
    "voteForm"
  );

const recommendForm =
  document.getElementById(
    "recommendForm"
  );

const notification =
  document.getElementById(
    "notification"
  );

const music =
  document.getElementById(
    "music"
  );

const hoverSound =
  document.getElementById(
    "hoverSound"
  );

const clickSound =
  document.getElementById(
    "clickSound"
  );

const voteFinishSound =
  document.getElementById(
    "voteFinishSound"
  );

const recommendFinishSound =
  document.getElementById(
    "recommendFinishSound"
  );

const musicButton =
  document.getElementById(
    "musicButton"
  );


// ============================================================
// STATE
// ============================================================

let config = null;

let selectedContestant = null;

let notificationTimeout = null;

let musicEnabled = false;


// ============================================================
// SOUND HELPERS
// ============================================================

function playSound(audio) {

  try {

    audio.currentTime = 0;

    audio.play().catch(() => {});

  } catch (_) {}

}


function showNotification(message) {

  notification.textContent =
    message;

  notification.classList.add(
    "show"
  );

  clearTimeout(
    notificationTimeout
  );

  notificationTimeout =
    setTimeout(() => {

      notification.classList.remove(
        "show"
      );

    }, 3000);

}


// ============================================================
// MUSIC
// ============================================================

async function startMusic() {

  try {

    await music.play();

    musicEnabled = true;

    musicButton.textContent =
      "🔊";

  } catch (_) {

    musicEnabled = false;

    musicButton.textContent =
      "🔇";

  }

}


musicButton.addEventListener(
  "click",
  () => {

    playSound(clickSound);

    if (music.paused) {

      startMusic();

    } else {

      music.pause();

      musicEnabled = false;

      musicButton.textContent =
        "🔇";

    }

  }
);


// Start music after the user's
// first interaction because browsers
// can block autoplay.

document.addEventListener(
  "click",
  () => {

    if (!musicEnabled) {
      startMusic();
    }

  },
  {
    once: true
  }
);


// ============================================================
// LOAD CONFIG
// ============================================================

async function loadConfig() {

  const response =
    await fetch("/config");

  if (!response.ok) {

    throw new Error(
      "Could not load configuration."
    );

  }

  config =
    await response.json();

}


// ============================================================
// RENDER TEAMS
// ============================================================

function renderTeams() {

  teamsContainer.innerHTML = "";


  for (
    const [teamKey, team]
    of Object.entries(config.teams)
  ) {

    const teamSection =
      document.createElement(
        "div"
      );

    teamSection.className =
      "team";


    const title =
      document.createElement(
        "div"
      );

    title.className =
      "team-title";

    title.textContent =
      team.name;


    teamSection.appendChild(
      title
    );


    const members =
      document.createElement(
        "div"
      );

    members.className =
      "team-members";


    for (
      const contestant
      of team.members
    ) {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "contestant";

      card.dataset.id =
        contestant.id;


      const image =
        document.createElement(
          "img"
        );

      image.src =
        contestant.image;

      image.alt =
        contestant.name;


      const name =
        document.createElement(
          "div"
        );

      name.className =
        "contestant-name";

      name.textContent =
        contestant.name;


      const count =
        document.createElement(
          "div"
        );

      count.className =
        "vote-count";

      count.textContent =
        "0 votes";

      count.dataset.countFor =
        contestant.id;


      card.appendChild(
        image
      );

      card.appendChild(
        name
      );

      card.appendChild(
        count
      );


      card.addEventListener(
        "mouseenter",
        () => {

          playSound(
            hoverSound
          );

        }
      );


      card.addEventListener(
        "click",
        () => {

          playSound(
            clickSound
          );

          document
            .querySelectorAll(
              ".contestant.selected"
            )
            .forEach(
              element =>
                element.classList.remove(
                  "selected"
                )
            );


          card.classList.add(
            "selected"
          );


          selectedContestant =
            contestant.id;


          showNotification(
            "Selected: " +
            contestant.name
          );

        }
      );


      members.appendChild(
        card
      );

    }


    teamSection.appendChild(
      members
    );

    teamsContainer.appendChild(
      teamSection
    );

  }

}


// ============================================================
// RENDER UNUSED RECOMMENDED CHARACTERS
// ============================================================

function renderRecommendedCharacters() {

  const characters =
    config.unusedRecommendedCharacters ||
    [];


  recommendedCharacters.innerHTML =
    "";


  recommendedCount.textContent =
    characters.length +
    " unused recommended character" +
    (
      characters.length === 1
        ? ""
        : "s"
    );


  if (
    characters.length === 0
  ) {

    recommendedCharacters.innerHTML =
      '<div class="empty">' +
      'There are currently no unused recommended characters.' +
      '</div>';

    return;

  }


  for (
    const character
    of characters
  ) {

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "recommended-card";


    if (character.image) {

      const image =
        document.createElement(
          "img"
        );

      image.src =
        character.image;

      image.alt =
        character.name;

      card.appendChild(
        image
      );

    }


    const name =
      document.createElement(
        "strong"
      );

    name.textContent =
      character.name;


    card.appendChild(
      name
    );

    recommendedCharacters.appendChild(
      card
    );

  }

}


// ============================================================
// LOAD RESULTS
// ============================================================

async function loadResults() {

  try {

    const response =
      await fetch("/votes");


    const data =
      await response.json();


    if (!data.success) {
      throw new Error(
        data.error ||
        "Could not load results."
      );
    }


    renderResults(
      data.results
    );

  } catch (error) {

    resultsContainer.innerHTML =
      '<div class="empty">' +
      'Could not load voting results.' +
      '</div>';

  }

}


// ============================================================
// RENDER RESULTS
// ============================================================

function renderResults(results) {

  resultsContainer.innerHTML =
    "";


  for (
    const teamKey
    of Object.keys(results)
  ) {

    const team =
      results[teamKey];


    for (
      const contestantId
      of Object.keys(
        team.contestants
      )
    ) {

      const contestant =
        team.contestants[
          contestantId
        ];


      const card =
        document.createElement(
          "div"
        );

      card.className =
        "result-card";


      const name =
        document.createElement(
          "div"
        );

      name.className =
        "result-name";

      name.textContent =
        contestant.name;


      const votes =
        document.createElement(
          "div"
        );

      votes.textContent =
        contestant.votes +
        (
          contestant.votes === 1
            ? " vote"
            : " votes"
        );


      const bar =
        document.createElement(
          "div"
        );

      bar.className =
        "result-bar";


      const fill =
        document.createElement(
          "div"
        );

      fill.className =
        "result-fill";


      const maxVotes =
        Math.max(
          ...Object.values(
            team.contestants
          ).map(
            c => c.votes
          ),
          1
        );


      fill.style.width =
        (
          contestant.votes /
          maxVotes *
          100
        ) + "%";


      bar.appendChild(
        fill
      );


      card.appendChild(
        name
      );

      card.appendChild(
        votes
      );

      card.appendChild(
        bar
      );


      resultsContainer.appendChild(
        card
      );


      const voteCount =
        document.querySelector(
          '[data-count-for="' +
          contestant.id +
          '"]'
        );


      if (voteCount) {

        voteCount.textContent =
          contestant.votes +
          (
            contestant.votes === 1
              ? " vote"
              : " votes"
          );

      }

    }

  }

}


// ============================================================
// VOTE SUBMISSION
// ============================================================

voteForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    if (!selectedContestant) {

      showNotification(
        "Please select a contestant first!"
      );

      return;

    }


    const nickname =
      document
        .getElementById(
          "nickname"
        )
        .value
        .trim();


    const reason =
      document
        .getElementById(
          "reason"
        )
        .value
        .trim();


    const button =
      document.getElementById(
        "voteButton"
      );


    button.disabled =
      true;

    button.textContent =
      "Submitting...";


    try {

      const response =
        await fetch(
          "/vote",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                nickname:
                  nickname ||
                  "Anonymous",

                reason,

                contestantId:
                  selectedContestant
              })
          }
        );


      const data =
        await response.json();


      if (!data.success) {

        throw new Error(
          data.error ||
          "Vote failed."
        );

      }


      playSound(
        voteFinishSound
      );


      showNotification(
        "✓ Your vote was submitted!"
      );


      voteForm.reset();


      document
        .querySelectorAll(
          ".contestant.selected"
        )
        .forEach(
          element =>
            element.classList.remove(
              "selected"
            )
        );


      selectedContestant =
        null;


      await loadResults();


    } catch (error) {

      showNotification(
        "Vote failed: " +
        error.message
      );

    } finally {

      button.disabled =
        false;

      button.textContent =
        "Submit Vote";

    }

  }
);


// ============================================================
// RECOMMENDATION SUBMISSION
// ============================================================

recommendForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const name =
      document
        .getElementById(
          "recommendName"
        )
        .value
        .trim();


    const nickname =
      document
        .getElementById(
          "recommendNickname"
        )
        .value
        .trim();


    const reason =
      document
        .getElementById(
          "recommendReason"
        )
        .value
        .trim();


    const button =
      document.getElementById(
        "recommendButton"
      );


    if (!name) {

      showNotification(
        "Enter a character name first!"
      );

      return;

    }


    button.disabled =
      true;

    button.textContent =
      "Submitting...";


    try {

      const response =
        await fetch(
          "/recommend",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                name,

                nickname:
                  nickname ||
                  "Anonymous",

                reason
              })
          }
        );


      const data =
        await response.json();


      if (!data.success) {

        throw new Error(
          data.error ||
          "Recommendation failed."
        );

      }


      playSound(
        recommendFinishSound
      );


      showNotification(
        "✓ Character recommendation submitted!"
      );


      recommendForm.reset();


    } catch (error) {

      showNotification(
        "Recommendation failed: " +
        error.message
      );

    } finally {

      button.disabled =
        false;

      button.textContent =
        "Recommend Character";

    }

  }
);


// ============================================================
// INITIALIZE
// ============================================================

async function initialize() {

  try {

    await loadConfig();

    renderTeams();

    renderRecommendedCharacters();

    await loadResults();

  } catch (error) {

    showNotification(
      "Could not load BFAHVSC."
    );

    console.error(error);

  }

}


initialize();


// ============================================================
// PERIODIC RESULT REFRESH
// ============================================================

setInterval(
  loadResults,
  15000
);

</script>

</body>

</html>`;
