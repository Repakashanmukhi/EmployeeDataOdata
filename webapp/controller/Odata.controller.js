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
                 that.getView().addDependent(that.create);
             }
         },
         // Opens the fragment 
         onOpenDialog: function () {
             that.create.open();
         },
         // Calendar select handler
         handleCalendarSelect: function (oEvent) {
        var oCalendar = oEvent.getSource();
        var oSelectedDate = oCalendar.getSelectedDates()[0].getStartDate(); // Get selected date
        var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
        var sFormattedDate = oDateFormat.format(oSelectedDate);
        sap.ui.getCore().byId("ejoiningDate").setValue(sFormattedDate); // Set the value in the input
         },
         //Enter the employee information
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
                 oData.create("/EmployeeInfo", oNewEmployee, {
                     success: function (response) {
                         MessageToast.show("Record created successfully");
                         that.create.close();
                         oData.refresh(true);
                    },
                    error: function (error) {
                        MessageToast.show("Error creating record");
                    }
                });
            } else {
                MessageBox.error("Please fill all required fields.");
            }
        }, 
        onclose: function () {
            that.create.close();
        },
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
        handleCalendarSelectUpdate: function (oEvent) {
            var oCalendar = oEvent.getSource();
            var oSelectedDate = oCalendar.getSelectedDates()[0].getStartDate();
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
            var sFormattedDate = oDateFormat.format(oSelectedDate);
            sap.ui.getCore().byId("JD_E").setValue(sFormattedDate); 
        },
        UpdateBtn: function(oEvent){
            if(!that.update){
                that.update=sap.ui.xmlfragment("empinfo.fragment.update", that)
            }
            var oContext = oEvent.getSource().getBindingContext().getObject();
            // set the values which are present in the table to update fragment 
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
         //Get the values from table and display them on a update fragment 
        onUpdateDialog: function(){
            var sId = sap.ui.getCore().byId("id_E").getValue();
            var sfirstName = sap.ui.getCore().byId("FN_E").getValue();
            var slastName = sap.ui.getCore().byId("LN_E").getValue();
            var sEmail = sap.ui.getCore().byId("E_E").getValue();
            var sPhone = sap.ui.getCore().byId("P_E").getValue();
            var sDepartment = sap.ui.getCore().byId("D_E").getValue();
            var sPosition = sap.ui.getCore().byId("PO_E").getValue();
            // Validate that all fields are filled
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
            }
            })
         }
     });
 });
