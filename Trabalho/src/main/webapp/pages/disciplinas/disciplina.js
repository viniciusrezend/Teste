module = angular.module("Trabalho", []);

module.controller("DisciplinaController", ["$scope", "$http", DisciplinaController]);

function DisciplinaController($scope, $http) {
    $scope.iniciar = funcaoIniciar;
    $scope.salvar = funcaoSalvar;
    $scope.editar = funcaoEditar;
    $scope.excluir = funcaoExcluir;

    $scope.disciplinas = [];
    $scope.disciplina = {};
    $scope.isNovo = true;

  function funcaoIniciar() {
        funcaoCarregar();
        console.log("Disciplinas carregadas!!!!");
    }
    
   function funcaoSalvar() {
        if ($scope.isNovo) {
            $http.post("/disciplinas",$scope.disciplina).success(onSuccess).error(onError);
        } else {
            $http.put("/disciplinas", $scope.disciplina).success(onSuccess).error(onError);
        }

        function onSuccess(data, status) {
            console.log(data);   
            funcaoCarregar();
            $scope.disciplina = {};
            $scope.isNovo = true;
        }

        function onError(data, status) {
            alert("Deu erro" + data);
        }
    }

    function funcaoEditar(vitima) {
        $scope.disciplina = angular.copy(vitima);
        $scope.isNovo = false;
    }

    function funcaoExcluir(vitima) {
        $http.delete("/disciplinas/" + vitima.id).success(onSuccess).error(onError);
        function onSuccess(data, status) {
            console.log(data);
            funcaoCarregar();
            
            
        }

        function onError(data, status) {
            alert("Deu erro!!!" + data);
        }
    }

    function funcaoCarregar() {
        $http.get("/disciplinas").success(onSuccess).error(onError);

        function onSuccess(data, status) {
            $scope.disciplinas = data;
            console.log(data);
        }

        function onError(data, status) {
            alert("Deu erro !!!" + data);
        }
    }

  
}
