<?php
//Filme.php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//GET recebe/pega informações]
//POST envia informaçoes
//PUT edita informações "update"
//DELETE deleta informações
//OPTIONS é a relação de methodos disponiveis para uso
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;   
}

include 'conexao.php';

//Rota para obter TODOS os filme
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    //aqui eu crio o comando de select para consultar o banco
    $stmt = $conn->prepare("SELECT * FROM filme");
    //aqui eu executo o select
    $stmt->execute();
    //aqui eu recebo os dados do banco por meio do PDO
    $filme = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //tranformo os dados da variavel $filme em um JSON valido
    echo json_encode($filme);
}

//Rota para criar filme
if ($_SERVER ['REQUEST_METHOD'] === 'POST'){
    $titulo = $_POST['titulo'];
    $diretor = $_POST['diretor'];
    $ano_lancamento = $_POST['ano_lancamento'];
    $genero = $_POST['genero'];
    //inserir outros campos caso necessario

    $stmt = $conn->prepare("INSERT INTO filme (titulo, diretor, ano_lancamento, genero) VALUES (:titulo, :diretor, :ano_lancamento, :genero)");

    $stmt->bindParam(":titulo", $titulo);
    $stmt->bindParam(":diretor",$diretor);
    $stmt->bindParam(":ano_lancamento", $ano_lancamento);
    $stmt->bindParam(":genero", $genero);
    //Outros bindParams ...

    if($stmt->execute()){
        echo "Filme criado com sucesso!!";
    }else{
        echo "error ao criar filme!!";
    }
}

//rota para excluir um filme
if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM filme WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "filme excluido com sucesso!!";
    } else {
        echo"erro ao excluir filme";
    }
}

//Rota para atualizar um filme existente
if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $novoTitulo = $_PUT['titulo'];
    $novoDiretor = $_PUT['diretor'];
    $novoAno = $_PUT['ano_lancamento'];
    $novoGenero = $_PUT['genero'];

    $stmt = $conn->prepare("UPDATE filme SET titulo = :titulo, diretor = :diretor, ano_lancamento = :ano_lancamento, genero = :genero WHERE id = :id");
    $stmt->bindParam(':titulo', $novoTitulo);
    $stmt->bindParam(':diretor', $novoDiretor);
    $stmt->bindParam(':ano_lancamento', $novoAno);
    $stmt->bindParam(':genero', $novoGenero);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Filme atualizado com sucesso!";
    } else {
        echo"erro ao atualizar Filme";
    }

}



