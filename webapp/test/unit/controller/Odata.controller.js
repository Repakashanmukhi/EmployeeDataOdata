/*global QUnit*/

sap.ui.define([
	"empinfo/controller/Odata.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Odata Controller");

	QUnit.test("I should test the Odata controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
