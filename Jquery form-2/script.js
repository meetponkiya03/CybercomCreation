jQuery('#Patientform').validate({
    rules: {
        ddgender: "required",
        txtFirstname:"required",
        txtLastname:"required",
        txtHeight:"required",
        txtWeight:"required",
        txtEmail:{
            required:true,
            email:true
        },
        txtReason:"required",
        month:"required",
        day:"required",
        year:"required"
    },
    messages: {
        ddgender: "Please enter your gender",
        txtFirstname: "Please enter first name",
        txtLastname:"Please enter last number",
        
    }
});
