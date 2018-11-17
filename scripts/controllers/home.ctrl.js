angular.module("FyleBank")
.controller("HomeCtrl", ["$scope", "bankList", function($scope, bankList) {
    const ref = $scope;
    const visibleLength = 50;
    ref.data = {
        city: {
            list: bankList.data.cities,
            selected: bankList.data.cities[0],
            refresh: function() {
                ref.data.branches.clear();
                bankList.fetch.banks(
                    this.selected.key,
                    branches => {
                        ref.data.branches.list = branches;
                        ref.data.search.filter();
                    }
                );
            }
        },
        branches: {
            list: [],
            render: {
                visible: [],
                hidden: []
            },
            clear: function() {
                this.list = [];
                this.render.visible = [];
                this.render.hidden = [];
            }
        },
        search: {
            key: "",
            filter: function() {
                let list  = [];
                const key = this.key.trim().toLowerCase();
                if ( key.length === 0 ) {
                    list = ref.data.branches.list;
                } else {
                    list = ref.data.branches.list.filter(bank => (bank.bank_name.toLowerCase().indexOf(key) !== -1) || (bank.address.toLowerCase().indexOf(key) !== -1));
                }
                ref.data.branches.render.visible = list.slice(0, visibleLength);
                ref.data.branches.render.hidden = list.slice(visibleLength);
            }
        }
    };
    ref.data.city.refresh();
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if ( ref.data.branches.render.hidden.length > 0 ) {
                ref.data.branches.render.visible = ref.data.branches.render.visible.concat(ref.data.branches.render.hidden.slice(0, visibleLength));
                ref.data.branches.render.hidden = ref.data.branches.render.hidden.slice(visibleLength);
                ref.$apply();
            }
        }
    };
}]);
