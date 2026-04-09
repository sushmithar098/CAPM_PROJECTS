sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"user/test/integration/pages/UserList",
	"user/test/integration/pages/UserObjectPage"
], function (JourneyRunner, UserList, UserObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('user') + '/test/flp.html#app-preview',
        pages: {
			onTheUserList: UserList,
			onTheUserObjectPage: UserObjectPage
        },
        async: true
    });

    return runner;
});

