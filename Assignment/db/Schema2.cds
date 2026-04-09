namespace my.db;

using { cuid, managed } from '@sap/cds/common';

@title: 'Employee Master'                     
@description: 'Stores employee details'        
@cds.persistence.table                        
entity Employee : cuid, managed {

    @title: 'Employee Name'                    
    @mandatory                                 
    name        : String(100);

    @default: 18                               
    @assert.range: [18, 60]                    
    age         : Integer;

    @assert.unique                             
    email       : String(150);

    @default: 'ACTIVE'                         
    status      : String(20);

    @readonly                                  
    createdAt   : Timestamp;

    department  : String(50);
}