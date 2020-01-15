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
    if (parseInt(versement) > 0 && parseInt(versement) <= parseFloat(ETSValueP2)) {
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
      document.getElementById('passwordHelp').innerHTML = 'Doit être compris entre 1 et ' + ETSValueP2;
      document.getElementById('passwordHelp').className = 'text-danger';
    }
  // }
});

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
    doc.text('Le montant à verser est de : ' + ETSValueP2, 105, height += 50, "center");
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
