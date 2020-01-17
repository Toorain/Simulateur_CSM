// var rs;
// var siret;
// var mail;
// var tel;
// var versement;
// var moyenDePaiement;
// var ETSValue;

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

document.getElementById("send").addEventListener("click", () => {
  radioTotal = document.getElementById("sommeTotal").checked;
  radioPartiel = document.getElementById("sommePartiel").checked;
  if (radioTotal) {
    montant = document.getElementById('inputTotal').value;
  } else if (radioPartiel) {
    montant = document.getElementById('inputPartiel').value;
  }
  montantDu = document.getElementById('contributionETS').value;
  rs = document.getElementById('validationSociale').value;
  siret = document.getElementById('validationSiret').value;
  mail = document.getElementById('validationMail').value;
  tel = document.getElementById('validationTelephone').value;
  cheque = document.getElementById('paiement1').checked;
  virement = document.getElementById('paiement2').checked;
  if (cheque) {
    moyenDePaiement = 'Cheque';
  } else if (virement) {
    moyenDePaiement = 'RIB';
  } 
  // We check if all the fields are filled.
  if (
    rs !== "" &&
    siret !== "" &&
    mail !== "" &&
    tel !== "" &&
    montant !== ""
  ) {
  if (parseInt(montant) > 0 && parseInt(montant) <= parseFloat(montantDu)) {
    var height = 60;
    var interligne = 15;

  // Default export is a4 paper, portrait, using milimeters for units
  
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
      doc.text('Nom de l\'entreprise :', 50, height, "center");
      doc.text(rs, 150, height, "center");
      doc.text('N° Siret :', 40, height += 20, "center");
      doc.text(siret, 150, height, "center");
      doc.setFontSize(20);
      doc.text('Montant à verser est de : ' + montant + ' €', 50, height += 30, "center");
      doc.text("A verser par : " + moyenDePaiement, 40, height += interligne, "center");
      doc.text("A l'adresse", 105, height += interligne, "center");
      doc.setFontSize(18);
      doc.text("Etablissement ", 105, height += interligne, "center");
      doc.text("Adresse numéro de la rue", 105, height += interligne, "center");
      doc.text("Ville et code postal", 105, height += interligne, "center");
      doc.save("monBordereauDeVersement.pdf");
    }

    var logo_url = "http://localhost:8888/Simulateur_CSM/src/assets/img/bannerCSM.jpeg";
    getImgFromUrl(logo_url, function (img) {
        generatePDF(img);
    });
    } else {
      document.getElementById('errorForm').innerHTML = 'Erreur dans le formulaire, merci de vérifier les champs';
      document.getElementById('errorForm').className = 'col-md-12 text-danger';
      document.getElementById('errorSomme').innerHTML = 'La somme doit être comprise entre 0 et ' + montantDu;
      document.getElementById('errorSomme').className = 'col-md-12 text-danger text-center';
    }
  }
   /** 
  * Here we create and render the PDF
  */


//   var url = "/Simulateur_CSM/src/TestBook.xlsx";

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
});


