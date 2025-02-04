let cardData;
let weaknesses = [];
let drawpool = [];
let cycles = [
  {
    id: "core",
    selector: "switchcor",
    active: true
  },
  {
    id: "dwl",
    selector: "switchdun",
    active: true
  },
  {
    id: "ptc",
    selector: "switchcar",
    active: true
  },
  {
    id: "tfa",
    selector: "switchfor",
    active: true
  },
  {
    id: "tcu",
    selector: "switchcir",
    active: true
  },
  {
    id: "tde",
    selector: "switchdre",
    active: true
  },
  {
    id: "tic",
    selector: "switchinn",
    active: true
  },
  {
    id: "eoep",
    selector: "switchedg",
    active: true
  },
  {
    id: "tskp",
    selector: "switchsca",
    active: true
  },
  {
    id: "fhvp",
    selector: "switchhem",
    active: true
  },
  {
    id: "rtdwl",
    selector: "switchdunret",
    active: true
  },
  {
    id: "rtptc",
    selector: "switchcarret",
    active: true
  },
  {
    id: "rttfa",
    selector: "switchforret",
    active: true
  },
  {
    id: "rttcu",
    selector: "switchcirret",
    active: true
  },
  {
    id: "nat",
    selector: "switchgua",
    active: true
  },
  {
    id: "har",
    selector: "switchsee",
    active: true
  },
  {
    id: "win",
    selector: "switchrog",
    active: true
  },
  {
    id: "jac",
    selector: "switchmys",
    active: true
  },
  {
    id: "ste",
    selector: "switchsur",
    active: true
  }  
];
let activeCycles = [];
let investigatorCount = 1;
let activeInvs = ["1"];
let noImages = false;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
      const j = getRandomInt(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function setCycle(cycleSelector, checked) {
  for (let object of cycles) {
    if (object.selector === cycleSelector) {
        object.active = checked;
        console.log(object.id,object.selector,object.active);
        if (cardData) {
          sortCards(cardData);
        }
    }
  }
}

function checkRadioValue() {
  var ele = document.getElementsByName('btnradioInvestigator');

  for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        investigatorCount = ele[i].value;
        //console.log("investigatorCount:" + investigatorCount);
      }
  }

  switch (investigatorCount) {
    case "1":
      //console.log("Case 1");
      document.getElementById("divP1").classList.add("col");
      document.getElementById("divP1").classList.remove("d-none","col-3","col-4","col-6","col-md-4","col-lg-3");      
      document.getElementById("divP2").classList.add("d-none");
      document.getElementById("divP3").classList.add("d-none");
      document.getElementById("divP4").classList.add("d-none");
      activeInvs = ["1"];
      break;
    case "2":
      //console.log("Case 2");
      document.getElementById("divP1").classList.add("col-6");
      document.getElementById("divP1").classList.remove("d-none","col","col-3","col-4","col-md-4","col-lg-3");
      document.getElementById("divP2").classList.add("col-6");
      document.getElementById("divP2").classList.remove("d-none","col","col-3","col-4","col-md-4","col-lg-3");
      document.getElementById("divP3").classList.add("d-none");
      document.getElementById("divP4").classList.add("d-none");
      activeInvs = ["1","2"];
      break;
    case "3":
      //console.log("Case 3");
      document.getElementById("divP1").classList.add("col-6","col-md-4");
      document.getElementById("divP1").classList.remove("d-none","col","col-3","col-4","col-lg-3");
      document.getElementById("divP2").classList.add("col-6","col-md-4");
      document.getElementById("divP2").classList.remove("d-none","col","col-3","col-4","col-lg-3");
      document.getElementById("divP3").classList.add("col-6","col-md-4");
      document.getElementById("divP3").classList.remove("d-none","col","col-3","col-4","col-lg-3");
      document.getElementById("divP4").classList.add("d-none");
      activeInvs = ["1","2","3"];
      break;
    case "4":
      //console.log("Case 4");
      document.getElementById("divP1").classList.add("col-6","col-lg-3");
      document.getElementById("divP1").classList.remove("d-none","col","col-3","col-4","col-md-4");
      document.getElementById("divP2").classList.add("col-6","col-lg-3");
      document.getElementById("divP2").classList.remove("d-none","col","col-3","col-4","col-md-4");
      document.getElementById("divP3").classList.add("col-6","col-lg-3");
      document.getElementById("divP3").classList.remove("d-none","col","col-3","col-4","col-md-4");
      document.getElementById("divP4").classList.add("col-6","col-lg-3");
      document.getElementById("divP4").classList.remove("d-none","col","col-3","col-4","col-md-4");
      activeInvs = ["1","2","3","4"];
  }
}

function checkCycle(card) {
	return (activeCycles.includes(card.pack_code));
}

function refreshCards() {
  fetch('/api/basicweaknesses')
    .then((response) => response.json())
    .then((json) => saveCards(json));
}

function saveCards(data) {
  cardData = data;
  sortCards(cardData);
}

