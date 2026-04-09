sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"adminprofile/test/integration/pages/ProfileList",
	"adminprofile/test/integration/pages/ProfileObjectPage"
], function (JourneyRunner, ProfileList, ProfileObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('adminprofile') + '/test/flp.html#app-preview',
        pages: {
			onTheProfileList: ProfileList,
			onTheProfileObjectPage: ProfileObjectPage
        },
        async: true
    });

    return runner;
});

