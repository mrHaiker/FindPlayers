$('#search').keyup(function () {
    var textInput = $('#search').val();
    var tempArray = textInput.split(' ');

    // получение данных с сервера
    $.getJSON('json/players.json', function (data) {
        $('.results').empty();
        var allItems = 0; // переменная которая выведет количество найденых совпадений
        $.each(data, function (key, val) {
            var strSearchBox = val.position+" "+val.nationality+" "+val.name+" "+val.id;
            var SearchBox = strSearchBox.split(' ');
            if(SearchInArray(tempArray,SearchBox)) {
                allItems += 1;
                constructorOutput(val.name, val.id, val.position, val.nationalyty, val.marketValue);
            }
        });
        // вывод на экран
        if (allItems === 0 && tempArray!='') {  // если найденых элементов = 0 -> выводим
            $($('<div class="alert alert-danger" role="alert"><b>Увы</b>, но по Вашему запросу ничего не найдено</div>')).prependTo('.results');
        }

        var findItems = ''; // количество найденных элементов
        if(allItems!=0 && tempArray!=''){ // если в input ничего не указано, количество найденных элементов не будет выводится
            findItems = 'Найдено ';
            findItems += allItems;
            findItems += keyWord(allItems); //получаем слово "элеметнов" видоизменееное под число
        }
        $('#find-items').text(findItems);
    });
});

// анимация со ссылками
setTimeout(function(){
    $('#first-article').fadeIn(400);
}, 100);
setTimeout(function(){
    $('#second-article').fadeIn(400);
}, 300);
setTimeout(function(){
    $('#third-article').fadeIn(400);
}, 500);
setTimeout(function(){
    $('#fourth-article').fadeIn(400);
}, 700);
