$('#search').keyup(function () {
    var textInput = $('#search').val();
    var tempArray = textInput.split(' ');

    function SearchInArray (inp, array){
        // создаем цикл по проверке слов из input
        for(var i=0;i<inp.length;i++){
            //Brazil inp[0] / Midfield inp[1]
            var bool, exception, tempInp;
            // условие на исключение
            if(inp[i].charAt(0) == '-') {
                bool = true;
                exception = true;
                if(inp[i].length===1) { // не будет производить исключение если указан только -
                    tempInp='--/'; // присвоение для остановки поиска
                } else {
                    tempInp = inp[i].substr(1,inp[i].length);
                }
            } else {
                bool = false;
                exception = false;
                tempInp = inp[i];
            }
            // цикл на сравнение с данными их базы
            for(var j=0;j<array.length;j++){
                //Brazil array[0]
                var newExp = new RegExp(tempInp, "i");
                if(array[j].search(newExp) != -1) {
                    if(exception){ // поиск с исключением
                        bool = false;
                        break;
                    } else { // поиск без исключения
                        bool = true;
                        break;
                    }
                }
            }
            if(!bool) return false;
        }
        return bool;
    }

    $.getJSON('json/players.json', function (data) {
        var output = '<ul class="results">';
        $.each(data, function (key, val) {
            var strSearchBox = val.position+" "+val.nationality+" "+val.name+" "+val.id;
            var SearchBox = strSearchBox.split(' ');
            if(SearchInArray(tempArray,SearchBox)){
                output += '<li>';
                output += '<h2>' + val.name + '</h2>';
                output += '<p>' + val.id+ '</p>';
                output += '<p>' + val.position + '</p>';
                output += '<p>' + val.nationality + '</p>';
                output += '</li>';
            }
        });
        // вывод
        output += '</ul>'
        if(textInput === ''){
            //var output = '<ul class="results"></ul>';
            var output = '';
        }
        $('.update').html(output);
    });
});