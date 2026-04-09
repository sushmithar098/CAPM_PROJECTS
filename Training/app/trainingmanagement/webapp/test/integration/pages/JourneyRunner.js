sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"trainingmanagement/test/integration/pages/trainerList",
	"trainingmanagement/test/integration/pages/trainerObjectPage"
], function (JourneyRunner, trainerList, trainerObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('trainingmanagement') + '/test/flp.html#app-preview',
        pages: {
			onThetrainerList: trainerList,
			onThetrainerObjectPage: trainerObjectPage
        },
        async: true
    });

    return runner;
});

