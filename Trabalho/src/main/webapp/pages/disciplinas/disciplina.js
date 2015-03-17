module = angular.module("Trabalho", []);

module.controller("DisciplinaController", ["$scope", "$http", DisciplinaController]);

$scope.iniciar = funcaoIniciar;
$scope.salvar = funcaoSalvar;
$scope.editar = funcaoEditar;
$scope.excluir = funcaoExcluir;

$scope.disciplina = {};
$scope.disciplinas = [];
$scope.isNovo = true;

function funcaoIniciar(){
    console.log = ("Iniciando");
    funcaoCarregar();
    console.log("Disciplinas carregadas");
}

function funcaoCarregar(){
    $http.get("/disciplinas").success(onSuccess).error(onError);
    
    function onSuccess(data,status){
        $scope.disciplinas = data;
        console.log(data);
    }
    function onError(data,status){
        alert("Deu erro");
        
    }
}

function funcaoSalvar(){
    if($scope.isNovo){
        $http.post("/disciplinas", $scope.disciplina).success(onSuccess).error(onError);    
    }else{
        $http.put("/disciplinas", $scope.disciplina).success(onSuccess).error(onError);
    }
    
    function onSuccess(data,status){
        console.log(data);
        funcaoCarregar();
        $scope.disciplina = {};
        $scope.isNovo = true;
    }
    
    function onError(data,status){
        alert("Deu erro");
    }
    
}

function funcaoEditar(vitima){
    disciplina = angular.copy(disciplina);
    $scope.isNovo = false;
}

function funcaoExcluir(vitima){
    $http.delete("/disciplinas" + vitima.id).success(onSuccess).error(onError);
    
    function onSuccess(data,status){
        console.log(data);
        funcaoCarregar();
        
    }
    
    function onError(data,status){
        alert("Deu erro");
    }
}