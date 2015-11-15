$('#search').keyup(function () {
    var textInput = $('#search').val();
    var tempArray = textInput.split(' ');

    function SearchInArray (inp, array){

        // внутреннии функции
        function valid(param) { // тест на валидность
            var regex = ['*', '+', '#', '@', '!', '$', '%', '^', '&', '*', '(', ')', '_', '=', '/', '[', ']', '|', ',', '.'];
            for (var j = 0; j < regex.length; j++) {
                if (param.charAt(0) == regex[j]) {
                    return false;
                }
            }
            return true;
        }
        function detailedSearch(param) { //исключение скобок для поиска
            return param.replace(/"+/g, '');
        }


        for(var i=0; i<inp.length; i++){ // создаем цикл по проверке слов из input
            var bool = false,
                exception = false;

            if (valid(inp[i])) {
                var tempInp = detailedSearch(inp[i]); // возвращает значение исключая скобки
                console.log(tempInp);
                if (tempInp.charAt(0) == '-') { // условие на исключение
                    bool = true;
                    exception = true;
                    tempInp = tempInp.substr(1, tempInp.length);
                }

                for (var j = 0; j < array.length; j++) { // цикл на сравнение с данными их базы
                    var newExp = new RegExp(tempInp, "i");
                    if (array[j].search(newExp) != -1) {
                        if (exception && ((inp[i].length > 0 && i == 0) || (i != 0 && inp[i].length > 2))) { // поиск с исключением
                            bool = false;
                            break;
                        } else if (!exception && (tempInp != '' || i > 0)) { // поиск без исключения
                            bool = true;
                            break;
                        }
                    }
                }
                if (!bool) return false;
            }

        }
        return bool; // возвращает результат сравнения
    }

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
