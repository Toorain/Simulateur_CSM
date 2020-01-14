window.onload = () => {
  ETSValueP2 = localStorage["ETSValue"];
  document.getElementById('contributionETSValidation').value = ETSValueP2;
};

if (document.getElementById('send') !== null) {
  document.getElementById('send').addEventListener('click', () => {
    var url = "/taxe_apprentissage_csm/src/TestBook.xlsx";

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
      console.log(ws);

      XLSX.writeFile(wb, 'new.xlsx');

      var htmlstr = XLSX.write(wb,{sheet:"Sheet1", type:'binary',bookType:'html'});
      $('#wrapper')[0].innerHTML += htmlstr;
    }
    
    req.send();
  });
};