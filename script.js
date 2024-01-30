const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();


//.container olarak yazdigimiz icin zaten direkt olarak container classlara odaklaniyoruz, tekrar tanimalama
//yapmamiza gerek yok.

//bu click methodunu yaptigimizda bos olan koltuklarin bilgisini, konumunu almamiza yarayan bir function
//sadece bos olan koltuklar geliyor, baska yerlere tiklarsak veya dolu olan koltuklara da tiklasak yinede
//sadece bos olan koltuklarin geri bildirimini almamiza yarayacak bir function.

//selected kullandigimiz kisimda da bos olan koltuklara tikladigimizda artik selected-secili koltuklara
//donusmesini sagliyoruz, sectikce sari oluyor.
container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotal();
    }
}); 
//movie1-2-3 diye ayirdigimiz icin her movie icin farkli bir ucret olacaktir, bu yuzden bu select
//methodunu yazdik.
select.addEventListener('change', function(e){
    calculateTotal();
});


//querySelectorAll kullandim cunku birden fazla eleman secmek istiyorum
//click attikca '.. adet koltuk icin hesaplanan ucret' kismindaki count sayisi artar.
function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatsArr = []
    const seatsArr = []
 
    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    })

    //spread
    //almis oldugumuz seat listesi uzerinden tek tek dolasiyoruz
    seats.forEach(function(seat){
        seatsArr.push(seat);
    })

    //[1,3,5] secilen elemanlari gosterir, index numarasini bulur.
    //sectigimiz koltuklarin konumunu bulmamizi sagliyor
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });

    console.log(selectedSeatIndexs);

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}