function drawCard(invId) {
  if (invId==="") {
    activeInvs.forEach(inv => {
      drawCard(inv);
    });
  } else {
    let chosenIndex = getRandomInt(drawpool.length);
    let drawnCard = drawpool[chosenIndex];
    drawpool.splice(chosenIndex,1);
    let imgsrc = "/static/images/logo.svg";
    if (drawnCard.imagesrc) {
      imgsrc = cdnRoot + drawnCard.imagesrc.substring(0, drawnCard.imagesrc.lastIndexOf('.'))+".avif";
    }
    document.getElementById("imgP"+invId).src = imgsrc;
    document.getElementById("footP"+invId).innerHTML = `
    ${drawnCard.name}
    `;
    if (drawnCard.subname) {
      document.getElementById("footP"+invId).innerHTML += `
      <br/><span class="fw-lighter">${drawnCard.subname}</span>
      `
    }
    document.getElementById("footP"+invId).innerHTML += `
      <br/><span class="fw-semibold">${drawnCard.pack_name} - ${drawnCard.position}</span>
      `
    console.log(drawpool);
    renderDrawpool();
    poolSummary();
  }
}

function resetAll(invId) {
  if (invId==="") {
    activeInvs.forEach(inv => {
      resetAll(inv);
    });
    sortCards(cardData);
  } else {
    document.getElementById("imgP"+invId).src = cdnRoot + "/cardback.png";
    document.getElementById("footP"+invId).innerHTML = "";
  }
}

function renderDrawpool() {
  document.getElementById("result").innerHTML = "";
  drawpool.forEach( drawp => {
    let imgsrc = "/static/images/logo.svg";
    if (drawp.imagesrc) {
      imgsrc = cdnRoot + drawp.imagesrc.substring(0, drawp.imagesrc.lastIndexOf('.'))+".avif";
    }
    document.getElementById("result").innerHTML += `
    <div class="col arkhamCard">
        <div class="card mt-2">
          <div class="card-header">
            ${drawp.name}
          </div>
          <div class="card-body">
            <img class="${noImages ? "d-none" : ""} img-fluid rounded card-img-top" src="${imgsrc}" alt="${drawp.name}"/>
            <h5 class="card-title ${noImages ? "" : "d-none"}">${drawp.name}</h5>
            <p class="${noImages ? "" : "d-none"} card-text text-start fs-7 lh-sm">${drawp.real_text}</p>
          </div>
        </div>
    </div>
    `;    
  });  
}

function poolSummary() {
  document.getElementById("cardSummary").innerHTML = `
  <strong>${weaknesses.length}</strong> unique Basic Weaknesses in your selected cycles.
  <br/>
  <strong>${drawpool.length}</strong> total cards left in your draw pool.
  `
}

function sortCards(data) {
  cards = JSON.parse(JSON.stringify(data));
  activeCycles = cycles.filter(cycle => cycle.active).map(cycle => cycle.id);
  console.log(activeCycles)
  weaknesses = cards.filter(checkCycle);
  drawpool = [];
  weaknesses.forEach( weakness => {
    for (let i = 0; i < weakness.quantity; i++) {
      drawpool.push(weakness)      
    }
  });
  //shuffleArray(drawpool);
  renderDrawpool();
  poolSummary();
}

let drawBtns = document.querySelectorAll(`[id*="btnDrawPlayer"]`)
drawBtns.forEach(drawBtn => {
  drawBtn.addEventListener('click', () => {
    document.getElementById("btnDrawPlayer"+drawBtn.value).classList.add("disabled");
    document.getElementById("btnThreePlayer"+drawBtn.value).classList.add("disabled");
    document.getElementById("btnResetPlayer"+drawBtn.value).classList.remove("disabled"); 
    drawCard(drawBtn.value);
  });
});

let threeBtns = document.querySelectorAll(`[id*="btnThreePlayer"]`)
threeBtns.forEach(threeBtn => {
  threeBtn.addEventListener('click', () => {
    document.getElementById("btnDrawPlayer"+threeBtn.value).classList.add("disabled");
    document.getElementById("btnThreePlayer"+threeBtn.value).classList.add("disabled");
    document.getElementById("btnResetPlayer"+threeBtn.value).classList.remove("disabled"); 
    
  });
});

let resetBtns = document.querySelectorAll(`[id*="btnResetPlayer"]`)
resetBtns.forEach(resetBtn => {
  resetBtn.addEventListener('click', () => {
    document.getElementById("btnDrawPlayer"+resetBtn.value).classList.remove("disabled");
    document.getElementById("btnThreePlayer"+resetBtn.value).classList.remove("disabled");
    document.getElementById("btnResetPlayer"+resetBtn.value).classList.add("disabled"); 
    resetAll(resetBtn.value);
  });
});

let selectors = document.querySelector("#offcanvasCycles").querySelectorAll(`[id*="switch"]`)
selectors.forEach(selector => {
  selector.addEventListener('click', () => {
    localStorage.setItem(selector.id, selector.checked);
    setCycle(selector.id,selector.checked);
  });
  let checked = JSON.parse(localStorage.getItem(selector.id));
  if (checked != null) {
    selector.checked = checked;
    setCycle(selector.id,selector.checked);
  }
});

let investigatorRadios = document.querySelector("#offcanvasCycles").querySelectorAll(`[id*="btnradioInvestigator"]`)
investigatorRadios.forEach(investigatorRadio => {
  investigatorRadio.addEventListener('click', () => {
    localStorage.setItem("investigatorCount", investigatorRadio.value);
    checkRadioValue();
  });
  let storedCount = JSON.parse(localStorage.getItem("investigatorCount"));
  if (storedCount != null) {
    if (storedCount == investigatorRadio.value) {
      investigatorRadio.checked = true;
    }
    checkRadioValue();
  }
});

refreshCards();