$('#search').keyup(function () {
    var textInput = $('#search').val();
    var tempArray = textInput.split(' ');
    console.log(tempArray);

    function SearchInArray (inp, array){
        // создаем цикл по проверке слов из input
        for(var i=0;i<inp.length;i++){
            var bool = false, // boolean значение которое по окончанию функции будет возвращать результат
                exception = false, // исключение
                tempInp = valid(inp[i]); // временная переменная которая принимает значение слова

            // условие на исключение
            if(inp[i].charAt(0) == '-') {
                bool = true;
                exception = true;
                tempInp = inp[i].substr(1,inp[i].length);
            }
            
            // тест на валидность
            function valid (param) {
                var regex = ['*','+','#','@','!','$','%','^','&','*','(',')','_','=','/','[',']','|',',','.'];
                for (var j = 0; j < regex.length; j++) {
                    if (param.charAt(0) == regex[j]) {
                        return false;
                    }
                }
                return param;
            }

            // цикл на сравнение с данными их базы
            for(var j=0;j<array.length;j++){
                var newExp = new RegExp(tempInp, "i");
                if(array[j].search(newExp) != -1) {
                    if(exception && inp[i].length>2){ // поиск с исключением если после минуса идет хотябы 2 знака
                        bool = false;
                        break;
                    } else if(!exception && (inp[i].length>0 || i != 0)){ // поиск без исключения
                        bool = true;
                        break;
                    }
                }
            }
            if(!bool) return false;
        }
        return bool;
    }

    // получение данных с сервера
    $.getJSON('json/players.json', function (data) {
        var output = '<ul class="results">'; // новая переменная на выводa
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
        // если в input ничего не указано, количество найденных элементов не будет выводится
        if(allItems!=0 && tempArray!=''){
            findItems += 'Найдено ';
            findItems += allItems;
            findItems += ' елементов';
        }
        // если найденых элементов = 0 -> выдим алерт и убираем строку с результатом
        if (allItems === 0) {
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