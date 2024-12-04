sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";
      var that;
    return Controller.extend("empinfo.controller.Odata", {
        onInit(){
            that=this;
            var oModel=that.getOwnerComponent().getModel();
            that.getView().setModel(oModel);
             if(!that.create){
                that.create = sap.ui.xmlfragment("empinfo.fragment.create", that);
             }
        },
        onOpenDialog: function(){ 
            that.create.open()
        },
        onSubmitDialog: function(){
        var sEmpId = sap.ui.getCore().byId("eid").getValue();
        var sfirstName = sap.ui.getCore().byId("efirstName").getValue();
        var slastName = sap.ui.getCore().byId("elastName").getValue();
        var sEmail = sap.ui.getCore().byId("eEmail").getValue();
        var sPhone = sap.ui.getCore().byId("ePhone").getValue();
        var sdepartment=sap.ui.getCore().byId("edepartment").getValue();
        var sposition=sap.ui.getCore().byId("eposition").getValue();
        var sjoiningDate=sap.ui.getCore().byId("ejoiningDate").getValue();
        if (sEmpId && sfirstName && slastName && sEmail && sPhone && sdepartment && sposition && sjoiningDate) {
            var oNewEmployee = {
                FirstName:sfirstName,
                LastName:slastName,
                Email:sEmail,
                Phone:sPhone,
                Department:sdepartment,
                Position:sposition,
                JoiningDate:sjoiningDate
            };
        }
        var oData = that.getOwnerComponent().getModel();
        oData.create("/EmployeeInfo", oNewEmployee, {
                success: function (response) {
                    MessageToast.show("Record created successfully");
                   
                },
                error: function (error) {
                    console.log(error)
                }
        })
 
    },            
        })
    })
   