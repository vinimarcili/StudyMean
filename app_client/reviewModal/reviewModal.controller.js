(function () {

    var reviewModalCtrl = function($uibModalInstance, loc8rData, locationData){
        var vm = this;

        vm.locationData = locationData;
        vm.onSubmit = function(){
            vm.formError = "";

            if (!vm.formData.rating || !vm.formData.reviewText){
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };

        vm.doAddReview = function(locationid, formData){
            loc8rData.addReviewById(locationid, {
                rating : formData.rating,
                reviewText : formData.reviewText
            })
            .then(
                function successCallback(data){
                    vm.modal.close(data);
                },
                function errorCallback(data){
                    console.log(data);
                    vm.formError = "Tente novamente mais tarde";
                }
            );
            return false;
        };

        vm.modal = {
            close : function (result) {
                $uibModalInstance.close(result);
            },
            cancel : function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

    };

    reviewModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'locationData'];

    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

})();