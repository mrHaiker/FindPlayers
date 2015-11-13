$('#search').keyup(function () {
    var textInput = $('#search').val();
    var tempArray = textInput.split(' ');

    function SearchInArray (inp, array){
        // ������� ���� �� �������� ���� �� input
        for(var i=0;i<inp.length;i++){
            //Brazil inp[0] / Midfield inp[1]
            var bool, exception, tempInp;
            // ������� �� ����������
            if(inp[i].charAt(0) == '-') {
                bool = true;
                exception = true;
                if(inp[i].length===1) { // �� ����� ����������� ���������� ���� ������ ������ -
                    tempInp='--/'; // ���������� ��� ��������� ������
                } else {
                    tempInp = inp[i].substr(1,inp[i].length);
                }
            } else {
                bool = false;
                exception = false;
                tempInp = inp[i];
            }
            // ���� �� ��������� � ������� �� ����
            for(var j=0;j<array.length;j++){
                //Brazil array[0]
                var newExp = new RegExp(tempInp, "i");
                if(array[j].search(newExp) != -1) {
                    if(exception){ // ����� � �����������
                        bool = false;
                        break;
                    } else { // ����� ��� ����������
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
        // �����
        output += '</ul>'
        if(textInput === ''){
            //var output = '<ul class="results"></ul>';
            var output = '';
        }
        $('.update').html(output);
    });
});