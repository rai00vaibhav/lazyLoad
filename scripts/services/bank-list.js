angular.module("FyleBank")
.factory("bankList", ["$http", function ($http) {
    const resourceUrl = "https://vast-shore-74260.herokuapp.com/banks?city=";
    const service = {
        data: {
            cities: [
                {
                    key: "MUMBAI",
                    label: "Mumbai"
                },
                {
                    key: "BANGALORE",
                    label: "Bangalore"
                },
                {
                    key: "DELHI",
                    label: "Delhi"
                },
                {
                    key: "KOLKATA",
                    label: "Kolkata"
                }
            ]
        },
        fetch: {
            banks: function(city, successCallback) {
                $http({
                    method: "GET",
                    url: `${resourceUrl}${city}`
                })
                .success((data, status, headers, config) => {
                    successCallback(data);
                });
            }
        }
    }
    return service;
}]);
