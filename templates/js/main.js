// According show with button succes and warning

$(document).ready(function (){
  $('.collapse').on('shown.bs.collapse', function(){

    $(this).parent().find('.btn-warning').removeClass('btn-warning').addClass('btn-success');
  }).on('hidden.bs.collapse', function(){
    $(this).parent().find('.btn-success').removeClass('btn-success').addClass('btn-warning');
  });
});
 
