$('#addReview').submit(function(e){
    var alert = $('.alert.alert-danger');
    alert.hide();
    if(!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()){
        if(alert.length){
            alert.show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-danger">Todos os campos são obrigatórios.</div>');
        }
        return false;
    }
});