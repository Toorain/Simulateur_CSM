var rs;
var siret;
var mail;
var tel;
var versement;
var moyenDePaiement;
var ETSValueP2;

window.onload = () => {
  ETSValueP2 = localStorage["ETSValue"];
  document.getElementById("ETSValidation").value = ETSValueP2;
  document.getElementById("ETSVersement").placeholder = ETSValueP2;
};

document.getElementById("send").addEventListener("click", () => {
  rs = document.getElementById("validationSociale").value;
  siret = document.getElementById("validationSiret").value;
  mail = document.getElementById("validationMail").value;
  tel = document.getElementById("validationTelephone").value;
  versement = document.getElementById("ETSVersement").value;
  radio = document.getElementsByName("customRadio");

  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      // do whatever you want with the checked radio
      moyenDePaiement = radio[i].value;

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  // We check if all the fields are filled.
  if (
    rs !== "" &&
    siret !== "" &&
    mail !== "" &&
    tel !== "" &&
    versement !== ""
  ) {
    if (parseInt(versement) > 0 && parseInt(versement) <= parseFloat(ETSValueP2)) {
      $("#formElement :input").prop("disabled", true);
      document.getElementById("getPDF").removeAttribute("disabled");
      document.getElementById("reloadForm").removeAttribute("disabled");
      document.getElementById('passwordHelp').innerHTML = '';
      document.getElementById('passwordHelp').className = 'text-danger isHidden';
      var url = "/Simulateur_CSM/src/TestBook.xlsx";

      /* set up async GET request */
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.responseType = "arraybuffer";

      req.onload = function(e) {
        var data = new Uint8Array(req.response);
        var wb = XLSX.read(data, { type: "array" });
        var ws = wb.Sheets.Sheet1;
        XLSX.utils.sheet_add_aoa(ws, [["new data", 1, 2, 3]], { origin: -1 });

        XLSX.writeFile(wb, "new.xlsx");

        // var htmlstr = XLSX.write(wb,{sheet:"Sheet1", type:'binary',bookType:'html'});
        // $('#wrapper')[0].innerHTML += htmlstr;
      };

      req.send();
    } else {
      document.getElementById('passwordHelp').innerHTML = 'Doit être compris entre 1 et ' + ETSValueP2;
      document.getElementById('passwordHelp').className = 'text-danger';
    }
  }
});

document.getElementById("getPDF").addEventListener("click", () => {
  var height = 40;
  // Default export is a4 paper, portrait, using milimeters for units
  var doc = new jsPDF();

  doc.text('Nom de l\'entreprise :', 80, height, "center");
  doc.text(rs, 120, height, "center");
  doc.text('Numéro de Siret :', 80, height += 10, "center");
  doc.text(siret, 120, height, "center");
  doc.text(ETSValueP2 + ' €', 105, height += 30, "center");
  doc.text("à verser par", 105, height += 10, "center");
  doc.text(moyenDePaiement, 105, height += 10, "center");
  doc.text("à l'adresse", 105, height += 10, "center");
  doc.text("Etablissement ", 105, height += 10, "center");
  doc.text("Adresse numéro de la rue", 105, height += 10, "center");
  doc.text("Ville et code postal", 105, height += 10, "center");
  // doc.autoTable({html: document.getElementById('pdfJS')});  //as simple as that!
  doc.save("a4.pdf");
});

document.getElementById("reloadForm").addEventListener("click", () => {
  location.reload();
  document.getElementById("getPDF").setAttribute("disabled", "disabled");
  document.getElementById("reloadForm").setAttribute("disabled", "disabled");
});
