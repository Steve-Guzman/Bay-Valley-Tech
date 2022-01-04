//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
   //Hide results
   document.getElementById('results').style.display = 'none';
   
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


//calculate Results
function calculateResults(e){
    console.log('Calculating...')
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value); // parseFloat converts to decimal // taking amount and getting the value to turn into a decimal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value)*12;


    // Compute Monthly Payment

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly  * calculatedPayments).toFixed(2);
        totalInterest.value  = ((monthly * calculatedPayments)-principal).toFixed(2);
        //Show Results
        document.getElementById('results').style.display = 'block';

        //Hide Loader
        document.getElementById('loading').style.display = 'none';

    }else{
        showError('Please Check Your Numbers');
    }




}


//Show Error
function showError(error){
     //Hide Results
     document.getElementById('results').style.display = 'none';

     //Hide Loader
     document.getElementById('loading').style.display = 'none';
    //create a div
    const errorDiv = document.createElement('div');
    // Get elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('heading');

    //add clas
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Error Above Heading 
    card.insertBefore(errorDiv, heading);

    // Clear Error After 3 Seconds
    setTimeout(clearError, 3000);
}

// clear error
function clearError(){
    document.querySelector('.alert').remove();
}