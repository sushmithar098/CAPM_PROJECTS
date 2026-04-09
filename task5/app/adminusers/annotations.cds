using UserService as service from '../../srv/service';
using from '../../srv/service';

annotate AdminService.User with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : email,
            Label : 'email',
        },
        {
            $Type : 'UI.DataField',
            Value : role,
            Label : 'role',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
        {
            $Type : 'UI.DataField',
            Value : username,
            Label : 'username',
        },
        {
            $Type : 'UI.DataField',
            Value : isActive,
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'user',
            ID : 'user',
            Target : '@UI.FieldGroup#user',
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : '{i18n>Logdetails}',
            ID : 'i18nOverview',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>Details}',
                    ID : 'i18nDetails',
                    Target : '@UI.FieldGroup#i18nDetails',
                },
            ],
        },
    ],
    UI.FieldGroup #user : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : ID,
                Label : 'ID',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
            },
            {
                $Type : 'UI.DataField',
                Value : role,
                Label : '{i18n>Role}',
            },
            {
                $Type : 'UI.DataField',
                Value : username,
                Label : '{i18n>Username}',
            },
            {
                $Type : 'UI.DataField',
                Value : email,
                Label : 'email',
            },
            {
                $Type : 'UI.DataField',
                Value : isActive,
            },
        ],
    },
    UI.SelectionFields : [
        isActive,
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : username,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : username,
        },
        TypeImageUrl : 'sap-icon://alert',
    },
    UI.FieldGroup #i18nDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : createdAt,
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedAt,
            },
        ],
    },
    UI.PresentationVariant #vh_User_username : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : username,
                Descending : false,
            },
        ],
    },
);

annotate AdminService.User with {
    isActive @(
        Common.Label : '{i18n>Isactive}',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'User',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : isActive,
                    ValueListProperty : 'isActive',
                },
            ],
        },
        Common.ValueListWithFixedValues : false,
    )
};

annotate AdminService.User with {
    lastLogin @Common.Label : 'lastLogin'
};

annotate AdminService.Profile with {
    gender @Common.Label : 'profile/gender'
};

annotate AdminService.User with {
    gender @(
        Common.Label : 'gender',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'User',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : gender,
                    ValueListProperty : 'gender',
                },
            ],
            Label : 'gender',
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate AdminService.User with {
    username @(
        UI.MultiLineText : false,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'User',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : username,
                    ValueListProperty : 'username',
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'isActive',
                    LocalDataProperty : IsActiveEntity,
                },
            ],
            Label : 'as',
            PresentationVariantQualifier : 'vh_User_username',
        },
        Common.ValueListWithFixedValues : true,
        )
};

