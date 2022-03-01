class notification{
    constructor(){
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
    toast_warning(data){
        toastr.warning(data);
    }

    pop_warning(data){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: data,
            showConfirmButton: true,
            //background: '#545',
            timer: 5000
        })
    }
}