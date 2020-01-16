var rs;
var siret;
var mail;
var tel;
var versement;
var moyenDePaiement;
var ETSValue;

/**
 * Two way binding is being made here.
 */

const createState = (state) => {
  return new Proxy(state, {
    set(target, property, value) {
      target[property] = value;
      render();
      return true;
    }
  });
};

const state = createState({
  name: ''
});

const listeners = document.querySelectorAll('[data-model]');

listeners.forEach((listener) => {
  const name = listener.dataset.model;
  listener.addEventListener('keyup', (event) => {
    state[name] = listener.value;
  });
});


const render = () => {
  // const bindings = Array.from(document.querySelectorAll('[data-binding]')).map(
  //   e => e.dataset.binding
  // );
  // bindings.forEach((binding) => {
    document.querySelector(`[data-binding='name']`).value = (state.name * .0068).toFixed(2);
    document.querySelector(`[data-model='name']`).value = state.name;
    document.querySelector(`[data-binding='contributionOPCA']`).value = ((state.name * .0068) * .87).toFixed(2);
    document.querySelector(`[data-binding='contributionETS']`).value = ((state.name * .0068) * .13).toFixed(2);
    document.querySelector(`[data-binding='totalETS']`).value = ((state.name * .0068) * .13).toFixed(2);
  // });
};

render();


// document.getElementById('calcul').addEventListener('click', () => {
//     document.getElementById('TA').className = 'isHidden';
//     document.getElementById('detailCalcul').className = 'isHidden';
//     if(document.getElementById('MS').value === '') {
//         document.getElementById('errorNoValue').className = 'isDisplayed';
//     } else {
//         var contribution;
//         var eightySeven;
//         var thirteen;
        
//         document.getElementById('errorNoValue').className = 'isHidden';
//         // We multiply the user's input by 0.686
//         contribution = document.getElementById('MS').value * 0.0068;
//         // Then we display the result in a new div
//         document.getElementById('TA').className = 'isDisplayed col-12 p-0';
//         document.getElementById('contributionTA').value = contribution.toFixed(2);
//         // setTimeout(() => {
//         //     document.getElementById('spinnerCalcul').className = 'spinner-border isDisplayed offset-6';
//         // }, 500);
//         // setTimeout(() => {
//             document.getElementById('spinnerCalcul').className = 'spinner-border isHidden';
//             eightySeven = contribution * 0.87;
//             thirteen = contribution * 0.13;
//             document.getElementById('detailCalcul').className = 'isDisplayed';
//             document.getElementById('contributionOPCA').value = eightySeven.toFixed(2);
//             document.getElementById('contributionETS').value = thirteen.toFixed(2);
//             ETSValue = document.getElementById('contributionETS').value;
//         // }, 2000);   
//     }
//   });

// window.onload = () => {
//   document.getElementById("ETSValidation").value = ETSValue;
//   document.getElementById("ETSVersement").placeholder = ETSValue;
// };

document.getElementById("send").addEventListener("click", () => {
  rs = document.getElementById("validationSociale").value;
  siret = document.getElementById("validationSiret").value;
  mail = document.getElementById("validationMail").value;
  tel = document.getElementById("validationTelephone").value;
  versement = document.getElementById("ETSVersement").value;
  radio = document.getElementsByName("customRadio");

  // for (var i = 0; i < radio.length; i++) {
  //   if (radio[i].checked) {
  //     // do whatever you want with the checked radio
  //     moyenDePaiement = radio[i].value;

  //     // only one radio can be logically checked, don't check the rest
  //     break;
  //   }
  // }

  // We check if all the fields are filled.
  // if (
  //   rs !== "" &&
  //   siret !== "" &&
  //   mail !== "" &&
  //   tel !== "" &&
  //   versement !== ""
  // ) {
    if (parseInt(versement) > 0 && parseInt(versement) <= parseFloat(ETSValue)) {
      $("#formElement :input").prop("disabled", true);
      document.getElementById("getPDF").removeAttribute("disabled");
      document.getElementById("reloadForm").removeAttribute("disabled");
      document.getElementById('passwordHelp').innerHTML = '';
      document.getElementById('passwordHelp').className = 'text-danger isHidden';
      var url = "/Simulateur_CSM/src/TestBook.xlsx";

      // /* set up async GET request */
      // var req = new XMLHttpRequest();
      // req.open("GET", url, true);
      // req.responseType = "arraybuffer";

      // req.onload = function(e) {
      //   var data = new Uint8Array(req.response);
      //   var wb = XLSX.read(data, { type: "array" });
      //   var ws = wb.Sheets.Sheet1;
      //   XLSX.utils.sheet_add_aoa(ws, [["new data", 1, 2, 3]], { origin: -1 });

      //   XLSX.writeFile(wb, "new.xlsx");

      //   // var htmlstr = XLSX.write(wb,{sheet:"Sheet1", type:'binary',bookType:'html'});
      //   // $('#wrapper')[0].innerHTML += htmlstr;
      // };

      // req.send();
    } else {
      document.getElementById('passwordHelp').innerHTML = 'Doit être compris entre 1 et ' + ETSValue;
      document.getElementById('passwordHelp').className = 'text-danger';
    }
  // }
});

/** 
 * Here we create and render the PDF
 */

document.getElementById("getPDF").addEventListener("click", () => {
  var height = 60;
  var interligne = 15;
  // change non-opaque pixels to white

  // Default export is a4 paper, portrait, using milimeters for units
  //var doc = new jsPDF();

  function getImgFromUrl(logo_url, callback) {
      var img = new Image();
      img.src = logo_url;
      img.onload = function () {
          callback(img);
      };
  } 

  function generatePDF(img){
    var doc = new jsPDF();
    doc.addImage(img, 'JPEG', 1, 2, 210, 30);
    doc.setFontSize(24);
    doc.text('Nom de l\'entreprise :', 105, height, "center");
    doc.text(rs, 105, height += interligne, "center");
    doc.text('Numéro de Siret :', 105, height += 20, "center");
    doc.text(siret, 105, height += interligne, "center");
    doc.setFontSize(20);
    doc.text('Le montant à verser est de : ' + ETSValue, 105, height += 50, "center");
    doc.text("A verser par : " + moyenDePaiement, 105, height += interligne, "center");
    doc.text("A l'adresse", 105, height += interligne, "center");
    doc.setFontSize(18);
    doc.text("Etablissement ", 105, height += interligne, "center");
    doc.text("Adresse numéro de la rue", 105, height += interligne, "center");
    doc.text("Ville et code postal", 105, height += interligne, "center");
    doc.save("a4.pdf");
  }

  var logo_url = "http://localhost:8888/Simulateur_CSM/src/assets/img/bannerCSM.jpeg";
  getImgFromUrl(logo_url, function (img) {
      generatePDF(img);
  });
  // doc.autoTable({html: document.getElementById('pdfJS')});  //as simple as that!
  
});

document.getElementById("reloadForm").addEventListener("click", () => {
  location.reload();
  document.getElementById("getPDF").setAttribute("disabled", "disabled");
  document.getElementById("reloadForm").setAttribute("disabled", "disabled");
});

