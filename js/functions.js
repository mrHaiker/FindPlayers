// тест на валидность
function valid(param) {
    var regex = ['*', '+', '#', '@', '!', '$', '%', '^', '&', '*', '(', ')', '_', '=', '/', '[', ']', '|', ',', '.'];
    for (var j = 0; j < regex.length; j++) {
        if (param.charAt(0) == regex[j]) {
            return false;
        }
    }
    return true;
}
//исключение скобок для поиска
function detailedSearch(param) {
    return param.replace(/"+/g, '');
}

// функция сравнения двух масивов
function SearchInArray (inp, array){
    for(var i=0; i<inp.length; i++){ // создаем цикл по проверке слов из input
        var bool = false,
            exception = false;

        if (valid(inp[i])) {
            var tempInp = detailedSearch(inp[i]); // возвращает значение исключая скобки

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