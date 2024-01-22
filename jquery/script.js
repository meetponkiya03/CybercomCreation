jQuery('#form').validate({
    rules: {
        txtName: "required",
        txtEmail:{
            required:true,
            email:true
        },
        txtNumber:{
            required:true,
            maxlength:10
        },
        txtFrom:"required",
        txtTo:"required",
        txtTime:"required",
        dtDate:"required",
        numOfSeat:"required",
    },
    messages: {
        txtName: "Please enter your name",
        txtEmail: "Please enter valid email",
        txtNumber:"Please enter valid number",
        txtFrom:"Please enter your place",
        txtTo:"please enter your destination",
        txtTime:"please enter time",
        dtDate:"please select date",
        numOfSeat:"please enter no. of seat for booking"
    }
});
