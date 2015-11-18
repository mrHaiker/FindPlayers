// ���� �� ����������
function valid(param) {
    var regex = ['*', '+', '#', '@', '!', '$', '%', '^', '&', '*', '(', ')', '_', '=', '/', '[', ']', '|', ',', '.'];
    for (var j = 0; j < regex.length; j++) {
        if (param.charAt(0) == regex[j]) {
            return false;
        }
    }
    return true;
}
//���������� ������ ��� ������
function detailedSearch(param) {
    return param.replace(/"+/g, '');
}

// ������� ��������� ���� �������
function SearchInArray (inp, array){
    for(var i=0; i<inp.length; i++){ // ������� ���� �� �������� ���� �� input
        var bool = false,
            exception = false;

        if (valid(inp[i])) {
            var tempInp = detailedSearch(inp[i]); // ���������� �������� �������� ������

            if (tempInp.charAt(0) == '-') { // ������� �� ����������
                bool = true;
                exception = true;
                tempInp = tempInp.substr(1, tempInp.length);
            }

            for (var j = 0; j < array.length; j++) { // ���� �� ��������� � ������� �� ����
                var newExp = new RegExp(tempInp, "i");
                if (array[j].search(newExp) != -1) {
                    if (exception && ((inp[i].length > 0 && i == 0) || (i != 0 && inp[i].length > 2))) { // ����� � �����������
                        bool = false;
                        break;
                    } else if (!exception && (tempInp != '' || i > 0)) { // ����� ��� ����������
                        bool = true;
                        break;
                    }
                }
            }
            if (!bool) return false;
        }
    }
    return bool; // ���������� ��������� ���������
}