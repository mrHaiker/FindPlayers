$('#search').keyup(function () {
    var textInput = $('#search').val();
    var tempArray = textInput.split(' ');

    // получение данных с сервера
    $.getJSON('json/players.json', function (data) {
        var output = '<ul class="results">';
        var allItems = 0; // переменная которая выведет количество найденых совпадений
        $.each(data, function (key, val) {
            var strSearchBox = val.position+" "+val.nationality+" "+val.name+" "+val.id;
            var SearchBox = strSearchBox.split(' ');
            if(SearchInArray(tempArray,SearchBox)) {
                allItems += 1;
                output += '<li>';
                output += '<div class="thumbnail ">';
                output += '<img src="http://placehold.it/150x150" alt="">';
                output += '<div class="title">';
                output += '<h2 class="name">' + val.name + '</h2>';
                output += '<p class="id">' + val.id + '</p>';
                output += '<p class="position">' + val.position + '</p>';
                output += '<p class="nationaly">' + val.nationality + '</p>';
                output += '<p class="marketValue">' + val.marketValue + '</p>';
                output += '</div>';
                output += '</li>';
            }
        });
        // вывод на экран
        var findItems = '';

        if(allItems!=0 && tempArray!=''){ // если в input ничего не указано, количество найденных элементов не будет выводится
            findItems += 'Найдено ';
            findItems += allItems;
            if (allItems === 1) {
                findItems += ' елемент';
            } else if (allItems === 2 || allItems === 3 || allItems === 4) {
                findItems += ' елемента'
            } else {
                findItems += ' елементов';
            }
        }

        if (allItems === 0) {  // если найденых элементов = 0 -> выдим алерт и убираем строку с результатом
            output = '<div class="alert alert-danger" role="alert"><b>Увы</b>, но по Вашему запросу ничего не найдено</div>';
        }

        $('#find-items').text(findItems);
        output += '</ul>';
        if(textInput === ''){
            output = '';
        }

        $('.update').html(output);
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
