sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, MessageBox, MessageToast) => {
    "use strict";
    var that;
    return Controller.extend("empinfo.controller.Odata", {
        onInit() {
            that = this;
            var oModel = that.getOwnerComponent().getModel();
            that.getView().setModel(oModel);
            if (!that.create) {
                that.create = sap.ui.xmlfragment("empinfo.fragment.create", that);
                that.getView().addDependent(that.create); // Ensure the fragment is added as a dependent
            } 
        },
        onOpenDialog: function () {
            that.create.open();
        },
        onSubmitDialog: function () {
            var sfirstName = sap.ui.getCore().byId("efirstName").getValue();
            var slastName = sap.ui.getCore().byId("elastName").getValue();
            var sEmail = sap.ui.getCore().byId("eEmail").getValue();
            var sPhone = sap.ui.getCore().byId("ePhone").getValue();
            var sdepartment = sap.ui.getCore().byId("edepartment").getValue();
            var sposition = sap.ui.getCore().byId("eposition").getValue();
            var sjoiningDate = sap.ui.getCore().byId("ejoiningDate").getValue();

            if (sfirstName && slastName && sEmail && sPhone && sdepartment && sposition && sjoiningDate) {
                var oNewEmployee = {
                    FirstName: sfirstName,
                    LastName: slastName,
                    Email: sEmail,
                    Phone: sPhone,
                    Department: sdepartment,
                    Position: sposition,
                    JoiningDate: sjoiningDate
                };

                var oData = that.getOwnerComponent().getModel();

                // Creating the new employee record
                oData.create("/EmployeeInfo", oNewEmployee, {
                    success: function (response) {
                        console.log(response)
                        // Show success message
                        MessageToast.show("Record created successfully");
                        // Close the dialog
                        that.create.close();

                        // Refresh the table data (ensure the model is refreshed)
                        oData.refresh(true);
                    },
                    error: function (error) {
                        // Handle error if the creation fails
                        MessageToast.show("Error creating record");
                        console.log(error);
                    }
                });
            } else {
                MessageBox.error("Please fill all required fields.");
            }
        },
        // Close the dialog function if needed
        onclose: function () {
            that.create.close();
        },
        // onClear: function(){
        //     sap.ui.getCore().byId("eFirstName").setValue("");
        //     sap.ui.getCore().byId("eLatName").setValue("");
        //     sap.ui.getCore().byId("eEmail").setValue("");
        //     sap.ui.getCore().byId("ePhone").setValue("");
        //     sap.ui.getCore().byId("edepartment").setValue("");
        //     sap.ui.getCore().byId("eposition").setValue("");
        //     sap.ui.getCore().byId("ejoiningDate").setValue("");
        // } 
        DeleteBtn: function(oEvent){
            var oButton=oEvent.getSource();
            var oContext=oButton.getBindingContext();
            var sPath=oContext.getPath();
            var oModel=this.getView().getModel();
            oModel.remove(sPath,{
                success: function(){
                    sap.m.MessageToast.show("Record deleted successfully!");
                },
                error: function(){
                    sap.m.MessageToast.show("Cannot delete record");
                }
            })
        },
        UpdateBtn: function(oEvent){
            if(!that.update){
                that.update=sap.ui.xmlfragment("empinfo.fragment.update", that)
            }
            var oContext = oEvent.getSource().getBindingContext().getObject();
            sap.ui.getCore().byId("id_E").setValue(oContext.ID);
            sap.ui.getCore().byId("FN_E").setValue(oContext.FirstName);
            sap.ui.getCore().byId("LN_E").setValue(oContext.LastName);
            sap.ui.getCore().byId("E_E").setValue(oContext.Email);
            sap.ui.getCore().byId("P_E").setValue(oContext.Phone);
            sap.ui.getCore().byId("D_E").setValue(oContext.Department);
            sap.ui.getCore().byId("PO_E").setValue(oContext.Position);
            sap.ui.getCore().byId("JD_E").setValue(oContext.JoiningDate);
            that.update.open();
        },
        onUpdateDialog: function() {
            var sId = sap.ui.getCore().byId("id_E").getValue();
            var sfirstName = sap.ui.getCore().byId("FN_E").getValue();
            var slastName = sap.ui.getCore().byId("LN_E").getValue();
            var sEmail = sap.ui.getCore().byId("E_E").getValue();
            var sPhone = sap.ui.getCore().byId("P_E").getValue();
            var sDepartment = sap.ui.getCore().byId("D_E").getValue();
            var sPosition = sap.ui.getCore().byId("PO_E").getValue();
         
                var oUpdatedEmployee = {
                    ID:sId,
                    FirstName: sfirstName,
                    LastName: slastName,
                    Email: sEmail,
                    Phone: sPhone,
                    Department: sDepartment,
                    Position: sPosition
                 
                };
                var oData = that.getOwnerComponent().getModel();
                var updatePath = `/EmployeeInfo(guid'${sId}')`
                oData.update(updatePath, oUpdatedEmployee,{
                    success: function(){
                        sap.m.MessageToast.show("Record updated successfully!");
                    },
                error: function (error) {
                console.log(error)
                MessageToast.show("Cannot update record");
                },
                onCancleDialog: function(){
                    that.update.close();
                }
           })
        },  
  })
});



