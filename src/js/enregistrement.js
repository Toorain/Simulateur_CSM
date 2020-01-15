var rs;
var siret;
var mail;
var tel;
var versement;
var moyenDePaiement;
var ETSValueP2;

window.onload = () => {
  ETSValueP2 = localStorage["ETSValue"];
  document.getElementById('ETSValidation').value = ETSValueP2;
  document.getElementById('ETSVersement').placeholder = ETSValueP2;
};

document.getElementById('send').addEventListener('click', () => {
  var rs = document.getElementById('validationSociale').value;
  var siret = document.getElementById('validationSiret').value;
  var mail = document.getElementById('validationMail').value;
  var tel = document.getElementById('validationTelephone').value;
  var versement = document.getElementById('ETSVersement').value;
  var radio = document.getElementsByName('customRadio');

  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      // do whatever you want with the checked radio
      moyenDePaiement = radio[i].value;
  
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
  
  // We check if all the fields are filled.
  if(rs !== '' && siret !== '' && mail !== '' && tel !== '' && versement !== '') {
    $("#formElement :input").prop("disabled", true);
    document.getElementById('getPDF').removeAttribute('disabled');
    document.getElementById('reloadForm').removeAttribute('disabled');
    var url = "/Simulateur_CSM/src/TestBook.xlsx";
    

    /* set up async GET request */
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    
    req.onload = function(e) {
      var data = new Uint8Array(req.response);
      var wb = XLSX.read(data, {type:"array"});
      var ws = wb.Sheets.Sheet1;
      XLSX.utils.sheet_add_aoa(ws, [
        ["new data", 1, 2, 3]
      ], {origin: -1});

      XLSX.writeFile(wb, 'new.xlsx');

      // var htmlstr = XLSX.write(wb,{sheet:"Sheet1", type:'binary',bookType:'html'});
      // $('#wrapper')[0].innerHTML += htmlstr;
    }
    
    req.send();
  }    
});

document.getElementById('getPDF').addEventListener('click', () => {  
  console.log(moyenDePaiement);
    
  // Default export is a4 paper, portrait, using milimeters for units
  // var doc = new jsPDF();

  // doc.text(rs, 100, 10);
  // doc.text('Hello Moto!', 10, 20);
  // // doc.autoTable({html: document.getElementById('pdfJS')});  //as simple as that!
  // doc.save('a4.pdf');
});

document.getElementById('reloadForm').addEventListener('click', () => {
  location.reload();
  document.getElementById('getPDF').setAttribute('disabled', 'disabled');
});
