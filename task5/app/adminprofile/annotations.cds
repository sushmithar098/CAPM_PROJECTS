using UserService as service from '../../srv/service';
using from '../../srv/service';

annotate AdminService.Profile with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : address,
            Label : 'address',
        },
        {
            $Type : 'UI.DataField',
            Value : age,
            Label : 'age',
        },
        {
            $Type : 'UI.DataField',
            Value : bio,
            Label : 'bio',
        },
        {
            $Type : 'UI.DataField',
            Value : gender,
        },
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : phone,
            Label : 'phone',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'profile',
            ID : 'profile',
            Target : '@UI.FieldGroup#profile',
        },
    ],
    UI.FieldGroup #profile : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : age,
                Label : 'age',
            },
            {
                $Type : 'UI.DataField',
                Value : bio,
                Label : 'bio',
            },
            {
                $Type : 'UI.DataField',
                Value : dateOfBirth,
                Label : 'dateOfBirth',
            },
            {
                $Type : 'UI.DataField',
                Value : gender,
            },
            {
                $Type : 'UI.DataField',
                Value : ID,
                Label : 'ID',
            },
            {
                $Type : 'UI.DataField',
                Value : phone,
                Label : 'phone',
            },
            {
                $Type : 'UI.DataField',
                Value : address,
                Label : 'address',
            },
        ],
    },
);

