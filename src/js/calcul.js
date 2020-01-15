document.getElementById('calcul').addEventListener('click', () => {
    document.getElementById('TA').className = 'isHidden';
    document.getElementById('detailCalcul').className = 'isHidden';
    if(document.getElementById('MS').value === '') {
        document.getElementById('errorNoValue').className = 'isDisplayed';
    } else {
        var contribution;
        var eightySeven;
        var thirteen;
        
        document.getElementById('errorNoValue').className = 'isHidden';
        // We multiply the user's input by 0.686
        contribution = document.getElementById('MS').value * 0.0068;
        // Then we display the result in a new div
        document.getElementById('TA').className = 'isDisplayed col-12 p-0';
        document.getElementById('contributionTA').value = contribution.toFixed(2);
        // setTimeout(() => {
        //     document.getElementById('spinnerCalcul').className = 'spinner-border isDisplayed offset-6';
        // }, 500);
        // setTimeout(() => {
            document.getElementById('spinnerCalcul').className = 'spinner-border isHidden';
            eightySeven = contribution * 0.87;
            thirteen = contribution * 0.13;
            document.getElementById('detailCalcul').className = 'isDisplayed';
            document.getElementById('contributionOPCA').value = eightySeven.toFixed(2);
            document.getElementById('contributionETS').value = thirteen.toFixed(2);
            ETSValue = document.getElementById('contributionETS').value;
            localStorage["ETSValue"] = ETSValue;
        // }, 2000);   
    }
  });
