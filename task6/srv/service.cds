service geolocation {

    
    type Location {
        cityname  : String;
        latitude  : Double;
        longitude : Double;
        
    }

    function getdistrictdetails(state:String) returns many  Location;
    function getLocationdetails(userinput : String) returns many Location;
    function getstates(countryCode: String) returns many Location;
    function getAddressdetails(Doorno:String,streetname:String,city:String,state:String,country:String,pincode:String) returns many Location;
    
}