sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"adminusers/test/integration/pages/UserList",
	"adminusers/test/integration/pages/UserObjectPage"
], function (JourneyRunner, UserList, UserObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('adminusers') + '/test/flp.html#app-preview',
        pages: {
			onTheUserList: UserList,
			onTheUserObjectPage: UserObjectPage
        },
        async: true
    });

    return runner;
});

